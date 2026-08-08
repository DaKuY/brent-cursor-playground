import type { Exercise } from "../types";

export const CURSOR_EXERCISES: Exercise[] = [
  {
    id: "chat",
    title: "Chat (Ctrl+L / Cmd+L)",
    description:
      "Ask questions about this repo. Try: “What does TaskList do?” or “Where is state stored?”",
    promptHint: "Explain how task completion toggling works in this app.",
    fileHint: "src/components/TaskList.tsx",
  },
  {
    id: "inline",
    title: "Inline edit (Ctrl+K / Cmd+K)",
    description:
      "Select code in a file and describe a change in plain English. Great for renames and small refactors.",
    promptHint: "Rename the eyebrow text to “My first Cursor project”.",
    fileHint: "src/App.tsx",
  },
  {
    id: "at",
    title: "@ context",
    description:
      "In Chat or Agent, type @ to attach files, folders, docs, or terminal output so answers stay grounded.",
    promptHint: "@src/types.ts Add a priority field to Task and wire it through the UI.",
  },
  {
    id: "agent",
    title: "Agent mode",
    description:
      "Give a multi-step goal. Agent can run commands, edit several files, and verify with the terminal.",
    promptHint:
      "Add a “Clear completed” button that removes done tasks and show a confirmation toast.",
  },
  {
    id: "tab",
    title: "Tab completion",
    description:
      "While typing code, accept gray ghost suggestions with Tab—Cursor predicts the next edit from context.",
    promptHint: "In stats.ts, add a function computeStreak and use it in StatsBar.",
    fileHint: "src/lib/stats.ts",
  },
  {
    id: "terminal",
    title: "Terminal + Agent",
    description:
      "Open the integrated terminal. Ask Agent to run tests or fix build errors using command output.",
    promptHint: "Run npm run build and fix any TypeScript errors.",
  },
];
