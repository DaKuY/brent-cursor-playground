import { TUTORIAL_STEPS } from "../data/tutorialSteps";
import type { AssistantReply, TutorialStep } from "../types";

function normalize(input: string): string {
  return input.trim().toLowerCase();
}

function stepById(id: number): TutorialStep {
  return TUTORIAL_STEPS.find((s) => s.id === id) ?? TUTORIAL_STEPS[0];
}

function matchesAny(text: string, hints: string[]): boolean {
  return hints.some((h) => {
    if (h.startsWith("/")) return text.startsWith(h) || text.includes(h);
    return text.includes(h);
  });
}

function validateStep(stepId: number, raw: string): boolean {
  const text = normalize(raw);
  if (!text) return false;

  switch (stepId) {
    case 1:
      return matchesAny(text, ["start", "hello", "hi", "begin", "let's go", "lets go"]);
    case 2:
      return text.startsWith("/chat") || text.includes("?");
    case 3:
      return text.includes("@");
    case 4:
      return (
        text.startsWith("/inline") ||
        text.includes("inline edit") ||
        text.includes("cmd+k") ||
        text.includes("ctrl+k")
      );
    case 5:
      return text.startsWith("/agent") || text.startsWith("/agent ");
    case 6:
      return text.startsWith("/tab") || text.includes("tab completion") || text.includes("tab complete");
    case 7:
      return (
        text.startsWith("/terminal") ||
        text.includes("npm run") ||
        text.includes("npm test") ||
        text.includes("run build")
      );
    case 8:
      return (
        text.startsWith("/rules") ||
        text.includes(".cursorrules") ||
        text.includes("project rules") ||
        text.includes("cursor rules")
      );
    case 9:
      return (
        text.startsWith("/why") ||
        text.includes("why cursor") ||
        text.includes("why should i use")
      );
    case 10:
      return (
        text.startsWith("/finish") ||
        text.includes("ready to try cursor") ||
        text.includes("i am ready")
      );
    default:
      return false;
  }
}

function helpText(step: TutorialStep): string {
  return [
    "**Commands you can try in this demo** (mirrors desktop Cursor ideas):",
    "- `/chat <question>` — practice Chat",
    "- `@App.tsx` in a message — practice @ context",
    "- `/inline` — inline edit (Cmd/Ctrl+K)",
    "- `/agent <task>` — multi-step Agent",
    "- `/tab` — Tab completion",
    "- `/terminal <command>` — terminal + AI loop",
    "- `/rules` — project rules",
    "- `/why` — why use Cursor",
    "- `/step` — recap current step",
    "- `/help` — this list",
    "",
    `**Current step:** ${step.id}/10 — ${step.title}`,
    `**Your task:** ${step.tryIt.replace(/\*\*/g, "")}`,
  ].join("\n");
}

function handleSlashCommand(
  raw: string,
  step: TutorialStep,
  stepCompleted: boolean,
): string[] | null {
  const text = normalize(raw);
  if (text === "/help") return [helpText(step)];
  if (text === "/step") {
    return [
      `**Step ${step.id}: ${step.title}** — ${step.headline}`,
      step.lesson,
      "",
      step.tryIt,
      stepCompleted
        ? "✅ Task complete — send **`/next`** or your next message to continue."
        : "⏳ Complete the task above to unlock the next step.",
    ];
  }
  if (text === "/next") {
    if (!stepCompleted) {
      return ["Finish this step's task first. Send **`/step`** for a hint."];
    }
    return ["ADVANCE_STEP"];
  }

  if (text.startsWith("/chat")) {
    const q = raw.replace(/^\/chat\s*/i, "").trim() || "What does this app do?";
    return [
      `**Chat simulation** (on desktop, Cmd/Ctrl+L):`,
      `You asked: “${q}”`,
      "",
      "This playground is a React + Vite demo that teaches Cursor. State lives in React hooks; the tutorial progress is saved in your browser's localStorage. On a real project, Chat would read your attached @ files and answer from source.",
      stepCompleted ? "" : "_Tip: questions with **?** also complete this step._",
    ].filter(Boolean);
  }

  if (text.startsWith("/agent")) {
    const task = raw.replace(/^\/agent\s*/i, "").trim() || "Add a feature";
    return [
      `**Agent simulation** (desktop Agent mode):`,
      `Goal: “${task}”`,
      "",
      "Agent would typically: (1) search the repo, (2) edit multiple files, (3) run `npm run build`, (4) fix errors, (5) summarize diffs for you to accept.",
      "",
      "Example plan for confetti: add a lightweight canvas or CSS animation component, trigger on tutorial completion in `App.tsx`, guard with `prefers-reduced-motion`.",
    ];
  }

  if (text.startsWith("/inline")) {
    return [
      "**Inline edit simulation** (select code → Cmd/Ctrl+K):",
      "You'd select the `<h1>` in `App.tsx` and say: “Make this shorter and add an emoji.”",
      "Cursor proposes a diff inline—you accept or tweak without opening Chat.",
    ];
  }

  if (text.startsWith("/tab")) {
    return [
      "**Tab completion simulation:**",
      "In `src/lib/stats.ts`, start typing `export function streak`—Tab might finish the function signature and body from how similar helpers are written in your repo.",
      "Use Tab for speed; use Chat when you need explanation across files.",
    ];
  }

  if (text.startsWith("/terminal")) {
    const cmd = raw.replace(/^\/terminal\s*/i, "").trim() || "npm run build";
    return [
      `**Terminal simulation:** \`${cmd}\``,
      "",
      "```",
      "> cursor-playground@1.0.0 build",
      "> tsc -b && vite build",
      "✓ built in 548ms",
      "```",
      "",
      "On desktop, Agent pastes failing output back into context and patches TypeScript errors automatically.",
    ];
  }

  if (text.startsWith("/rules")) {
    return [
      "**Rules simulation:**",
      "You might add `.cursor/rules/react.mdc`: “Use functional components, prefer named exports, run eslint before finishing.”",
      "Every Chat/Agent session inherits those constraints—less bikeshedding, more shipping.",
    ];
  }

  if (text.startsWith("/why")) {
    return [
      "**Why Cursor?**",
      "- **Context:** @ files + codebase index, not a blank chat window.",
      "- **Action:** inline edits and Agent apply changes, not just advice.",
      "- **Familiar:** VS Code extensions and keybindings still work.",
      "- **Speed:** Tab for micro-edits; Agent for features; Chat for understanding.",
      "",
      "Tell me one project you'd try first on desktop—that completes this step when combined with `/why`.",
    ];
  }

  if (text.startsWith("/finish")) {
    return [
      "**Congratulations!** You're ready to install Cursor and open your own repository.",
      "Visit [cursor.com](https://cursor.com) and give Agent one small, real task today—a bug, a button, a test.",
    ];
  }

  return null;
}

function genericAssistantReply(raw: string, step: TutorialStep): string[] {
  const text = normalize(raw);
  if (text.includes("cursor") && text.includes("free")) {
    return [
      "Cursor offers plans for individuals and teams; check [cursor.com/pricing](https://cursor.com/pricing) for current details.",
      "This demo runs entirely in your browser—no API key required.",
    ];
  }
  if (text.includes("iphone") || text.includes("mobile")) {
    return [
      "The Cursor mobile app is great for Agent and code review on the go.",
      "For the full editor (Tab, inline edit, integrated terminal), desktop is still the primary experience—this web tutorial bridges both.",
    ];
  }
  return [
    "I'm your **tutorial assistant** (simulated for this public demo—no data leaves your browser).",
    `Focus on **Step ${step.id}**: ${step.tryIt}`,
    "Send **`/help`** for commands or **`/step`** for the full lesson.",
  ];
}

export function getWelcomeMessages(): string[] {
  return [
    "Welcome to **Brent's Cursor Playground** — a 10-step tour for anyone new to Cursor.",
    "Complete each step in order to learn Chat, @ context, Agent, and more. Type **`start`** when you're ready.",
  ];
}

export function processMessage(
  raw: string,
  currentStepId: number,
): AssistantReply & { advance?: boolean } {
  const step = stepById(currentStepId);
  const trimmed = raw.trim();

  if (!trimmed) {
    return { messages: ["Type a message or try `/help`."], stepCompleted: false };
  }

  const slash = handleSlashCommand(trimmed, step, validateStep(currentStepId, trimmed));
  let messages: string[];
  if (slash) {
    if (slash.length === 1 && slash[0] === "ADVANCE_STEP") {
      return { messages: [], stepCompleted: true, advance: true };
    }
    messages = slash;
  } else if (trimmed.includes("@")) {
    const ref = trimmed.match(/@[\w./-]+/)?.[0] ?? "@file";
    messages = [
      `**@ context simulation:** you referenced \`${ref}\`.`,
      "In desktop Cursor, that file is attached to the model's context window so answers cite real lines of code.",
      ref.includes("App")
        ? "`App.tsx` is the main layout—you're looking at the right place for UI changes."
        : "Try `@App.tsx` if you want to ask about the main screen structure.",
    ];
  } else {
    messages = genericAssistantReply(trimmed, step);
  }

  const stepCompleted = validateStep(currentStepId, trimmed);
  let hint: string | undefined;
  if (!stepCompleted) {
    hint = `Hint: ${step.commandHints.map((c) => `\`${c}\``).join(" or ")}`;
  } else {
    messages.push(
      "",
      `✅ **Step ${step.id} complete!** ${currentStepId < 10 ? "Moving to the next step…" : "Tutorial finished—you unlocked the summary view."}`,
    );
  }

  return { messages, stepCompleted, hint };
}

export function getStepIntro(stepId: number): string[] {
  const step = stepById(stepId);
  return [
    `--- **Step ${step.id} of 10: ${step.title}** ---`,
    `**${step.headline}**`,
    step.lesson,
    "",
    "**Try it now:** " + step.tryIt,
    "",
    "_Why it matters:_ " + step.cursorWhy,
  ];
}
