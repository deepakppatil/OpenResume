import { BadgeCheck, ExternalLink } from "lucide-react";
import { certifications, education } from "@/data/profile";
import { prettyUrl } from "@/utils/assets";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Credentials"
      title="Certifications & qualifications"
      description="Professional certifications that back up the hands-on platform and architecture experience."
      tinted
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-ink">
            <BadgeCheck className="h-5 w-5 text-accent" aria-hidden="true" />
            Professional certifications
          </h3>
          <ul className="space-y-4">
            {certifications.map((c, i) => (
              <li key={c.name}>
                <Reveal delay={i * 70}>
                  <article className="card card-hover flex items-start gap-4 p-5">
                    <span
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"
                      aria-hidden="true"
                    >
                      <BadgeCheck className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-semibold leading-snug text-ink">{c.name}</h4>
                      <p className="mt-0.5 text-sm text-muted">
                        {c.issuer}
                        {c.year && (
                          <>
                            {" · "}
                            <span className="font-mono text-xs">{c.year}</span>
                          </>
                        )}
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                        {c.credentialId && <span className="font-mono">ID: {c.credentialId}</span>}
                        {c.url && (
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-print-url={prettyUrl(c.url)}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                          >
                            Verify credential
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            <span className="sr-only"> for {c.name} (opens in a new tab)</span>
                          </a>
                        )}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-ink">
            <BadgeCheck className="h-5 w-5 text-accent" aria-hidden="true" />
            Academic qualifications
          </h3>
          {education.length === 0 ? (
            <Reveal>
              <p className="card p-5 text-sm leading-relaxed text-muted sm:p-6 sm:text-base">
                Academic details aren't listed in the current CV. Add an <code className="font-mono text-accent">education</code>{" "}
                entry to <code className="font-mono text-accent">src/data/profile.js</code> to show them here.
              </p>
            </Reveal>
          ) : (
            <ul className="space-y-5">
              {education.map((e, i) => (
                <li key={e.degree}>
                  <Reveal delay={i * 80}>
                    <article className="card card-hover p-5 sm:p-6">
                      <p className="font-mono text-xs text-muted">
                        {e.start} — {e.end}
                      </p>
                      <h4 className="mt-1.5 text-lg font-semibold tracking-tight text-ink">{e.degree}</h4>
                      <p className="mt-0.5 font-medium text-accent">{e.institution}</p>
                      <p className="text-sm text-muted">{e.location}</p>
                      <p className="mt-3 inline-block rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-soft-fg">
                        {e.grade}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{e.details}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
