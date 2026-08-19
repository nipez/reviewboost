# ReviewBoost

Turn happy customers into 5-star reviews. ReviewBoost helps local businesses grow their Google reviews with smart QR displays and AI-powered review management.

This is a **static site**, recovered from the live Cloudflare Pages direct-upload deployment (`reviewboost`, production domain [reviewboost.pages.dev](https://reviewboost.pages.dev)). It was not previously on Git, so the published files are the source of truth.

The homepage is a single ~345KB HTML app: inlined CSS, a React 18 UMD bundle from unpkg, and client-side views for the landing page, setup wizard, dashboard (iPad/TV displays), and SaaS admin.

## Run locally

```bash
npx serve .
```

Then open the URL `serve` prints (usually http://localhost:3000).

## Layout

- `index.html` — entire app (landing, setup, dashboard, saas-admin)

The original Pages upload also included a `__MACOSX/._index.html` AppleDouble sidecar; that junk file was not recovered.

## Cloudflare Pages

- **Project name:** `reviewboost`
- **Pages.dev:** https://reviewboost.pages.dev

Direct Upload originally (not Git-connected). Re-deploy from this repo after connecting the project to GitHub if you want Git-based deploys.
