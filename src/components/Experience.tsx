import { useEffect, useMemo, useState } from "react";
import { ChartGantt, ChevronDown, ChevronsDownUp, ChevronsUpDown, List, MapPin } from "lucide-react";
import { experience } from "@/data/profile";
import { cn } from "@/utils/cn";
import {
  currentMonthIndex,
  formatDuration,
  formatPeriod,
  monthIndex,
  monthsBetween,
  yearsOfExperience,
} from "@/utils/dates";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

type View = "details" | "timeline";

export function Experience() {
  const [view, setView] = useState<View>("details");
  // The most recent role starts expanded
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const [pendingFocus, setPendingFocus] = useState<number | null>(null);

  const allOpen = open.size === experience.length;

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(experience.map((_, i) => i)));

  // Jump from the timeline to the matching expanded entry
  const goToEntry = (index: number) => {
    setOpen((prev) => new Set(prev).add(index));
    setView("details");
    setPendingFocus(index);
  };

  useEffect(() => {
    if (pendingFocus === null || view !== "details") return;
    const el = document.getElementById(`exp-${pendingFocus}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.querySelector<HTMLButtonElement>("button[aria-expanded]")?.focus({ preventScroll: true });
    setPendingFocus(null);
  }, [pendingFocus, view]);

  const actions = (
    <>
      <div className="inline-flex rounded-full border border-line bg-surface p-1" role="group" aria-label="Choose experience view">
        {(
          [
            { id: "details", label: "Details", Icon: List },
            { id: "timeline", label: "Timeline", Icon: ChartGantt },
          ] as const
        ).map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={view === id}
            onClick={() => setView(id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
              view === id ? "bg-accent-strong text-accent-fg" : "text-muted hover:text-ink",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      {view === "details" && (
        <button type="button" onClick={toggleAll} className="btn btn-secondary btn-sm">
          {allOpen ? (
            <ChevronsDownUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronsUpDown className="h-4 w-4" aria-hidden="true" />
          )}
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      )}
    </>
  );

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked"
      description="A reverse-chronological look at my roles, the impact I had and the technology I used."
      actions={actions}
    >
      {/* Details view (always shown when printing) */}
      <ol className={cn("relative space-y-6", view !== "details" && "hidden print:block print:space-y-4")}>
        <span className="absolute top-3 bottom-3 left-[11px] w-px bg-line sm:left-[15px]" aria-hidden="true" />
        {experience.map((job, i) => {
          const isOpen = open.has(i);
          const panelId = `exp-panel-${i}`;
          const months = monthsBetween(job.start, job.end);
          const current = !job.end;
          return (
            <li key={`${job.company}-${job.start}`} className="relative pl-9 sm:pl-12">
              <span
                className={cn(
                  "absolute top-7 left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-bg sm:left-1 ",
                  current ? "border-accent-strong" : "border-line",
                )}
                aria-hidden="true"
              >
                <span className={cn("h-2.5 w-2.5 rounded-full", current ? "bg-accent-strong" : "bg-muted/50")} />
              </span>

              <Reveal delay={Math.min(i, 3) * 60}>
                <article id={`exp-${i}`} className="card card-hover scroll-mt-24 overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                      className="flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left sm:p-6"
                    >
                      <span className="block min-w-0">
                        <span className="block text-lg font-semibold tracking-tight text-ink sm:text-xl">{job.role}</span>
                        <span className="mt-0.5 block text-base font-medium text-accent">
                          {job.company}
                          {job.domains?.length ? (
                            <span className="font-normal text-muted"> · {job.domains.join(" · ")}</span>
                          ) : null}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-normal text-muted">
                          <span className="font-mono text-xs">
                            {formatPeriod(job.start, job.end)}
                            <span className="text-muted/80"> · {formatDuration(months)}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {job.location}
                          </span>
                          <span className="chip-neutral">{job.type}</span>
                        </span>
                      </span>
                      <span className="no-print mt-1 inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted">
                        <span className="hidden sm:inline">{isOpen ? "Hide details" : "Show details"}</span>
                        <ChevronDown
                          className={cn("h-5 w-5 transition-transform duration-300", isOpen && "rotate-180")}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </h3>

                  <p className="-mt-1 px-5 pb-5 text-base leading-relaxed text-muted sm:px-6">{job.summary}</p>

                  <div id={panelId} className="collapsible" data-open={isOpen} inert={!isOpen}>
                    <div>
                      <div className="border-t border-line px-5 py-5 sm:px-6">
                        <h4 className="text-sm font-semibold text-ink">Key achievements</h4>
                        <ul className="mt-3 space-y-2.5">
                          {job.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" aria-hidden="true" />
                              <span>
                                <Highlight text={h} />
                              </span>
                            </li>
                          ))}
                        </ul>
                        <h4 className="mt-5 text-sm font-semibold text-ink">Technologies used</h4>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {job.technologies.map((t) => (
                            <li key={t} className="chip">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Career timeline view */}
      <div className={cn(view !== "timeline" && "hidden", "print:hidden")}>
        <Timeline onSelect={goToEntry} />
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Career timeline — a Gantt-style chart: one bar per role positioned by date.
---------------------------------------------------------------------------- */

/**
 * Renders a highlight, bolding a leading `**Bold lead-in**` label.
 * Falls back to plain text when no marker is present.
 */
function Highlight({ text }: { text: string }) {
  const match = /^\*\*(.+?)\*\*:?\s*(.*)$/s.exec(text);
  if (!match) return <>{text}</>;
  const [, label, rest] = match;
  return (
    <>
      <strong className="font-semibold text-ink">{label}</strong>
      {rest ? ` — ${rest}` : ""}
    </>
  );
}
function Timeline({ onSelect }: { onSelect: (index: number) => void }) {
  const model = useMemo(() => {
    const firstYear = Math.floor(Math.min(...experience.map((e) => monthIndex(e.start))) / 12);
    const lastYear = Math.floor(currentMonthIndex() / 12);
    const startIdx = firstYear * 12;
    const totalMonths = (lastYear + 1 - firstYear) * 12;
    const years = lastYear + 1 - firstYear;
    const step = years > 12 ? 3 : years > 7 ? 2 : 1;
    const ticks: { year: number; left: number }[] = [];
    for (let y = firstYear; y <= lastYear; y += step) ticks.push({ year: y, left: ((y * 12 - startIdx) / totalMonths) * 100 });
    const rows = experience.map((job, index) => {
      const s = monthIndex(job.start) - startIdx;
      const e = (job.end ? monthIndex(job.end) : currentMonthIndex()) - startIdx + 1;
      return { job, index, left: (s / totalMonths) * 100, width: Math.max(((e - s) / totalMonths) * 100, 1.5) };
    });
    return { rows, ticks, years, totalMonths };
  }, []);

  const totalYears = yearsOfExperience(experience.map((e) => e.start));
  const companies = new Set(experience.map((e) => e.company)).size;
  const progression = `${experience[experience.length - 1].role} → ${experience[0].role}`;

  return (
    <Reveal className="card p-5 sm:p-8">
      <dl className="mb-8 grid grid-cols-3 gap-4 border-b border-line pb-6 text-center sm:text-left">
        {[
          { label: "Career span", value: `${totalYears}+ years` },
          { label: "Companies", value: String(companies) },
          { label: "Progression", value: progression, wide: true },
        ].map((item) => (
          <div key={item.label} className={cn("flex flex-col-reverse", item.wide && "col-span-3 sm:col-span-1")}>
            <dt className="mt-0.5 text-xs text-muted">{item.label}</dt>
            <dd className="text-base font-semibold text-ink sm:text-lg">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mb-3 h-5" aria-hidden="true">
        {model.ticks.map((t) => (
          <span
            key={t.year}
            className="absolute top-0 font-mono text-[11px] text-muted"
            style={{ left: `${t.left}%`, transform: t.left > 94 ? "translateX(-100%)" : undefined }}
          >
            {t.year}
          </span>
        ))}
      </div>

      <ol className="space-y-6">
        {model.rows.map(({ job, index, left, width }) => {
          const months = monthsBetween(job.start, job.end);
          return (
            <li key={`${job.company}-${job.start}`}>
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <p className="text-sm font-semibold text-ink sm:text-base">
                  {job.role} <span className="font-normal text-muted">· {job.company}</span>
                </p>
                <p className="font-mono text-xs text-muted">
                  {formatPeriod(job.start, job.end)} · {formatDuration(months)}
                </p>
              </div>
              <div
                className="relative h-9 rounded-lg bg-surface-2"
                style={{
                  backgroundImage: "linear-gradient(to right, var(--line) 1px, transparent 1px)",
                  backgroundSize: `${100 / model.years}% 100%`,
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-label={`${job.role} at ${job.company}, ${formatPeriod(job.start, job.end)}. Show details`}
                  className="group absolute top-0 flex h-full items-center justify-end overflow-hidden rounded-lg bg-accent-strong px-2 shadow-sm transition-[filter,transform] duration-200 hover:brightness-110 motion-safe:hover:-translate-y-0.5"
                  style={{ left: `${left}%`, width: `${width}%`, opacity: Math.max(1 - index * 0.17, 0.45) }}
                >
                  {!job.end && (
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-accent-fg" aria-hidden="true">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-fg motion-safe:animate-pulse" />
                      Now
                    </span>
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-sm text-muted">Select a bar to jump to the full details for that role.</p>
    </Reveal>
  );
}
