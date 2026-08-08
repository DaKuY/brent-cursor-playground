# Share this app with anyone

## Live link (while Cloud Agent is running)

**https://brent-cursor-playground.loca.lt**

Open in any phone or browser. If LocalTunnel shows a warning page, tap **Continue** once.

This link works only while the agent session and tunnel are active. For a **permanent** link, use GitHub Pages or Netlify below.

---

## Permanent link (recommended): GitHub Pages

1. Create a new **public** repository on GitHub (for example `brent-cursor-playground`).
2. Push this project to that repo (`main` branch).
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Push again (or run the **Deploy public site** workflow manually).

Your site will be at:

`https://<your-github-username>.github.io/<repo-name>/`

Example: `https://drewe927.github.io/brent-cursor-playground/`

---

## Permanent link: Netlify

1. Sign up at [netlify.com](https://www.netlify.com).
2. **Add new site → Import an existing project** (connect GitHub), or drag the `dist` folder after `npm run build`.
3. Build command: `npm run build` · Publish directory: `dist`

Netlify gives you a stable `*.netlify.app` URL you can share.

---

## Permanent link: Vercel

1. Sign up at [vercel.com](https://vercel.com).
2. Import this repo; framework preset **Vite**.
3. Deploy — you get a stable `*.vercel.app` URL.
