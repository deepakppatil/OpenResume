import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Subtle tinted band to separate sections visually */
  tinted?: boolean;
  /** Extra controls rendered to the right of the heading (e.g. view toggles) */
  actions?: ReactNode;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, description, tinted, actions, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("py-16 sm:py-24", tinted && "border-y border-line/70 bg-surface-2/60")}
    >
      <div className="container-page">
        <Reveal className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            {description && <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
          </div>
          {actions && <div className="no-print flex flex-wrap items-center gap-3">{actions}</div>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
