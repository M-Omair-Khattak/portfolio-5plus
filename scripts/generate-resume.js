const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const jobs = [
  {
    html: path.join(__dirname, "resume-5plus.html"),
    out: path.join(__dirname, "../public/resume/Muhammad_Omair_Resume.pdf"),
  },
];

const extra = process.argv[2];
if (extra === "3plus") {
  jobs.length = 0;
  jobs.push({
    html: path.join(__dirname, "resume-3plus.html"),
    out: path.join(__dirname, "../public/resume/Muhammad_Omair_Resume.pdf"),
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const job of jobs) {
    fs.mkdirSync(path.dirname(job.out), { recursive: true });
    const page = await browser.newPage();
    await page.goto(`file://${job.html}`, { waitUntil: "load" });
    await page.pdf({
      path: job.out,
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", bottom: "12mm", left: "14mm", right: "14mm" },
    });
    console.log("wrote", job.out);
    await page.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
