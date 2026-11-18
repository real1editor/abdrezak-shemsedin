# Abdrezak Shemsedin — Master Portfolio + Six Domain Portfolios

Personal portfolio for **Abdrezak Shemsedin Hakimo** — Electrical & Computer Engineering
candidate (2027) at Wolaita Sodo University, full-stack developer, AI systems engineer,
data analyst, and creative producer.

The master site lives at `/` and carries the complete record: every domain, every project,
and all 35 verified credentials. Six standalone domain portfolios sit beneath it, each a
complete site for clients who only need that practice.

Built with Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, and
deployed on Vercel.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Master portfolio: hero, metrics, about, disciplines, course focus, domain gateway, languages, skills, tools, education, experience, projects, credentials, FAQ, contact |
| `/fullstack` | Full-Stack Web & App Development |
| `/ece` | Electrical & Computer Engineering |
| `/ai` | AI Systems & Agent Engineering |
| `/ml-dl` | Machine Learning & Deep Learning |
| `/data` | Data Analysis & Visualization |
| `/video` | Creative Studio & Video Production |
| `/resume` | Master print-ready resume |
| `/<domain>/resume` | Domain-specific print-ready resume |
| `/ece-student-developer`, `/ethiopian-web-developer`, `/full-stack-developer-ethiopia` | SEO landing pages |

Domain portfolios never link to sibling domains; only the master site links out to them.

## Architecture

```
src/
  app/
    page.tsx                  Master portfolio
    <domain>/page.tsx         Six standalone domain portfolios
    resume/page.tsx           Master resume
    <domain>/resume/page.tsx  Domain resumes
    layout.tsx                Metadata, JSON-LD Person schema, theme bootstrap, fonts
    sitemap.ts / robots.ts    SEO routes
    opengraph-image.tsx       Generated social card
  components/
    portfolio-view.tsx        Shared page composition (master + domains)
    resume-view.tsx           Shared resume layout (master + domains)
    portfolio-context.tsx     Supplies the active PortfolioData to section components
    sections/                 Hero, metrics, about, projects, credentials, contact, …
  data/
    masterPortfolio.ts        Source of truth: profile, six pillars, projects, 35 credentials
    site.ts                   Master/domain view models, filtering, metadata helpers
  types/portfolio.ts          Shared UI data contracts
```

Each domain page is built from the same section components but receives its own
`PortfolioData` from `getDomainView(slug)` — projects, credentials, skills, tools,
experience, education, and copy are all scoped to that domain.

## Content

`src/data/masterPortfolio.ts` is the single source of truth for profile, projects, and
credentials. `src/data/site.ts` composes it into the master view and six domain views.

To add a credential:

1. Give it a unique kebab-case `id`.
2. Set `pillarTags` to one or more of `ece | fullstack | ai | ml-dl | data | video | vault`.
3. Set `featuredInPillar: true` to surface it on the matching domain page, or `false` for
   archive-only.
4. Add a real `credentialId` and `verificationUrl` when one exists — never invent links.
5. Keep `issuedAt` as an ISO date (sorting) and `issueDate` as the human-readable label.

Counts, filters, sitemap entries, and domain pages update automatically.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + TypeScript check
npm run lint
npm run audit:data # credential/project integrity report
npm start
```

Geist Sans and Geist Mono are self-hosted from `src/app/fonts/`, so builds do not depend
on Google Fonts network access.
