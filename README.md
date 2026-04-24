# gshriharsha.github.io

Personal portfolio website for **Shri Harsha** — Salesforce Technical Architect & 10x Certified.

[![Deploy to GitHub Pages](https://github.com/gshriharsha/gshriharsha.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/gshriharsha/gshriharsha.github.io/actions/workflows/deploy.yml)

**Live:** [gshriharsha.github.io](https://gshriharsha.github.io/)

## Tech Stack

| Layer      | Technology                                                 |
| ---------- | ---------------------------------------------------------- |
| Framework  | [Astro 5](https://astro.build) (static output)             |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com)                 |
| Language   | TypeScript                                                 |
| Icons      | [Iconify](https://iconify.design/) (Lucide + Simple Icons) |
| Fonts      | Inter, JetBrains Mono                                      |
| Deployment | GitHub Actions → GitHub Pages                              |

## Features

- Responsive, mobile-first design
- Light / dark theme with `localStorage` persistence
- Scroll-reveal animations
- Data-driven content — all text lives in typed TypeScript files
- Dynamic project case-study pages (`/projects/<slug>/`)
- Auto-generated sitemap
- SEO-ready with Open Graph metadata
- Accessible markup and keyboard navigation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:4321
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
├── public/                  # Static assets (resume, images, favicons)
│   └── images/
│       └── certifications/  # Certification badge images
├── src/
│   ├── components/          # Astro components
│   ├── data/                # Content data files (TypeScript)
│   │   ├── site.ts          # Name, title, contact, stats
│   │   ├── experience.ts    # Work history timeline
│   │   ├── skills.ts        # Skill groups
│   │   ├── certifications.ts# Salesforce certifications
│   │   ├── education.ts     # Education history
│   │   └── projects.ts      # Case studies → /projects/<slug>/
│   ├── layouts/             # Page layouts
│   ├── pages/               # Routes (index, 404, resume, projects)
│   ├── scripts/             # Client-side JS (theme, scroll-reveal)
│   └── styles/              # Global CSS and design tokens
├── .github/workflows/       # CI/CD pipeline
├── astro.config.mjs         # Astro configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Editing Content

All content is data-driven. Edit the typed files in `src/data/`:

| File                | What it controls                                       |
| ------------------- | ------------------------------------------------------ |
| `site.ts`           | Name, title, summary, contact links, stats             |
| `experience.ts`     | Roles for the experience timeline                      |
| `skills.ts`         | Skill groups and chips                                 |
| `certifications.ts` | Salesforce certifications                              |
| `education.ts`      | Education history                                      |
| `projects.ts`       | Case studies (each becomes a `/projects/<slug>/` page) |

Static assets live in `public/` — replace `resume.pdf`, `favicon.svg`, and `og-image.svg` as needed.

## Deployment

Push to `main` and the GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy to GitHub Pages.

### First-time setup

1. Create a GitHub repository named `<your-username>.github.io`
2. Push this project to the `main` branch
3. Go to **Settings → Pages → Source** and select **GitHub Actions**
4. The workflow will trigger on the next push to `main`

## License

This project is licensed under the [MIT License](LICENSE).
