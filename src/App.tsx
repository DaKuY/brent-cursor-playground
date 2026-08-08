import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatPanel } from "./components/ChatPanel";
import { TutorialProgress } from "./components/TutorialProgress";
import { TUTORIAL_STEPS } from "./data/tutorialSteps";
import {
  createMessage,
  useTutorialProgress,
} from "./hooks/useTutorialProgress";
import {
  getStepIntro,
  getWelcomeMessages,
  processMessage,
} from "./lib/tutorialAssistant";
import type { ChatMessage } from "./types";

export default function App() {
  const { currentStep, tutorialComplete, totalSteps, advance, reset } =
    useTutorialProgress();
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getWelcomeMessages().map((c) => createMessage("assistant", c)),
  );
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const stepData = useMemo(
    () => TUTORIAL_STEPS.find((s) => s.id === currentStep) ?? TUTORIAL_STEPS[0],
    [currentStep],
  );

  const pushAssistant = useCallback((lines: string[]) => {
    setMessages((prev) => [
      ...prev,
      ...lines.map((c) => createMessage("assistant", c)),
    ]);
  }, []);

  useEffect(() => {
    if (tutorialComplete) return;
    pushAssistant(getStepIntro(currentStep));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intro only when step index changes
  }, [currentStep, tutorialComplete]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || busy) return;

    setMessages((prev) => [...prev, createMessage("user", text)]);
    setInput("");
    setBusy(true);

    window.setTimeout(() => {
      const stepForChat = tutorialComplete ? 10 : currentStep;
      const result = processMessage(text, stepForChat);
      if (result.advance) {
        advance();
      } else {
        result.messages.forEach((block) => {
          setMessages((prev) => [...prev, createMessage("assistant", block)]);
        });
        if (result.hint) {
          setMessages((prev) => [...prev, createMessage("system", result.hint!)]);
        }
        if (result.stepCompleted && !tutorialComplete) {
          window.setTimeout(() => advance(), 600);
        }
      }
      setBusy(false);
    }, 350);
  }, [input, busy, tutorialComplete, currentStep, advance]);

  return (
    <div className="app app-tutorial">
      <header className="hero hero-compact">
        <p className="eyebrow">Interactive tutorial</p>
        <h1>Brent&apos;s Cursor Playground</h1>
        <p className="subtitle">
          {tutorialComplete
            ? "You finished all 10 steps. Explore the commands again or reset for a fresh run."
            : `Step ${currentStep} of ${totalSteps} — complete each task in the chat to unlock the next lesson.`}
        </p>
      </header>

      <div className="tutorial-layout">
        <aside className="panel panel-side">
          <TutorialProgress currentStep={currentStep} complete={tutorialComplete} />
          {!tutorialComplete && (
            <div className="step-card">
              <h2>{stepData.title}</h2>
              <p className="step-headline">{stepData.headline}</p>
              <p className="step-lesson">{stepData.lesson}</p>
              <p className="step-why">
                <strong>Why Cursor:</strong> {stepData.cursorWhy}
              </p>
            </div>
          )}
          {tutorialComplete && (
            <div className="step-card graduate">
              <h2>What to do next</h2>
              <ul>
                <li>
                  Download Cursor at{" "}
                  <a href="https://cursor.com" target="_blank" rel="noreferrer">
                    cursor.com
                  </a>
                </li>
                <li>Open a personal project and give Agent one small task</li>
                <li>Add project rules so suggestions match your style</li>
              </ul>
              <button type="button" className="reset-btn" onClick={() => {
                reset();
                setMessages(
                  getWelcomeMessages().map((c) => createMessage("assistant", c)),
                );
              }}>
                Restart tutorial
              </button>
            </div>
          )}
        </aside>

        <main className="panel panel-chat">
          <div className="chat-header">
            <h2>Cursor command lab</h2>
            <p>Type messages or slash commands — this simulates Chat &amp; Agent on desktop.</p>
          </div>
          <ChatPanel
            messages={messages}
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            disabled={busy}
            placeholder={
              tutorialComplete
                ? "Tutorial complete — try /help or restart from the sidebar"
                : "Try /help, /chat, @App.tsx, /agent …"
            }
          />
          {!tutorialComplete && (
            <p className="chat-footnote">
              Demo AI runs in your browser only. On desktop Cursor, the same prompts reach
              real models with your repo context.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
