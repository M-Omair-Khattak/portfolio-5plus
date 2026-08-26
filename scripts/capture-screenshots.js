const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

/** Curated pages known to exist — footer-only discovery was picking policy/404 routes */
const projects = [
  {
    id: "equiem",
    url: "https://getequiem.com/",
    pages: [
      "https://getequiem.com/",
      "https://getequiem.com/tenant-experience-platform",
      "https://getequiem.com/equiemengage",
      "https://getequiem.com/request-a-demo",
    ],
  },
  {
    id: "fitnescity",
    url: "https://www.fitnescity.com/",
    pages: [
      "https://www.fitnescity.com/",
      "https://www.fitnescity.com/states",
      "https://www.fitnescity.com/blog",
      "https://www.fitnescity.com/fitnescity-quiz",
    ],
  },
  {
    id: "hippocratic-ai",
    url: "https://hippocraticai.com/",
    pages: [
      "https://hippocraticai.com/",
      "https://hippocraticai.com/customers",
      "https://hippocraticai.com/about",
      "https://hippocraticai.com/safety",
    ],
  },
  {
    id: "atomic-asher",
    url: "https://atomicasher.com/",
    pages: ["https://atomicasher.com/"],
    scrollEach: true,
  },
  {
    id: "maisonette",
    url: "https://www.maisonette.com/",
    pages: [
      "https://www.maisonette.com/",
      "https://www.maisonette.com/collections/all",
      "https://www.maisonette.com/pages/about-us",
      "https://www.maisonette.com/pages/faq",
    ],
  },
  {
    id: "ft-technologies",
    url: "https://fttechnologies.com/",
    pages: [
      "https://fttechnologies.com/",
      "https://fttechnologies.com/ultrasonic-anemometers/ft742-s-model",
      "https://fttechnologies.com/technology",
      "https://fttechnologies.com/company/about-us",
    ],
  },
  {
    id: "invaluable",
    url: "https://www.invaluable.com/",
    pages: ["https://www.invaluable.com/"],
    scrollEach: true,
  },
  {
    id: "cntndr",
    url: "https://app.cntndr.com",
    pages: ["https://app.cntndr.com"],
  },
  {
    id: "lessonloop",
    url: "https://app.lessonloop.org",
    pages: ["https://app.lessonloop.org"],
  },
  {
    id: "park-and-tow",
    url: "https://app.parkandtowsolutions.com",
    pages: ["https://app.parkandtowsolutions.com"],
  },
  {
    id: "automotive-strategies",
    url: "https://app.automotivestrategiestx.com",
    pages: ["https://app.automotivestrategiestx.com"],
  },
];

const SKIP_PATH = /privacy|policy|gdpr|cookie|terms|legal|opt_out|subscribe|login|signin|signup|cart|checkout/i;

const NOT_FOUND_RE = [
  /\b404\b/,
  /not found/i,
  /page not found/i,
  /page doesn't exist/i,
  /page does not exist/i,
  /this page isn/i,
  /couldn't find/i,
  /could not find/i,
  /oops/i,
  /something went wrong/i,
];

async function validatePage(page, response) {
  if (!response || response.status() >= 400) return false;

  const finalUrl = page.url();
  if (/404|not-found|error-page|page-not-found/i.test(finalUrl)) return false;

  const meta = await page.evaluate(() => {
    const title = document.title || "";
    const h1 = document.querySelector("h1")?.innerText?.trim() || "";
    const bodyLen = (document.body?.innerText || "").replace(/\s+/g, " ").trim().length;
    const imgCount = document.querySelectorAll("img, svg, video, canvas").length;
    const has404Class = !!document.querySelector('[class*="404"], [id*="404"], [class*="not-found"]');
    return { title, h1, bodyLen, imgCount, has404Class };
  });

  const combined = `${meta.title} ${meta.h1}`;
  if (NOT_FOUND_RE.some((re) => re.test(combined))) return false;
  if (meta.has404Class) return false;
  if (meta.bodyLen < 120) return false;
  if (meta.imgCount === 0 && meta.bodyLen < 400) return false;

  return true;
}

async function dismissOverlays(page) {
  const selectors = [
    'button:has-text("Accept")',
    'button:has-text("Accept All")',
    'button:has-text("Got it")',
    'button:has-text("Close")',
    '[aria-label="Close"]',
    '[class*="cookie"] button',
  ];
  for (const sel of selectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 800 })) {
        await btn.click({ timeout: 1000 });
        await page.waitForTimeout(400);
      }
    } catch {
      /* no overlay */
    }
  }
}

async function captureScreenshot(page, url, outputPath, scroll = false) {
  let response;
  try {
    response = await page.goto(url, { waitUntil: "load", timeout: 90000 });
  } catch (err) {
    console.log(`  ✗ load failed: ${url} — ${err.message}`);
    return false;
  }

  await page.waitForTimeout(3000);
  await dismissOverlays(page);

  if (!(await validatePage(page, response))) {
    console.log(`  ✗ invalid/404: ${url}`);
    return false;
  }

  if (scroll) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let scrolled = 0;
        const max = Math.min(document.body.scrollHeight * 0.45, 1200);
        const tick = () => {
          window.scrollBy(0, 350);
          scrolled += 350;
          if (scrolled < max) setTimeout(tick, 250);
          else resolve();
        };
        tick();
      });
    });
    await page.waitForTimeout(1000);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  await page.screenshot({ path: outputPath, fullPage: false });
  return true;
}

async function discoverNavLinks(page, baseUrl) {
  const origin = new URL(baseUrl).origin;
  return page.evaluate(({ origin, skipReSource }) => {
    const skipRe = new RegExp(skipReSource, "i");
    const urls = new Set();
    const nav = document.querySelector("header, nav, [role='navigation']") || document.body;
    nav.querySelectorAll("a[href]").forEach((a) => {
      try {
        const href = a.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
        const url = new URL(href, origin);
        if (url.origin !== origin) return;
        if (skipRe.test(url.pathname)) return;
        if (/\.(pdf|zip|png|jpg|svg)$/i.test(url.pathname)) return;
        urls.add(url.href.split("#")[0].replace(/\/$/, "") || url.href);
      } catch {
        /* skip */
      }
    });
    return [...urls];
  }, { origin, skipReSource: SKIP_PATH.source });
}

async function captureProject(browser, project) {
  const dir = path.join(__dirname, "../public/images/projects", project.id);
  fs.mkdirSync(dir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  console.log(`\n[${project.id}]`);

  const candidates = [...project.pages];
  try {
    await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    const discovered = await discoverNavLinks(page, project.url);
    for (const u of discovered.slice(0, 8)) {
      if (!candidates.includes(u)) candidates.push(u);
    }
  } catch {
    /* use curated only */
  }

  const validUrls = [];
  for (const url of candidates) {
    if (SKIP_PATH.test(url)) continue;
    if (validUrls.length >= 6) break;
    try {
      const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(2000);
      if (await validatePage(page, resp)) {
        validUrls.push(url);
        console.log(`  ✓ valid: ${url}`);
      } else {
        console.log(`  ✗ skip: ${url}`);
      }
    } catch {
      console.log(`  ✗ fail: ${url}`);
    }
  }

  if (validUrls.length === 0) {
    console.log(`  ⚠ no valid pages found for ${project.id}`);
    await context.close();
    return 0;
  }

  let saved = 0;
  const max = 4;

  for (let i = 0; i < validUrls.length && saved < max; i++) {
    const scroll = project.scrollEach || i > 0;
    const ok = await captureScreenshot(
      page,
      validUrls[i],
      path.join(dir, `${saved + 1}.png`),
      scroll
    );
    if (ok) {
      saved++;
      console.log(`  ✓ saved ${project.id}/${saved}.png`);
    }
  }

  // Fallback: scroll positions on homepage for more variety
  if (saved < max && validUrls[0]) {
    const scrollSteps = [600, 1200, 1800];
    for (const y of scrollSteps) {
      if (saved >= max) break;
      try {
        await page.goto(validUrls[0], { waitUntil: "load", timeout: 60000 });
        await page.waitForTimeout(2000);
        await dismissOverlays(page);
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(800);
        if (await validatePage(page, null)) {
          await page.screenshot({ path: path.join(dir, `${saved + 1}.png`) });
          saved++;
          console.log(`  ✓ saved ${project.id}/${saved}.png (scroll ${y}px)`);
        }
      } catch {
        /* skip */
      }
    }
  }

  await context.close();
  return saved;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const project of projects) {
    await captureProject(browser, project);
  }
  await browser.close();
  console.log("\nDone!");
}

main().catch(console.error);
