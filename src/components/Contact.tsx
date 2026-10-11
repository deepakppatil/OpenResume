import { useRef, useState, type FormEvent } from "react";
import { Check, Clock, Copy, Mail, MapPin, Phone, Printer, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { prettyUrl } from "@/utils/assets";
import { cn } from "@/utils/cn";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";
import { Reveal } from "./Reveal";
import { ResumeButton } from "./ResumeButton";
import { Section } from "./Section";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  const linkRow =
    "group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors duration-200 hover:border-accent";
  const iconBox = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent";

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's work together"
      description="Have a project, role or idea in mind? Send a message or reach out through any of the channels below — I usually reply within two working days."
      tinted
    >
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <Reveal className="space-y-3 lg:col-span-2">
          {/* Email + copy */}
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
            <span className={iconBox} aria-hidden="true">
              <Mail className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted">Email</p>
              <a href={`mailto:${profile.email}`} className="block truncate text-sm font-semibold text-ink hover:text-accent sm:text-base">
                {profile.email}
              </a>
            </div>
            <button
              type="button"
              onClick={() => copy(profile.email)}
              className="no-print btn btn-secondary btn-sm shrink-0 px-3"
              aria-label="Copy email address to clipboard"
            >
              {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
            </button>
            <span role="status" aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>

          {profile.phone && (
            <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`} className={linkRow}>
              <span className={iconBox} aria-hidden="true">
                <Phone className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-muted">Phone</span>
                <span className="block truncate text-sm font-semibold text-ink group-hover:text-accent sm:text-base">
                  {profile.phone}
                </span>
              </span>
            </a>
          )}

          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" data-print-url={prettyUrl(profile.social.linkedin)} className={linkRow}>
            <span className={iconBox} aria-hidden="true">
              <LinkedinIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-muted">LinkedIn</span>
              <span className="block truncate text-sm font-semibold text-ink group-hover:text-accent sm:text-base">
                {prettyUrl(profile.social.linkedin)}
              </span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>

          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" data-print-url={prettyUrl(profile.social.github)} className={linkRow}>
            <span className={iconBox} aria-hidden="true">
              <GithubIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-muted">GitHub</span>
              <span className="block truncate text-sm font-semibold text-ink group-hover:text-accent sm:text-base">
                {prettyUrl(profile.social.github)}
              </span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>

          {profile.whatsapp && (
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className={cn(linkRow, "no-print")}>
              <span className={iconBox} aria-hidden="true">
                <WhatsappIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-muted">WhatsApp</span>
                <span className="block text-sm font-semibold text-ink group-hover:text-accent sm:text-base">Chat directly</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}

          <div className="grid gap-3 pt-1 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
              <MapPin className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted">Location</p>
                <p className="text-sm font-semibold text-ink">{profile.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
              <Clock className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted">Time zone</p>
                <p className="text-sm font-semibold text-ink">{profile.timezone}</p>
              </div>
            </div>
          </div>

          <div className="no-print flex flex-wrap gap-3 pt-3">
            <ResumeButton className="btn btn-primary" />
            <button type="button" onClick={() => window.print()} className="btn btn-secondary">
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print CV
            </button>
          </div>
        </Reveal>

        <Reveal delay={100} className="no-print lg:col-span-3">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { copied, copy } = useCopyToClipboard();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "That doesn't look like a valid email address (e.g. you@example.com).";
    if (!message) next.message = "Please write a short message.";
    else if (message.length < 10) next.message = "Your message is a little short — please add a few more details.";

    setErrors(next);
    setSent(false);

    const firstInvalid = (["name", "email", "message"] as const).find((k) => next[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // No backend: hand the message to the visitor's email client via a mailto: link.
    const body = `${message}\n\n— ${name} (${email})`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject || `Enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  const label = "mb-1.5 block text-sm font-medium text-ink";
  const errorText = "mt-1.5 text-sm font-medium text-red-700 dark:text-red-400";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="contact-form-title"
      className="card space-y-5 p-5 sm:p-8"
    >
      <div>
        <h3 id="contact-form-title" className="text-xl font-semibold tracking-tight text-ink">
          Send a message
        </h3>
        <p className="mt-1 text-sm text-muted">
          This opens your email app with the message pre-filled — nothing is stored or sent to a server. Fields marked{" "}
          <span aria-hidden="true">*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className="field"
            placeholder="Your name"
          />
          {errors.name && (
            <p id="cf-name-error" className={errorText}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className="field"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="cf-email-error" className={errorText}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className={label}>
          Subject <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="cf-subject" name="subject" type="text" className="field" placeholder="What is this about?" />
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          required
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className="field resize-y"
          placeholder="Tell me about your project, role or question…"
        />
        {errors.message && (
          <p id="cf-message-error" className={errorText}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary">
          <Send className="h-4 w-4" aria-hidden="true" />
          Compose email
        </button>
        <div role="status" aria-live="polite" className="text-sm text-muted">
          {sent && (
            <span>
              Your email app should open shortly. Nothing happened?{" "}
              <button type="button" onClick={() => copy(profile.email)} className="font-semibold text-accent underline underline-offset-2">
                {copied ? "Address copied!" : "Copy my email address"}
              </button>
              .
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
