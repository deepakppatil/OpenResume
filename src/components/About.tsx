import { forwardRef } from "react";
import {
  Cloud,
  Footprints,
  Layers,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  cloud: Cloud,
  sparkles: Sparkles,
  users: Users,
};

const ScubaDiverIcon: LucideIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M5.35 10.08C5.66 5.66 8.46 3 12.22 3c3.8 0 6.32 2.5 6.74 6.6 1.83 1.05 2.78 2.77 2.78 4.75 0 4.29-3.46 7.67-7.61 7.67-1.64 0-3.08-.53-4.28-1.49l-3.1.5c-2.56.4-4.57-1.28-4.57-3.53 0-1.64.98-2.94 2.47-3.57-.2-1.45-.01-2.59.7-3.85Z" />
      <path d="M5.78 10.1c1.67-.86 3.89-1.34 6.38-1.34 2.47 0 4.63.47 6.23 1.31l.65 2.07c.22.71-.18 1.46-.91 1.68l-1.46.44c-1.15.35-2.42.2-3.43-.43l-.93-.58a1.86 1.86 0 0 0-2.01 0l-.94.59c-1.01.63-2.28.78-3.43.43l-1.29-.4a1.34 1.34 0 0 1-.87-1.65l.62-2.12Z" fill="var(--surface)" />
      <path d="m7.26 10.06-1.7 3.05m3.91-3.97-2.9 4.75" fill="none" stroke="currentColor" strokeWidth=".82" strokeLinecap="round" />
      <path d="M9.1 15.07c1.1.03 1.92-.41 2.68-.89.84-.53 1.58-.53 2.4 0 .81.53 1.56.82 2.59.79l-.56 1.32-1.9.63-1.19 1.27a2.24 2.24 0 0 1-3.12.17l-1.7-1.5-1.59-.24-.12-.99 2.51-.56Z" />
      <path d="M13.33 17.2a1.62 1.62 0 1 0 3.24 0 1.62 1.62 0 0 0-3.24 0Z" fill="var(--surface)" />
      <circle cx="18.83" cy="5.46" r="1.08" />
      <circle cx="20.67" cy="2.78" r=".57" />
      <circle cx="21.03" cy="7.37" r=".58" />
    </svg>
  );
});

const ParagliderIcon: LucideIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.15"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 8.7C3.2 4.5 7.3 2 12 2s8.8 2.5 10 6.7c.2.8-.3 1.4-1 1.1C18.5 8.4 15.4 7.6 12 7.6s-6.5.8-9 2.2c-.7.3-1.2-.3-1-1.1Z" />
    <path d="m2.4 9.2 9.1 12m.5-13.6v13.5m.5-13.5-9.8 0m18.9 0-9.1 13.6m5.2-12.6-5.6 12.6M5.2 6.5l6.3 14.7M8.6 3.4l3.2 17.8m3.4-17.8L12 21.2m6.5-14.7L12.5 21.2" />
    <circle cx="12" cy="21.2" r=".55" fill="currentColor" stroke="none" />
    <path d="m11.6 21.7-.2 1h1.1l-.2-1m-.8-.4-.5.8m1.3-.8.5.8" />
  </svg>
));

const MountainIcon: LucideIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.8 20.8 9.2 7.1l3.1 3.1L16 3.6l7.2 17.2-6.1-5.1-.3 2.5-3.6-3-2.8 4.2-2.1-2.2z" />
  </svg>
));

const INTEREST_ICONS: Record<string, LucideIcon> = {
  cylinder: ScubaDiverIcon,
  wind: ParagliderIcon,
  mountain: MountainIcon,
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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {profile.strengths.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Layers;
          return (
            <li key={s.title}>
              <Reveal delay={i * 70} className="card card-hover h-full p-5 sm:p-6">
                <div className="flex items-center gap-3 border-b border-line pb-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="min-w-0 text-sm font-semibold leading-snug text-ink">{s.title}</h4>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted">{s.description}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <h3 className="mt-14 mb-5 text-xl font-semibold text-ink">Outside work</h3>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {profile.interests.map((interest, i) => {
          const Icon = INTEREST_ICONS[interest.icon] ?? MountainIcon;
          return (
            <li key={interest.title}>
              <Reveal delay={i * 70} className="card card-hover h-full p-5 sm:p-6">
                <div className="flex items-center gap-3 border-b border-line pb-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="min-w-0 text-sm font-semibold leading-snug text-ink">{interest.title}</h4>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted">{interest.description}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
