/**
 * Resolve a path from the data file against Vite's base URL so the site works both at
 * the domain root (https://user.github.io/) and under a sub-path (…/portfolio/).
 * Absolute URLs (https:, mailto:, data:) are returned untouched.
 */
export function assetUrl(path: string) {
  if (!path) return path;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

/** Strip protocol + trailing slash for compact display: https://github.com/x/ → github.com/x */
export function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}
