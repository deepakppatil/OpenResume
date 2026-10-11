<div align="center">

# Interactive CV & Portfolio

**A fast, accessible, single-page portfolio and résumé built with React 19 and Vite.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github)](https://pages.github.com/)

[Overview](#-overview) ·
[Features](#-features) ·
[Edit Content](#-edit-your-content) ·
[Getting Started](#-getting-started) ·
[Deployment](#-deployment) ·
[Accessibility](#-accessibility-notes)

</div>

---

## 🌱 Overview

This project is the personal portfolio and interactive CV for Deepak Patil — a modern single-page experience for presenting leadership, engineering architecture, distributed systems work, and AI platform thinking.

The site is designed as a fast, static, searchable profile with strong information architecture: a concise headline, executive summary, multi-role experience, projects, skills, certifications, achievements, and contact CTA. It is optimized for GitHub Pages and works well as a personal landing page for recruiters, hiring teams, and collaborators.

Built with **React 19 + Vite**, styled for readability and responsive presentation, and intended to be easy to update from a single content source.

---

## ✨ Features

### Professional presentation

- Sticky navigation with active-section highlighting and smooth scrolling
- Executive summary, experience timeline, and project archive in a single-page layout
- Skill groups with rich detail panels and confidence-style depth labels
- Certifications, achievements, and contact sections
- Light and dark theme toggle persisted in `localStorage`
- Printable CV mode and browser-generated résumé export
- SEO metadata, Open Graph tags, canonical URL, and JSON-LD `Person` data

### Visitor experience

| Section | Purpose |
|---|---|
| **Hero** | Introduce the professional identity, headline, and contact options |
| **About** | Summarize leadership focus, strengths, and background |
| **Experience** | Present reverse-chronological work history with domain context |
| **Projects** | Highlight platforms, systems, and technical outcomes |
| **Skills** | Show capability areas and depth across domains |
| **Certifications** | Present formal credentials and learning milestones |
| **Highlights** | Surface measurable impact and platform outcomes |
| **Contact** | Provide direct reach-out paths via email and WhatsApp |

### Engineering

- Content driven from `src/data/profile.js`
- Responsive single-page layout with accessible focus states and skip link
- Print-friendly CSS and downloadable résumé support
- Fast static deployment with Vite build output
- Minimal dependencies and easy GitHub Pages hosting

---

## 📝 Edit your content

The site is designed around a single content source: **`src/data/profile.js`**.

This file contains:

- personal details and headline
- experience and highlights
- project list and skill groups
- certifications and achievements
- contact links and résumé metadata
- social profile URLs and site settings

You may also want to update **`index.html`** for:

- page title and description
- canonical URL
- Open Graph and Twitter metadata
- JSON-LD structured profile data

### Content notes

| Section | Source |
|---|---|
| About | Professional summary, current focus, strengths, and interests |
| Experience | Work history and domain tags for each role |
| Projects | Platforms and systems derived from the role experience |
| Skills | Areas of expertise and skill-depth ratings |
| Certifications | Certifications list |
| Highlights | Measurable outcomes and platform milestones |

| What | Where |
|---|---|
| Profile photo | `src/assets/profile.jpg` |
| Social-share image | `public/images/og-image.jpg` |
| Project screenshots | `public/images/` and `profile.js` |
| Your own PDF résumé | `public/resume.pdf` and `resumeUrl: "/resume.pdf"` |

> Tip: optimize screenshots to **WebP/AVIF** and keep them small for faster page loads.

---

## 🚀 Getting Started

### Requirements

| Tool | Minimum version |
|---|---|
| [Node.js](https://nodejs.org/) | 18+ |
| [npm](https://www.npmjs.com/) | 9+ |

### Installation

```bash
git clone https://github.com/deepakppatil/OpenResume.git
cd OpenResume
npm install
```

### Available scripts

```bash
npm run dev        # Start local development server at http://localhost:5173
npm run build      # Create production build in dist/
npm run preview    # Preview the production build locally
```

---

## ⚙️ Configuration

No environment variables are required for the standard build. The main profile data and site metadata live in:

```text
src/data/profile.js
```

Before publishing, review these values:

- email, phone, and WhatsApp contact details
- LinkedIn and GitHub URLs
- canonical site URL in `index.html`
- résumé filename and `resumeUrl` settings
- profile photo and OG image files

---

## 📁 Project Structure

```text
src/
├── components/          # Page sections and reusable UI blocks
├── data/
│   └── profile.js       # Core content and résumé data
├── hooks/               # Reusable hooks for theme, section tracking, and clipboard
├── styles/              # App styling and print layout
├── assets/              # Profile and image assets
├── App.tsx              # Main page composition
├── main.tsx             # App entry point
└── index.css            # Global styles

public/
├── images/              # Open Graph and supporting imagery
├── robots.txt           # SEO bot instructions
└── resume.pdf           # Optional custom PDF if you choose to serve one
```

---

## 📦 Deployment

This app builds to a static bundle and can be deployed to any static hosting provider, including:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### Build the production app

```bash
npm run build
```

The generated static output is placed in `dist/`.

### Deploy to GitHub Pages

1. Push the project to the `main` branch of `deepakppatil/OpenResume`.
2. Open **Settings → Pages** in the repository and select **GitHub Actions** as the build and deployment source.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys the site whenever changes are pushed to `main`.
4. Once the workflow succeeds, the site is available at <https://deepakppatil.github.io/OpenResume/>.

The Vite base path is configured for this GitHub Pages project URL in GitHub Actions builds. Local development and builds use `/`.

---

## 🌐 Optional: custom domain with Cloudflare DNS

If you want to serve the site on a custom domain, add the following DNS records in Cloudflare:

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `deepakppatil.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Then add the domain in your GitHub Pages settings, validate it, and enable **Enforce HTTPS**. Update the canonical and Open Graph URLs in `index.html` and the `siteUrl` value in `profile.js` to match.

---

## ♿ Accessibility notes

The project includes accessibility-focused details such as:

- semantic landmarks and heading hierarchy
- skip link and visible focus states
- `aria-expanded` / `aria-pressed` patterns on interactive controls
- labelled form fields and inline validation feedback
- contrast-conscious color choices
- support for reduced-motion preferences
- readable, responsive typography for screen readers and mobile devices

---

## 🧩 License

This repository is intended for personal use and portfolio publishing. If you fork it for your own site, update the content and branding accordingly.
