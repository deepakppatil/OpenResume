import { useMemo, useState } from "react";
import { ExternalLink, RotateCcw, Star } from "lucide-react";
import { projects } from "@/data/profile";
import { assetUrl, prettyUrl } from "@/utils/assets";
import { cn } from "@/utils/cn";
import { GithubIcon } from "./icons";
import { ProjectCover } from "./ProjectCover";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const ALL = "";
const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

export function Projects() {
  const [category, setCategory] = useState(ALL);
  const [domain, setDomain] = useState(ALL);
  const [tech, setTech] = useState(ALL);

  const categories = useMemo(() => unique(projects.map((p) => p.category)), []);
  const domains = useMemo(() => unique(projects.map((p) => p.domain)), []);
  const technologies = useMemo(() => unique(projects.flatMap((p) => p.tags)), []);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (category === ALL || p.category === category) &&
          (domain === ALL || p.domain === domain) &&
          (tech === ALL || p.tags.includes(tech)),
      ),
    [category, domain, tech],
  );

  const filtersActive = category !== ALL || domain !== ALL || tech !== ALL;
  const reset = () => {
    setCategory(ALL);
    setDomain(ALL);
    setTech(ALL);
  };

  const chip = (label: string, value: string) => {
    const pressed = category === value;
    const count = value === ALL ? projects.length : projects.filter((p) => p.category === value).length;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={pressed}
        onClick={() => setCategory(value)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
          pressed
            ? "border-accent-strong bg-accent-strong text-accent-fg"
            : "border-line bg-surface text-ink hover:border-accent hover:text-accent",
        )}
      >
        {label}
        <span
          className={cn(
            "rounded-full px-1.5 text-xs tabular-nums",
            pressed ? "bg-accent-fg/20 text-accent-fg" : "bg-surface-2 text-muted",
          )}
        >
          {count}
        </span>
      </button>
    );
  };

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Personal, professional and open-source projects. Filter by type, domain or technology."
      tinted
    >
      <div className="no-print mb-8 space-y-4">
        <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
          {chip("All", ALL)}
          {categories.map((c) => chip(c, c))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <FilterSelect id="filter-domain" label="Domain" value={domain} onChange={setDomain} options={domains} allLabel="All domains" />
          <FilterSelect id="filter-tech" label="Technology" value={tech} onChange={setTech} options={technologies} allLabel="All technologies" />
          {filtersActive && (
            <button type="button" onClick={reset} className="btn btn-ghost btn-sm self-start sm:self-end">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>

        <p role="status" aria-live="polite" className="text-sm text-muted">
          Showing <strong className="font-semibold text-ink">{filtered.length}</strong> of {projects.length} projects
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 px-6 py-14 text-center">
          <p className="text-lg font-semibold text-ink">No projects match these filters</p>
          <p className="max-w-md text-muted">Try a different combination of type, domain and technology.</p>
          <button type="button" onClick={reset} className="btn btn-primary">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <li key={p.title} className="card-in">
              <Reveal delay={Math.min(i, 5) * 60} className="h-full">
                <article className="card card-hover flex h-full flex-col overflow-hidden">
                  <div className="no-print">
                    {p.image ? (
                      <img
                        src={assetUrl(p.image)}
                        alt={p.imageAlt || `Screenshot of ${p.title}`}
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={360}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : (
                      <ProjectCover variant={p.cover} index={i} />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="chip">{p.category}</span>
                      <span className="flex items-center gap-2 font-mono text-muted">
                        {p.featured && (
                          <span className="inline-flex items-center gap-1 font-sans font-semibold text-accent">
                            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                            Featured
                          </span>
                        )}
                        {p.year}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {p.role} · {p.domain}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{p.description}</p>
                    {p.impact && <p className="mt-3 text-sm font-semibold text-ink">{p.impact}</p>}

                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                      {p.tags.map((t) => (
                        <li key={t} className={t === tech ? "chip ring-2 ring-accent" : "chip-neutral"}>
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-semibold">
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-print-url={prettyUrl(p.repoUrl)}
                          className="inline-flex items-center gap-2 text-ink hover:text-accent"
                        >
                          <GithubIcon className="h-4 w-4" />
                          Source code
                          <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-print-url={prettyUrl(p.liveUrl)}
                          className="inline-flex items-center gap-2 text-accent hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          Live demo
                          <span className="sr-only"> of {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {!p.repoUrl && !p.liveUrl && <span className="font-normal text-muted">Private project</span>}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  allLabel: string;
  onChange: (value: string) => void;
}

function FilterSelect({ id, label, value, options, allLabel, onChange }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1.5 sm:min-w-56">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field appearance-none bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
