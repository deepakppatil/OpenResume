/**
 * Minimal, dependency-free PDF résumé generator.
 *
 * Builds a clean, text-based (ATS-friendly) A4 résumé directly from the data in
 * src/data/profile.js, using the built-in Helvetica fonts — so the downloadable PDF is
 * always in sync with the website and adds nothing to the bundle size.
 */
import { profile, experience, education, certifications, skills, projects, achievements } from "@/data/profile";
import { formatDuration, formatPeriod, monthsBetween } from "./dates";
import { prettyUrl } from "./assets";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const INK = "0.09 0.10 0.10";
const MUTED = "0.33 0.35 0.35";
const ACCENT = "0.06 0.46 0.43";
const RULE = "0.82 0.84 0.83";

/** Helvetica advance widths (1/1000 em) for ASCII 32–126. */
const HELV = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, // 32–41
  389, 584, 278, 333, 278, 278, 556, 556, 556, 556, // 42–51
  556, 556, 556, 556, 556, 556, 278, 278, 584, 584, // 52–61
  584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, // 62–71
  722, 278, 500, 667, 556, 833, 722, 778, 667, 778, // 72–81
  722, 667, 611, 722, 667, 944, 667, 667, 611, 278, // 82–91
  278, 278, 469, 556, 333, 556, 556, 500, 556, 556, // 92–101
  278, 556, 556, 222, 222, 500, 222, 833, 556, 556, // 102–111
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, // 112–121
  500, 334, 260, 334, 584, // 122–126
];

/** Unicode → WinAnsi code points for the typographic characters we use. */
const WIN: Record<string, number> = {
  "—": 0x97,
  "–": 0x96,
  "•": 0x95,
  "‘": 0x91,
  "’": 0x92,
  "“": 0x93,
  "”": 0x94,
  "…": 0x85,
};

function encode(input: string) {
  let out = "";
  for (const ch of input.normalize("NFC")) {
    const code = ch.codePointAt(0) ?? 63;
    if (code >= 32 && code < 127) out += ch;
    else if (WIN[ch] !== undefined) out += String.fromCharCode(WIN[ch]);
    else if (code >= 160 && code <= 255) out += ch;
    else if (ch === "→") out += "->";
    else if (ch === "\n" || ch === "\t") out += " ";
    else out += "?";
  }
  return out;
}

function glyphWidth(code: number) {
  if (code >= 32 && code <= 126) return HELV[code - 32];
  switch (code) {
    case 0x95:
      return 350;
    case 0x96:
      return 556;
    case 0x97:
    case 0x85:
      return 1000;
    case 0x91:
    case 0x92:
      return 222;
    case 0x93:
    case 0x94:
      return 333;
    case 0xb7:
      return 278;
    default:
      return 556;
  }
}

/** Width in points of an already-encoded string. */
function measure(text: string, size: number, bold = false) {
  let w = 0;
  for (let i = 0; i < text.length; i++) w += glyphWidth(text.charCodeAt(i));
  return (w / 1000) * size * (bold ? 1.07 : 1);
}

function escapePdf(text: string) {
  return text.replace(/([\\()])/g, "\\$1");
}

/** Remove the `**bold**` markers used by highlights in the data file. */
function stripMarkers(text: string) {
  return text.replace(/\*\*(.+?)\*\*:?\s*/g, "$1 — ");
}

function wrap(text: string, size: number, maxWidth: number, bold = false) {
  const lines: string[] = [];
  let line = "";
  const push = () => {
    if (line) lines.push(line);
    line = "";
  };
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (measure(candidate, size, bold) <= maxWidth) {
      line = candidate;
      continue;
    }
    push();
    if (measure(word, size, bold) <= maxWidth) {
      line = word;
    } else {
      // Very long token (e.g. a URL): break by characters
      let chunk = "";
      for (const c of word) {
        if (measure(chunk + c, size, bold) > maxWidth) {
          lines.push(chunk);
          chunk = "";
        }
        chunk += c;
      }
      line = chunk;
    }
  }
  push();
  return lines;
}

interface TextOptions {
  size?: number;
  bold?: boolean;
  color?: string;
  indent?: number;
  leading?: number;
  after?: number;
}

class PdfDocument {
  private pages: string[][] = [];
  private ops: string[] = [];
  private y = PAGE_H - MARGIN;

  constructor() {
    this.pages.push(this.ops);
  }

  private newPage() {
    this.ops = [];
    this.pages.push(this.ops);
    this.y = PAGE_H - MARGIN;
  }

  /** Start a new page if fewer than `height` points remain. */
  ensure(height: number) {
    if (this.y - height < MARGIN + 14) this.newPage();
  }

  gap(points: number) {
    this.y -= points;
  }

  private drawText(text: string, x: number, baseline: number, size: number, bold: boolean, color: string) {
    this.ops.push(
      `${color} rg BT /${bold ? "F2" : "F1"} ${size} Tf ${x.toFixed(2)} ${baseline.toFixed(2)} Td (${escapePdf(text)}) Tj ET`,
    );
  }

  /** Word-wrapped paragraph. */
  paragraph(raw: string, opts: TextOptions = {}) {
    const { size = 10, bold = false, color = INK, indent = 0, leading = 1.38, after = 0 } = opts;
    const lines = wrap(encode(raw), size, CONTENT_W - indent, bold);
    const lineHeight = size * leading;
    for (const line of lines) {
      this.ensure(lineHeight);
      this.drawText(line, MARGIN + indent, this.y - size, size, bold, color);
      this.y -= lineHeight;
    }
    this.y -= after;
  }

  bullet(raw: string, opts: TextOptions = {}) {
    const { size = 9.5, color = INK, indent = 0, leading = 1.38, after = 2 } = opts;
    const textIndent = indent + 11;
    const lines = wrap(encode(stripMarkers(raw)), size, CONTENT_W - textIndent);
    const lineHeight = size * leading;
    lines.forEach((line, i) => {
      this.ensure(lineHeight);
      if (i === 0) this.drawText(encode("•"), MARGIN + indent + 2, this.y - size, size, false, ACCENT);
      this.drawText(line, MARGIN + textIndent, this.y - size, size, false, color);
      this.y -= lineHeight;
    });
    this.y -= after;
  }

  /** Bold text on the left, plain text right-aligned on the same baseline. */
  leftRight(left: string, right: string, size = 10.5) {
    const lineHeight = size * 1.4;
    this.ensure(lineHeight);
    const l = encode(left);
    const r = encode(right);
    this.drawText(l, MARGIN, this.y - size, size, true, INK);
    this.drawText(r, PAGE_W - MARGIN - measure(r, size - 1), this.y - size, size - 1, false, MUTED);
    this.y -= lineHeight;
  }

  /** Label in a fixed left column, wrapped value to its right. */
  labelled(label: string, value: string, labelWidth = 112, size = 9.5) {
    const lines = wrap(encode(value), size, CONTENT_W - labelWidth);
    const lineHeight = size * 1.4;
    lines.forEach((line, i) => {
      this.ensure(lineHeight);
      if (i === 0) this.drawText(encode(label), MARGIN, this.y - size, size, true, INK);
      this.drawText(line, MARGIN + labelWidth, this.y - size, size, false, INK);
      this.y -= lineHeight;
    });
    this.y -= 3;
  }

  rule(color = RULE, width = 0.7) {
    this.ops.push(
      `${color.replace(/ /g, " ")} RG ${width} w ${MARGIN} ${this.y.toFixed(2)} m ${PAGE_W - MARGIN} ${this.y.toFixed(2)} l S`,
    );
  }

  section(title: string) {
    this.ensure(56);
    this.gap(12);
    this.drawText(encode(title.toUpperCase()), MARGIN, this.y - 10.5, 10.5, true, ACCENT);
    this.y -= 15;
    this.rule();
    this.gap(8);
  }

  /** Serialise to PDF bytes. */
  build(title: string, author: string) {
    const total = this.pages.length;
    // Footer on each page
    this.pages.forEach((ops, i) => {
      const footer = encode(`${author}  -  Resume  -  Page ${i + 1} of ${total}`);
      ops.push(
        `${MUTED} rg BT /F1 8 Tf ${(PAGE_W / 2 - measure(footer, 8) / 2).toFixed(2)} 26 Td (${escapePdf(footer)}) Tj ET`,
      );
    });

    const objects: string[] = [];
    // 1 Catalog, 2 Pages, 3 F1, 4 F2, 5 Info, then page/content pairs from 6
    const firstPage = 6;
    const kids = this.pages.map((_, i) => `${firstPage + i * 2} 0 R`).join(" ");
    objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    objects[2] = `<< /Type /Pages /Kids [${kids}] /Count ${total} >>`;
    objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
    objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
    objects[5] = `<< /Title (${escapePdf(encode(title))}) /Author (${escapePdf(encode(author))}) /Producer (Portfolio CV generator) >>`;
    this.pages.forEach((ops, i) => {
      const pageId = firstPage + i * 2;
      const stream = ops.join("\n");
      objects[pageId] =
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${pageId + 1} 0 R >>`;
      objects[pageId + 1] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    });

    let out = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
    const offsets: number[] = [];
    for (let id = 1; id < objects.length; id++) {
      offsets[id] = out.length;
      out += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }
    const xref = out.length;
    out += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for (let id = 1; id < objects.length; id++) {
      out += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
    }
    out += `trailer\n<< /Size ${objects.length} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xref}\n%%EOF`;

    const bytes = new Uint8Array(out.length);
    for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
    return bytes;
  }
}

export function buildResumePdf() {
  const doc = new PdfDocument();

  // Header
  doc.paragraph(profile.name, { size: 24, bold: true, leading: 1.2 });
  doc.paragraph(profile.title, { size: 12.5, color: ACCENT, bold: true, after: 3 });
  const contact = [
    profile.email,
    profile.location,
    prettyUrl(profile.social.linkedin),
    prettyUrl(profile.social.github),
  ].join("  |  ");
  doc.paragraph(contact, { size: 9, color: MUTED, after: 2 });
  doc.gap(2);
  doc.rule(INK, 1);

  // Summary
  doc.section("Professional summary");
  profile.summary.forEach((p, i, arr) => doc.paragraph(p, { size: 10, after: i < arr.length - 1 ? 4 : 0 }));

  // Experience
  doc.section("Experience");
  experience.forEach((job) => {
    doc.ensure(80);
    doc.leftRight(job.role, `${formatPeriod(job.start, job.end)}  (${formatDuration(monthsBetween(job.start, job.end))})`);
    const orgLine = [job.company, job.domains?.length ? job.domains.join(" · ") : "", job.location]
      .filter(Boolean)
      .join("  |  ");
    doc.paragraph(orgLine, { size: 9.5, color: ACCENT, bold: true, after: 2 });
    doc.paragraph(job.summary, { size: 9.5, color: MUTED, after: 3 });
    job.highlights.forEach((h) => doc.bullet(h));
    doc.paragraph(`Technologies: ${job.technologies.join(", ")}`, { size: 8.5, color: MUTED, after: 9 });
  });

  // Skills
  doc.section("Skills");
  skills.forEach((group) => {
    doc.paragraph(group.category, { size: 9.5, bold: true, after: 1 });
    doc.paragraph(
      group.items.map((s) => s.name).join(", "),
      { size: 9, color: MUTED, indent: 10, after: 6 },
    );
  });

  // Projects
  doc.section("Selected projects");
  projects.forEach((p) => {
    doc.ensure(60);
    doc.leftRight(p.title, `${p.category}  |  ${p.year}`);
    doc.paragraph(p.description, { size: 9.5, after: 1 });
    doc.paragraph(`${p.role}${p.impact ? `  -  ${p.impact}` : ""}`, { size: 9, color: MUTED });
    doc.paragraph(`Stack: ${p.tags.join(", ")}`, { size: 8.5, color: MUTED });
    const links = [p.repoUrl, p.liveUrl].filter(Boolean).map(prettyUrl).join("   ");
    if (links) doc.paragraph(links, { size: 8.5, color: ACCENT });
    doc.gap(6);
  });

  // Education (optional — omitted when the CV lists none)
  if (education.length) {
    doc.section("Education");
    education.forEach((e) => {
      doc.ensure(50);
      doc.leftRight(e.degree, `${e.start} — ${e.end}`);
      doc.paragraph(`${e.institution}  |  ${e.location}`, { size: 9.5, color: ACCENT, bold: true, after: 1 });
      doc.paragraph(e.grade, { size: 9, color: MUTED, after: 1 });
      doc.paragraph(e.details, { size: 9.5, after: 6 });
    });
  }

  // Certifications
  if (certifications.length) {
    doc.section("Certifications");
    certifications.forEach((c) => doc.bullet(`${c.name} - ${c.issuer}${c.year ? ` (${c.year})` : ""}`));
  }

  // Achievements
  doc.section("Career highlights");
  achievements.forEach((a) => doc.bullet(`${a.title} (${a.year}) - ${a.organization}. ${a.description}`));

  // Interests
  if (profile.interests?.length) {
    doc.section("Interests");
    doc.paragraph(
      profile.interests
        .map((i) => `${i.title}${i.description ? ` — ${i.description}` : ""}`)
        .join("  •  "),
      { size: 9.5, after: 0 },
    );
  }

  return doc.build(`${profile.name} - Resume`, profile.name);
}

/** Generate the PDF and trigger a browser download. */
export function downloadResumePdf() {
  const bytes = buildResumePdf();
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = profile.resumeFileName || "resume.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}
