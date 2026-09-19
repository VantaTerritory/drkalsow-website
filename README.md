# Dr. Kalsow — Website

Next.js site for Dr. Sergei Kalsow, MD (www.drkalsow.com), migrated from Squarespace.
Built by Terra Agency. Repository: github.com/VantaTerritory/drkalsow-website.
Page registry, SEO metadata and redirects live in
`lib/seo/pages.ts` and `next.config.mjs`; see `AGENTS.md` for the project rules.

## Commands

```bash
npm run dev          # local dev server
npm run build        # production build (webpack, used by Vercel and Hostinger)
npm run build:turbo  # Turbopack build, local only
npm start            # serve the production build
npm run lint
```

## Deploy

- **Preview:** Vercel, auto-deploys from `main`.
- **Production:** Hostinger (hPanel → Deployments). Node 22.x, build command
  `npm run build`, output `.next`.

The Hostinger host cannot load the native SWC binary, so the build runs on the
WASM fallback. Two things must stay as they are for that to work:

- The Next config is `next.config.mjs`, not `.ts`.
- The default `build` script uses `--webpack`, not Turbopack.

## Environment

Copy `.env.example` to `.env.local` and fill in the values. The contact form
needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`; without
them the form endpoint responds 503.
