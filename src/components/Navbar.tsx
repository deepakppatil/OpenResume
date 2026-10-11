import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/data/profile";
import { NAV_ITEMS } from "@/data/nav";
import type { Theme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";
import { ResumeButton } from "./ResumeButton";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  activeId: string;
}

export function Navbar({ theme, onToggleTheme, activeId }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Elevate the bar once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape (returning focus to the toggle) or when the layout goes desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const isDark = theme === "dark";

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200",
        scrolled || open ? "border-line bg-bg/90" : "border-transparent bg-bg/60",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#home" className="group flex items-center gap-2.5 rounded-lg" aria-label={`${profile.name} — back to top`}>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-strong font-mono text-sm font-bold text-accent-fg transition-transform duration-200 group-hover:-rotate-6"
          >
            {profile.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-ink sm:block">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      active ? "bg-accent-soft text-accent-soft-fg" : "text-muted hover:bg-surface-2 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ResumeButton className="btn btn-secondary btn-sm hidden md:inline-flex" />
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
          </button>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-200 hover:border-accent hover:text-accent lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-bg lg:hidden">
          <ul className="container-page grid gap-1 py-3">
            {NAV_ITEMS.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active ? "bg-accent-soft text-accent-soft-fg" : "text-ink hover:bg-surface-2",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-2 md:hidden">
              <ResumeButton className="btn btn-primary w-full" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
