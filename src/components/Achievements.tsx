import { Award, ExternalLink, Mountain, Rocket, Star, type LucideIcon } from "lucide-react";
import { achievements } from "@/data/profile";
import { prettyUrl } from "@/utils/assets";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const TYPES: Record<string, { label: string; Icon: LucideIcon }> = {
  impact: { label: "Impact", Icon: Star },
  milestone: { label: "Milestone", Icon: Rocket },
  personal: { label: "Outside work", Icon: Mountain },
  award: { label: "Award", Icon: Award },
};

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Career highlights"
      title="Impact & milestones"
      description="Measurable outcomes and platform milestones from across the engineering journey."
    >
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const meta = TYPES[a.type] ?? { label: "Highlight", Icon: Award };
          return (
            <li key={a.title}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <article className="card card-hover flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft" aria-hidden="true">
                        <meta.Icon className="h-[18px] w-[18px]" />
                      </span>
                      {meta.label}
                    </span>
                    <span className="font-mono text-xs text-muted">{a.year}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-ink">{a.title}</h3>
                  <p className="mt-0.5 text-sm font-medium text-muted">{a.organization}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{a.description}</p>
                  {a.url && (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-print-url={prettyUrl(a.url)}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent hover:underline"
                    >
                      Learn more
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only"> about {a.title} (opens in a new tab)</span>
                    </a>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
