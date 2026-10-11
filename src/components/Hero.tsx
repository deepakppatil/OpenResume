import { ArrowRight, Briefcase, Mail, MapPin } from "lucide-react";
import portrait from "@/assets/profile.jpg";
import { certifications, experience, profile, projects } from "@/data/profile";
import { yearsOfExperience } from "@/utils/dates";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";
import { ResumeButton } from "./ResumeButton";

const socialLink =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-200 hover:border-accent hover:text-accent";

export function Hero() {
  const years = yearsOfExperience(experience.map((e) => e.start));
  const current = experience.find((e) => !e.end) ?? experience[0];

  const stats = [
    { value: `${years}+`, label: "Years of experience" },
    { value: String(projects.length), label: "Featured projects" },
    { value: String(certifications.length), label: "Certifications" },
  ];

  return (
    <section id="home" aria-labelledby="home-title" className="no-print relative overflow-hidden">
      <div className="hero-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:gap-8 lg:pt-24 lg:pb-24">
        <div className="order-2 lg:order-1">
 

          
         <p
            className="fade-up inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink"
            style={{ "--d": "0ms", "margin-top": "2em"} as React.CSSProperties}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-strong" />
            </span>
            {profile.availability}
          </p>

          <h1
            id="home-title"
            className="fade-up mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {/* <span className="block text-lg font-medium tracking-normal text-muted sm:text-xl">Hi, I'm</span> */}
            {profile.name}
          </h1>
          <ul
            className="fade-up mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
             <li className="inline-flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-accent" aria-hidden="true" />
              {current.role}
              {profile.organization ? `, ${profile.organization}` : ` at ${current.company}`}
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {profile.location}
            </li>
          </ul>         
          <p
            className="fade-up mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ "--d": "240ms" } as React.CSSProperties}
          >
            {profile.intro}
          </p>
          {/* <p
            className="fade-up mt-3 text-xl font-semibold text-accent sm:text-2xl"
            style={{ "--d": "160ms" } as React.CSSProperties}
          >
            {profile.title}
          </p> */}


          <div className="fade-up mt-8 flex flex-wrap items-center gap-3" style={{ "--d": "360ms" } as React.CSSProperties}>
            <a href="#projects" className="btn btn-primary">
              View my work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <ResumeButton className="btn btn-secondary" />
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </div>

          <ul
            className="fade-up mt-8 flex items-center gap-3"
            aria-label="Social links"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            <li>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className={socialLink} aria-label="GitHub (opens in a new tab)">
                <GithubIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className={socialLink} aria-label="LinkedIn (opens in a new tab)">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className={socialLink} aria-label="Send an email">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
            {profile.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLink}
                  aria-label="Message on WhatsApp (opens in a new tab)"
                >
                  <WhatsappIcon className="h-5 w-5" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="fade-up order-1 mx-auto w-full max-w-68 sm:max-w-sm lg:order-2 lg:max-w-md" style={{ "--d": "200ms" } as React.CSSProperties}>
          <div className="relative">
            <div
              className="absolute -inset-3 translate-x-3 translate-y-3 rounded-4xl border border-accent/40 bg-accent-soft"
              aria-hidden="true"
            />
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}, smiling, wearing a dark teal shirt`}
              width={640}
              height={640}
              fetchPriority="high"
              decoding="async"
              className="relative aspect-square w-full rounded-4xl border border-line object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-lg sm:-left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
                <Briefcase className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted">Currently</p>
                <p className="text-sm font-semibold text-ink">{current.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page relative pb-14 sm:pb-20">
        <dl className="fade-up grid grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-surface" style={{ "--d": "500ms" } as React.CSSProperties}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-3 py-5 text-center sm:px-6 sm:py-6">
              <dt className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dt>
              <dd className="text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
