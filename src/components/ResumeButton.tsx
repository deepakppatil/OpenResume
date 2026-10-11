import type { ReactNode } from "react";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { assetUrl } from "@/utils/assets";
import { downloadResumePdf } from "@/utils/resumePdf";

interface ResumeButtonProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Résumé download. If `profile.resumeUrl` is set, link to that static PDF; otherwise generate
 * an up-to-date PDF from the data file in the browser.
 */
export function ResumeButton({ className, children }: ResumeButtonProps) {
  const content = children ?? (
    <>
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>Download Resume</span>
    </>
  );

  if (profile.resumeUrl) {
    return (
      <a href={assetUrl(profile.resumeUrl)} download={profile.resumeFileName} className={className}>
        {content}
        <span className="sr-only"> (PDF)</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={downloadResumePdf} className={className}>
      {content}
      <span className="sr-only"> (PDF)</span>
    </button>
  );
}
