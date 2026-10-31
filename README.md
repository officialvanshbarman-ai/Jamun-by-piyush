# Jamun™ — Beyond Fruit.

A responsive luxury fruit company parody, featuring Piyush Roy as a clearly labeled fictional CEO persona. Built with Next.js App Router, TypeScript, Tailwind CSS and Motion. No backend or paid services.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production: `npm run build` then `npm start`.

## Checks

- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run build` — prerender all routes and production bundle
- `npm run format` — Prettier

## Structure

`src/app` contains the homepage, eight editorial routes and five product detail pages, metadata, icon, sitemap, robots and 404. `src/components/layout/Shell.tsx` owns navigation, accessible dialogs and the in-memory bag. `src/components/sections/Pages.tsx` contains editorial layouts and interactions. `src/data/content.ts` holds product and navigation content; `src/styles/globals.css` defines responsive presentation. Unused optional 3D is intentionally omitted to keep the site lightweight.

The collection supports presentation variants, quantities, removal, subtotal and mock checkout. The timeline has selectable chapters. Research programs and job descriptions expand. Careers, press and contact open demo dialogs. Bag state lasts through client navigation and resets on refresh. Nothing collects payment, CVs, contact details or sensitive data; no outgoing form requests exist.

## Assets and provenance

Original user-supplied logo and founder collage are preserved in `public/images/brand` and `public/images/piyush`. The logo is proportionally cropped only to remove empty transparent margins; CSS inversion presents the same mark on dark backgrounds. Founder crops preserve the supplied appearance; no new people or personal biographical facts are introduced.

Original AI campaign images generated with the built-in imagegen tool live as optimized WebP assets in `public/images/products` and `public/images/editorial`. Prompts and output mapping are recorded in `ASSETS.md`. Infinity uses an alternate crop of the generated fruit campaign. Editorial lab and orchard imagery are crops of the supplied collage. Magazine covers are original browser layouts using those assets, never external publications. All assets are local; no remote image services or fonts are requested. User-provided material is used under the user's supplied authorization; no third-party licensing claims are made.

## Deployment

Deploy as a standard Next.js application (e.g. Node hosting supporting Next.js). No API keys or environment files are required. Optionally set `NEXT_PUBLIC_SITE_URL` to the actual public origin before building to emit correct canonical, sitemap, robots and Open Graph URLs; the default `https://jamun.example` is deliberately a reserved example domain, not a claimed live website. GitHub source delivery does not itself host a live Next.js application.

## Fiction / disclaimer

**A fictional parody project — not a real company.** Products, prices, roles, metrics, innovation programs and all CEO quotations are fictional. There are no real orders, investments, jobs, offices, health claims or third-party endorsements. Piyush Roy's corporate persona is a character, not a statement about his actual life.
