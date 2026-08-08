import type { TutorialStep } from "../types";

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome",
    headline: "What Cursor is",
    lesson:
      "Cursor is an AI-native code editor built on VS Code. You keep the same editing experience, but Chat, inline edits, and Agent understand your whole project—not just the file on screen.",
    tryIt: 'Type **start** (or say hello) in the chat below to begin the walkthrough.',
    cursorWhy:
      "Teams use Cursor to ship faster because answers and edits stay grounded in real repo context instead of copy-pasting into a separate chatbot.",
    commandHints: ["start", "hello"],
  },
  {
    id: 2,
    title: "Chat",
    headline: "Ask questions about your code",
    lesson:
      "Chat (Cmd+L / Ctrl+L) is for exploration: architecture, bugs, refactors, and “where does X happen?” It reads files you attach or that live in your workspace.",
    tryIt:
      'Try **`/chat What does this playground app do?`** or ask any question with a **?** in your message.',
    cursorWhy:
      "Chat replaces tab-hopping through docs and grep—you describe intent in plain English and iterate in one thread.",
    commandHints: ["/chat", "?"],
  },
  {
    id: 3,
    title: "@ context",
    headline: "Point AI at the right files",
    lesson:
      "Type **@** in Chat or Agent to attach files, folders, docs, or terminal output. The model prioritizes that context so answers match your codebase.",
    tryIt:
      "Send a message that includes **`@App.tsx`** or **`@src/components`** (simulating what you'd type in desktop Cursor).",
    cursorWhy:
      "@ mentions cut hallucinations—you explicitly show which source of truth matters for this task.",
    commandHints: ["@"],
  },
  {
    id: 4,
    title: "Inline edit",
    headline: "Change code in place",
    lesson:
      "Select code, press **Cmd+K / Ctrl+K**, describe the change, and accept the diff. Best for renames, small refactors, and localized fixes.",
    tryIt:
      'Run **`/inline`** or type a message containing **inline edit** or **cmd+k** to practice the workflow.',
    cursorWhy:
      "Inline edit keeps you in flow—you never leave the file to fix the five lines you're staring at.",
    commandHints: ["/inline", "inline", "cmd+k", "ctrl+k"],
  },
  {
    id: 5,
    title: "Agent",
    headline: "Multi-step work on autopilot",
    lesson:
      "Agent mode plans across files: implement features, run terminal commands, fix build errors, and verify. You review diffs like a PR.",
    tryIt:
      "Try **`/agent Add a confetti animation when I finish step 10`**—we will simulate how Agent would break that down.",
    cursorWhy:
      "Agent is for tasks that touch many files—features, migrations, test fixes—not one-liner typos.",
    commandHints: ["/agent"],
  },
  {
    id: 6,
    title: "Tab",
    headline: "AI-powered autocomplete",
    lesson:
      "While typing, gray **Tab** suggestions predict your next edit using surrounding code and recent changes—like pair programming that knows your patterns.",
    tryIt:
      'Send **`/tab`** or mention **tab completion** to see when Tab beats Chat.',
    cursorWhy:
      "Tab shines for boilerplate and repetitive edits; Chat/Agent shine for reasoning and cross-file work.",
    commandHints: ["/tab", "tab completion"],
  },
  {
    id: 7,
    title: "Terminal",
    headline: "Close the loop with commands",
    lesson:
      "Cursor integrates the terminal. Agent can run **npm test**, **npm run build**, read failures, and patch code—same loop you'd do manually, faster.",
    tryIt:
      'Try **`/terminal npm run build`** or mention **npm run** / **run tests**.',
    cursorWhy:
      "Shipping is compile-test-fix; tying terminal output to Chat/Agent removes copy-paste from that cycle.",
    commandHints: ["/terminal", "npm run", "npm test"],
  },
  {
    id: 8,
    title: "Rules",
    headline: "Teach Cursor your preferences",
    lesson:
      "Project **rules** (.cursor/rules, AGENTS.md) tell the AI your stack, style, and constraints so every suggestion matches your team.",
    tryIt:
      'Send **`/rules`** or mention **.cursorrules** / **project rules**.',
    cursorWhy:
      "Rules turn generic AI into *your* AI—consistent patterns without repeating instructions every session.",
    commandHints: ["/rules", ".cursorrules", "project rules"],
  },
  {
    id: 9,
    title: "Why Cursor",
    headline: "Editor + model + context",
    lesson:
      "Generic chatbots don't see your repo. VS Code alone doesn't reason across files. Cursor combines the editor, models, and @ context so planning and execution stay in one place.",
    tryIt:
      "Send **`/why`** or ask **why should I use Cursor**—then share one thing you would build first.",
    cursorWhy:
      "You're not learning a toy demo—you're previewing how production teams work with AI in the loop.",
    commandHints: ["/why", "why cursor", "why should"],
  },
  {
    id: 10,
    title: "You're ready",
    headline: "Try it on your own project",
    lesson:
      "You've practiced the core loops: Chat, @, inline edit, Agent, Tab, terminal, and rules. The real win is opening *your* repo and shipping one small feature today.",
    tryIt:
      'Type **`/finish`** or **I am ready to try Cursor** to complete the tutorial and unlock the full playground view.',
    cursorWhy:
      "Cursor is free to try at cursor.com—start with one Agent task on code you care about.",
    commandHints: ["/finish", "ready to try cursor", "i am ready"],
  },
];

export const STORAGE_KEY = "brent-cursor-playground-tutorial-v1";
