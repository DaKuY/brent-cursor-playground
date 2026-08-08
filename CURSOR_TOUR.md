# Cursor first-session tour

Work through these in order. Use the in-app checklist to track progress.

---

## 1. Open the project

- Open the folder `/agent` (or your clone) in **Cursor**.
- Open the integrated terminal: **View → Terminal** (or `` Ctrl+` ``).
- Run `npm install` then `npm run dev`.
- Open the app in your browser.

**Goal:** Confirm you can run code and see changes after edits.

---

## 2. Chat about the codebase

- Open **Chat** (`Cmd+L` / `Ctrl+L`).
- Ask: *“Give me a 5-bullet overview of this project’s file structure.”*
- Follow up: *“Where is task state updated when I check a box?”*

**Goal:** Chat reads your workspace; you don’t need to paste entire files.

---

## 3. Use @ for precise context

- In Chat, type `@` and pick **`App.tsx`** (or `src/App.tsx`).
- Ask: *“How would I add a new initial task without duplicating IDs?”*

**Goal:** `@` keeps answers tied to the files you care about.

---

## 4. Inline edit (small change)

- Open `src/App.tsx`.
- Select the `<h1>` text *“Learn Cursor by building”*.
- **Inline edit** (`Cmd+K` / `Ctrl+K`): *“Change this to a shorter, friendlier headline.”*
- Accept the diff and save.

**Goal:** Fast, local edits without leaving the file.

---

## 5. Agent (multi-file change)

Switch to **Agent** (same panel, Agent mode) and try one of:

- *“Add a footer link that opens CURSOR_TOUR.md in the editor—just a comment in README if needed.”*
- *“Add a ‘Clear completed’ button next to the filters that removes done tasks.”*
- *“Persist tasks in localStorage and reload on refresh.”*

**Goal:** Agent can edit multiple files and run `npm run build` to verify.

---

## 6. Tab completion

- Open `src/lib/stats.ts`.
- In `StatsBar.tsx`, start typing a new function call you imagine (e.g. `completionPercent(`).
- Watch for gray suggestions; press **Tab** to accept when it matches your intent.

**Goal:** Tab is for *your* next keystrokes, informed by the project.

---

## 7. Fix something on purpose

- In `TaskList.tsx`, temporarily break a type (e.g. use a wrong prop name).
- Run `npm run build` and paste the error into Chat: *“Fix this build error.”*

**Goal:** Cursor + terminal output is a common daily loop.

---

## Keyboard cheat sheet (defaults)

| Action | macOS | Windows / Linux |
|--------|--------|------------------|
| Chat | Cmd+L | Ctrl+L |
| Inline edit | Cmd+K | Ctrl+K |
| Command palette | Cmd+Shift+P | Ctrl+Shift+P |
| Terminal | Ctrl+` | Ctrl+` |

(Keybindings can differ if you’ve customized them.)

---

## When you’re done

You’ve touched the main Cursor loops: **ask**, **target context**, **edit in place**, **delegate to Agent**, and **iterate with the terminal**. From here, open any personal project—or keep extending this playground.
