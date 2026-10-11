import { useId, useState } from "react";
import { Info } from "lucide-react";
import { skills } from "@/data/profile";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const LEVELS = ["Familiar", "Working knowledge", "Proficient", "Advanced", "Expert"];

type Skill = (typeof skills)[number]["items"][number];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools & strengths"
      description="Hover, focus or tap any skill to see how I use it, my proficiency and years of experience."
    >
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <li key={group.category}>
            <Reveal delay={(i % 3) * 70} className="h-full">
              <SkillGroup category={group.category} items={group.items} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function SkillGroup({ category, items }: { category: string; items: Skill[] }) {
  const [active, setActive] = useState<number | null>(null);
  const uid = useId();
  const panelId = `${uid}-panel`;
  const current = active !== null ? items[active] : null;

  return (
    <div className="card card-hover flex h-full flex-col p-5 sm:p-6">
      <h3 className="text-lg font-semibold tracking-tight text-ink">{category}</h3>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${category} skills`}>
        {items.map((skill, i) => {
          const selected = active === i;
          return (
            <li key={skill.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setActive(null);
                }}
                aria-describedby={selected ? panelId : undefined}
                className={cn(
                  "rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-colors duration-150",
                  selected
                    ? "border-accent-strong bg-accent-strong text-accent-fg"
                    : "border-line bg-surface-2 text-ink hover:border-accent hover:text-accent",
                )}
              >
                {skill.name}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Fixed-height detail area so the card never jumps while hovering */}
      <div
        id={panelId}
        role="status"
        aria-live="polite"
        className="no-print mt-5 min-h-[8.5rem] rounded-xl border border-dashed border-line bg-surface-2/60 p-4 text-sm"
      >
        {current ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-ink">{current.name}</p>
              <p className="text-xs text-muted">{LEVELS[current.level - 1]}</p>
            </div>
            <div
              className="mt-2 flex gap-1.5"
              role="img"
              aria-label={`Proficiency ${current.level} out of 5: ${LEVELS[current.level - 1]}`}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={cn("h-1.5 flex-1 rounded-full", n <= current.level ? "bg-accent-strong" : "bg-line")} />
              ))}
            </div>
            <p className="mt-3 leading-relaxed text-muted">{current.description}</p>
          </>
        ) : (
          <p className="flex items-start gap-2 text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Hover, focus or tap a skill to see details.
          </p>
        )}
      </div>
    </div>
  );
}
