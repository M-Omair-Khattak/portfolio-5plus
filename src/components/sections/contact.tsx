"use client";

import { useState, type FormEvent } from "react";
import { GitBranch, Link2, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/fade-in";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: undefined,
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.github,
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedin,
  },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      form.reset();
    }, 500);
  }

  return (
    <section
      id="contact"
      className="section-padding py-20 md:py-28"
      aria-label="Contact section"
    >
      <div className="container-max">
        <SectionHeader
          label="Contact"
          title="Let's Work Together"
          description="Have a project in mind? I'd love to hear about it. Available to start within 24 hours."
          align="center"
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5 lg:gap-12">
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {contactLinks.map((link) => (
              <StaggerItem key={link.label}>
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <link.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {link.label}
                      </p>
                      {link.href ? (
                        <a
                          href={link.href}
                          target={link.href.startsWith("mailto") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="truncate text-sm font-medium transition-colors hover:text-accent"
                        >
                          {link.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{link.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-semibold">Message Ready!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your email client should open shortly. Feel free to send another message.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        required
                        rows={5}
                      />
                    </div>
                    <MagneticButton className="w-full sm:w-auto">
                      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                        <Send className="mr-2 h-4 w-4" />
                        {loading ? "Opening email..." : "Send Message"}
                      </Button>
                    </MagneticButton>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
