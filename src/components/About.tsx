import { Compass, Cloud, Footprints, Layers, Mountain, Sparkles, Target, Users, Wind, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  cloud: Cloud,
  sparkles: Sparkles,
  users: Users,
};

const INTEREST_ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  wind: Wind,
  mountain: Mountain,
  footprints: Footprints,
};

export function About() {
  return (
    <Section id="about" eyebrow="About me" title="Engineering leader across platforms, AI and transformation" tinted>
      <div className="grid gap-8 lg:grid-cols-3">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-span-2">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
              <Target className="h-5 w-5 text-accent" aria-hidden="true" />
              Current focus
            </h3>
            <ul className="mt-3 space-y-2 text-base">
              {profile.focus.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="rounded-2xl border border-accent/40 bg-accent-soft p-5 sm:p-6">
            <blockquote className="text-lg font-semibold leading-snug text-ink sm:text-xl">
              “{profile.headline}”
            </blockquote>
            <figcaption className="mt-2 text-sm text-accent-soft-fg">
              The hardest part of enterprise transformation is not creating what comes next — it is making what already
              exists ready for it.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={100}>
          <div className="card h-full p-5 sm:p-6">
            <h3 className="text-base font-semibold text-ink">Quick facts</h3>
            <dl className="mt-4 divide-y divide-line">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="text-right font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <h3 className="mt-14 mb-5 text-xl font-semibold text-ink">Key strengths</h3>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {profile.strengths.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Layers;
          return (
            <li key={s.title}>
              <Reveal delay={i * 70} className="card card-hover h-full p-5 sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 text-base font-semibold text-ink">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <h3 className="mt-14 mb-5 text-xl font-semibold text-ink">Outside work</h3>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {profile.interests.map((interest, i) => {
          const Icon = INTEREST_ICONS[interest.icon] ?? Compass;
          return (
            <li key={interest.title}>
              <Reveal delay={i * 70} className="card card-hover h-full p-5 sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 text-base font-semibold text-ink">{interest.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{interest.description}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
