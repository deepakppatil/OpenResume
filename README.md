# Deepak Patil — Interactive CV & Portfolio

A fast, accessible, single-page portfolio built with **React 19**, **Vite** and **Tailwind CSS**, deployable for free on **GitHub Pages**.

## Features

- Sticky navigation with active-section highlighting, skip link and smooth scrolling
- Expandable employment history **and** a Gantt-style career timeline view
- Filterable project gallery (type, domain, technology) with live result count
- Skill groups with detail panels (proficiency, years, description)
- Education, certifications and achievements
- Light (default) / dark theme toggle, persisted in `localStorage`
- Résumé download — a PDF is generated in the browser from your data (or serve your own `/resume.pdf`)
- Print-friendly CV layout (`Print CV` button / `Ctrl+P`)
- Copy-email button, WhatsApp link and an accessible mailto-based contact form
- SEO metadata, Open Graph / Twitter tags, canonical URL and JSON-LD `Person` data

## Edit your content

Everything lives in **`src/data/profile.js`** — personal details, experience, projects, skills, certifications,
achievements, interests, social links and résumé settings. The website, the printable CV and the PDF résumé
all read from that one file.

Also check **`index.html`**: `<title>`, description, canonical URL, Open Graph tags and the JSON-LD block
(currently pointing at `https://deepakppatil.github.io/`).

### Content notes for this CV

| Section        | Source in the CV                                                     |
| -------------- | -------------------------------------------------------------------- |
| About          | Professional summary, current focus, strengths, interests             |
| Experience     | Work history, reverse chronological, with `domains` per role          |
| Projects       | Platforms and systems derived from the roles above                    |
| Skills         | "Areas of expertise" + "Skill depth" ratings (3 Intermediate · 4 Upper intermediate · 5 Advanced) |
| Certifications | Certifications list (no education is listed in the CV)                |
| Highlights     | Measurable outcomes and platform milestones from the roles            |

**Not in the CV:** there is no education entry, so that panel shows a placeholder. Add an `education` array to
`profile.js` to fill it.

| What                      | Where                                                                  |
| ------------------------- | ---------------------------------------------------------------------- |
| Profile photo             | replace `src/assets/profile.jpg` (bundled & inlined)                   |
| Social-share image        | replace `public/images/og-image.jpg` (1200×630)                        |
| Project screenshots       | add images to `public/images/` and set `image` in `profile.js`         |
| Your own PDF résumé       | put it in `public/resume.pdf` and set `resumeUrl: "/resume.pdf"`       |

> Tip: convert screenshots to **WebP/AVIF** before adding them, and keep them under ~150 KB.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy to GitHub Pages (free)

1. Create a public repository named `deepakppatil.github.io` (or e.g. `portfolio`) and push this project to `main`.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
4. **Project repositories only** (e.g. `portfolio`): set a repository **variable** `BASE_PATH` to `/portfolio/`
   (Settings → Secrets and variables → Actions → Variables). User sites (`deepakppatil.github.io`) need nothing.
5. Enable **Dependabot alerts** in *Settings → Code security*.

## Optional: custom domain with Cloudflare DNS

Add these records in Cloudflare (DNS only / grey cloud while GitHub validates the domain):

| Type  | Name  | Value                   |
| ----- | ----- | ----------------------- |
| CNAME | `www` | `deepakppatil.github.io` |
| A     | `@`   | `185.199.108.153`       |
| A     | `@`   | `185.199.109.153`       |
| A     | `@`   | `185.199.110.153`       |
| A     | `@`   | `185.199.111.153`       |

Then enter the domain in **Settings → Pages**, wait for validation and enable **Enforce HTTPS**. Finally update the
canonical / Open Graph URLs in `index.html` and `siteUrl` in `profile.js`. No application code changes are needed.

## Accessibility notes

Semantic landmarks and heading order, skip link, visible focus rings, `aria-expanded` / `aria-pressed` on
interactive controls, live regions for filter results and copy feedback, labelled form fields with inline errors,
colour pairs chosen for WCAG 2.1 AA contrast, and `prefers-reduced-motion` support.
