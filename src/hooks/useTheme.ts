import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Dark is the default theme. The visitor's choice is persisted in localStorage and applied
 * before first paint by an inline script in index.html (prevents a flash of the wrong theme).
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0d0f0f" : "#fafaf9");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage may be unavailable (private mode) — ignore */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return { theme, toggle };
}
