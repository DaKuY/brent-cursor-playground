# Brent's Cursor Playground

A mobile-friendly **React + Vite** demo that teaches **Cursor** in **3 tap-through steps** (built for kids ~10+, fun Tremor / Ooni / Minecraft theme). Choices at the end build a custom “mission” story.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## What's in the repo

| Path | Purpose |
|------|---------|
| `src/App.tsx` | Landing → 3 steps → result flow |
| `src/data/tutorialSteps.ts` | Step copy and bubble choices |
| `src/lib/buildMission.ts` | End card from player choices |
| `src/components/` | Graphics, bubbles, backdrop |
| `PUBLIC_LINK.md` | Share via tunnel, GitHub Pages, Netlify, Vercel |
| `.github/workflows/deploy-pages.yml` | Auto-deploy to GitHub Pages |

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview `dist/`
- `./scripts/publish-github.sh` — create/push to GitHub (needs `gh auth` or `GH_TOKEN`)

## Publish to GitHub

```bash
chmod +x scripts/publish-github.sh
./scripts/publish-github.sh brent-cursor-playground
```

Then enable **Settings → Pages → GitHub Actions** for a public site at  
`https://<username>.github.io/brent-cursor-playground/`.

## License

Use and modify freely for learning and demos.
