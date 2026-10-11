import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { formatLongDate } from "@/utils/dates";
import { GithubIcon, LinkedinIcon } from "./icons";

const iconLink =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent";

export function Footer() {
  return (
    <footer className="no-print border-t border-line bg-surface">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-ink">{profile.name}</span>. All rights reserved.
          </p>
          <p>
            Last updated: <time dateTime={profile.lastUpdated}>{formatLongDate(profile.lastUpdated)}</time>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-3" aria-label="Social links">
            <li>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub (opens in a new tab)">
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
            </li>
            <li>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn (opens in a new tab)">
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className={iconLink} aria-label="Send an email">
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </li>
          </ul>
          <a href="#home" className="btn btn-secondary btn-sm">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
