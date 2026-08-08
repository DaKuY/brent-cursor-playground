# Cursor Playground

A small **React + TypeScript + Vite** app meant for learning Cursor—not a production template, but a real codebase you can break and fix with AI.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## What’s in the repo

| Path | Purpose |
|------|---------|
| `src/App.tsx` | Main layout and task state |
| `src/components/` | UI pieces to refactor or extend |
| `src/data/exercises.ts` | Copy-paste prompt ideas for Chat/Agent |
| `src/lib/stats.ts` | Small utility—good for Tab completion practice |
| `CURSOR_TOUR.md` | Step-by-step first session |

## Suggested first hour

1. Read **CURSOR_TOUR.md** and work through exercises 1–4.
2. Check off tasks in the app as you complete each exercise.
3. Pick one **stretch goal** from the tour and use **Agent** to implement it.

## Scripts

- `npm run dev` — development server with hot reload
- `npm run build` — production build + TypeScript check
- `npm run preview` — serve the production build locally

## Stretch ideas (ask Agent)

- Persist tasks in `localStorage`
- Add keyboard shortcuts (e.g. mark all done)
- Light/dark theme toggle
- Unit tests for `src/lib/stats.ts`

Have fun—this project is yours to change.
