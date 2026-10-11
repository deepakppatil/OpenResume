const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type YM = string; // "YYYY-MM"
type MaybeYM = YM | null | undefined;

export function parseYM(value: YM) {
  const [y, m] = value.split("-").map(Number);
  return { year: y, month: (m || 1) - 1 };
}

/** Absolute month number (year * 12 + month) — handy for date maths. */
export function monthIndex(value: YM) {
  const { year, month } = parseYM(value);
  return year * 12 + month;
}

export function currentMonthIndex() {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
}

/** Inclusive number of months between two "YYYY-MM" values (end null = today). */
export function monthsBetween(start: YM, end?: MaybeYM) {
  const e = end ? monthIndex(end) : currentMonthIndex();
  return e - monthIndex(start) + 1;
}

export function formatMonth(value: YM) {
  const { year, month } = parseYM(value);
  return `${MONTHS[month]} ${year}`;
}

export function formatPeriod(start: YM, end?: MaybeYM) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

export function formatDuration(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest > 0) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

export function formatLongDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Whole years between the earliest start date and today. */
export function yearsOfExperience(starts: YM[]) {
  if (!starts.length) return 0;
  const earliest = Math.min(...starts.map(monthIndex));
  return Math.floor((currentMonthIndex() - earliest + 1) / 12);
}
