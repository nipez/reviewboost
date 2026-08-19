# ReviewBoost

Turn happy customers into 5-star reviews. ReviewBoost helps local businesses grow their Google reviews with smart QR displays and AI-powered review management.

This is a full application: a React + TypeScript web app, an Express API, and a local SQLite database. The original single-file HTML prototype is kept in `prototype/index.html`.

## Stack

- **Web:** Vite, React 18, TypeScript, React Router
- **API:** Express on port 3001
- **Data:** SQLite via Node’s built-in `node:sqlite`
- **AI replies:** server-side draft generator (rule-based today, swap-in ready for an LLM)

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

| Command | What it does |
| --- | --- |
| `npm run dev` | API + Vite dev server together |
| `npm run lint` | ESLint |
| `npm test` | Vitest (API + unit tests) |
| `npm run build` | Typecheck and production client build |
| `npm start` | Serve the API and the built frontend (after `npm run build`) |

The API listens on `http://localhost:3001`. Vite proxies `/api` during development.

## Deploy on Railway

This app is one process: Express serves `/api` and the Vite `dist/` frontend. SQLite needs a persistent volume.

1. Create a Railway project from this GitHub repo (`nipez/reviewboost`).
2. Railway uses `Dockerfile` + `railway.toml`. It should detect `PORT` automatically.
3. Add a volume and mount it at `/data` (not `/app`). The app writes `reviewboost.db` to `RAILWAY_VOLUME_MOUNT_PATH`.
4. Optional service variable: `REVIEWBOOST_DB=/data/reviewboost.db`.
5. Generate a public domain on the service. The health check is `GET /api/health`.

```bash
npm run build
PORT=3000 npm start
```

Cloudflare Pages is the wrong host for this stack (no Node server, no SQLite). Leave Pages disconnected or pointed at the old prototype only.

## Product flows

- `/` — marketing landing page
- `/setup` — 4-step wizard; creates a real business in SQLite
- `/display/:slug` — customer-facing review board + QR
- `/r/:slug` — review gate (happy path can go to Google; Pro routes low stars to private feedback)
- `/admin/:slug` — owner console (PIN `1234`)
- `/saas` — platform admin (customers, MRR, ads, activity)

Type `admin` anywhere outside an input to jump to the platform console.

## Layout

```
src/           React app
server/        Express API + SQLite
prototype/     original HTML prototype
data/          local SQLite file (created on first run)
```
