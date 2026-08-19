# ReviewBoost

Local-business review growth app. The HTML prototype lives in `prototype/`. The runnable product is the Vite + Express app in `src/` and `server/`.

## Cursor Cloud specific instructions

- Run the product with `npm run dev`. The UI is http://localhost:5173 and the API is http://localhost:3001. Vite proxies `/api`.
- Do not use `npx serve .` for the current app — that only served the old single-file prototype.
- SQLite is created at `data/reviewboost.db` on first API start. That directory is gitignored. Tests use a temp file via `REVIEWBOOST_DB` / `createApp(path)`.
- Default owner PIN is `1234`. Seeded directory businesses include **Element Longevity**.
- Standard commands are in `package.json` / `README.md`: `npm run lint`, `npm test`, `npm run build`.
- Node’s `node:sqlite` module is experimental on Node 22; the API logs a warning and still works.
- Marketing, setup, display, and SaaS admin UI come from `src/legacy/OriginalUI.jsx` (the recovered Cloudflare prototype). Do not restyle those screens to the thinner `src/styles.css` look.
- The original display is live: it polls `/api/businesses/:slug`, QR codes go to `/r/:slug`, and PIN/plan/theme/location changes persist through the API. Do not reintroduce the fake 8-second review incrementer.
- Production is a single Express process: `npm run build && npm start`. That is what Railway runs via `Dockerfile`.
- On Railway, attach a volume at `/data`. The server writes SQLite to `$RAILWAY_VOLUME_MOUNT_PATH/reviewboost.db`. Do not mount a volume over `/app`.
- Cloudflare Pages cannot run this app. Do not treat `reviewboost.pages.dev` as the live product.
