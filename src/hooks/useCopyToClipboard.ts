import { useCallback, useEffect, useRef, useState } from "react";

/** Copy text to the clipboard (with a legacy fallback) and expose a short-lived `copied` flag. */
export function useCopyToClipboard(resetAfter = 2200) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        // Fallback for insecure contexts / older browsers
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try {
          ok = document.execCommand("copy");
        } catch {
          ok = false;
        }
        area.remove();
      }
      if (ok) {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), resetAfter);
      }
      return ok;
    },
    [resetAfter],
  );

  return { copied, copy };
}
