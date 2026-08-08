import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChatPanel } from "./components/ChatPanel";
import { LandingScreen } from "./components/LandingScreen";
import { SceneBackdrop } from "./components/SceneBackdrop";
import { StepSlideshow } from "./components/StepSlideshow";
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

const SESSION_STARTED = "brent-playground-session-started";

export default function App() {
  const { currentStep, tutorialComplete, totalSteps, advance, reset } =
    useTutorialProgress();
  const [phase, setPhase] = useState<"landing" | "tutorial">(() =>
    sessionStorage.getItem(SESSION_STARTED) ? "tutorial" : "landing",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [scrollChat, setScrollChat] = useState(false);
  const [slideStep, setSlideStep] = useState(currentStep);
  const lastIntroStep = useRef(0);

  const stepData = useMemo(
    () => TUTORIAL_STEPS.find((s) => s.id === currentStep) ?? TUTORIAL_STEPS[0],
    [currentStep],
  );

  const slideData = useMemo(
    () => TUTORIAL_STEPS.find((s) => s.id === slideStep) ?? stepData,
    [slideStep, stepData],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase, currentStep]);

  useEffect(() => {
    if (phase !== "tutorial" || messages.length > 0) return;
    if (!sessionStorage.getItem(SESSION_STARTED)) return;
    const welcome = getWelcomeMessages().map((c) => createMessage("assistant", c));
    const intro = getStepIntro(currentStep).map((c) => createMessage("assistant", c));
    setMessages([...welcome, ...intro]);
    lastIntroStep.current = currentStep;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rehydrate once after refresh
  }, []);

  useEffect(() => {
    setSlideStep(currentStep);
  }, [currentStep]);

  const pushAssistant = useCallback((lines: string[]) => {
    setMessages((prev) => [
      ...prev,
      ...lines.map((c) => createMessage("assistant", c)),
    ]);
  }, []);

  const beginTutorial = useCallback(() => {
    sessionStorage.setItem(SESSION_STARTED, "1");
    setPhase("tutorial");
    const welcome = getWelcomeMessages().map((c) => createMessage("assistant", c));
    const intro = getStepIntro(1).map((c) => createMessage("assistant", c));
    setMessages([...welcome, ...intro]);
    lastIntroStep.current = 1;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (phase !== "tutorial" || tutorialComplete) return;
    if (lastIntroStep.current === currentStep) return;
    lastIntroStep.current = currentStep;
    pushAssistant(getStepIntro(currentStep));
  }, [currentStep, tutorialComplete, phase, pushAssistant]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || busy) return;

    setScrollChat(true);
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

  const handleReset = () => {
    reset();
    sessionStorage.removeItem(SESSION_STARTED);
    setMessages([]);
    setScrollChat(false);
    setPhase("landing");
    window.scrollTo(0, 0);
  };

  const handleSlidePrev = () => {
    setSlideStep((s) => Math.max(1, s - 1));
  };

  const handleSlideNext = () => {
    setSlideStep((s) => Math.min(totalSteps, s + 1));
  };

  return (
    <div className="app-shell">
      <SceneBackdrop />

      {phase === "landing" ? (
        <LandingScreen onStart={beginTutorial} />
      ) : (
        <div className="tutorial-mobile">
          <header className="top-bar">
            <p className="top-title mc-pixel">Tremor × Cursor</p>
            <p className="top-sub">
              {tutorialComplete
                ? "World saved. Try Cursor IRL."
                : `Drone cam on step ${currentStep}`}
            </p>
          </header>

          <StepSlideshow
            step={slideData}
            currentStep={currentStep}
            total={totalSteps}
            complete={tutorialComplete}
            onPrev={handleSlidePrev}
            onNext={handleSlideNext}
          />

          <div className="chat-stage">
            <ChatPanel
              messages={messages}
              input={input}
              onInputChange={setInput}
              onSend={handleSend}
              disabled={busy}
              scrollOnNewMessages={scrollChat}
              placeholder={
                tutorialComplete
                  ? "/help · or restart below"
                  : "start · /help · @App.tsx · /agent …"
              }
            />
          </div>

          <footer className="bottom-bar">
            {tutorialComplete ? (
              <>
                <a className="cta-link" href="https://cursor.com" target="_blank" rel="noreferrer">
                  Get Cursor
                </a>
                <button type="button" className="reset-btn" onClick={handleReset}>
                  Respawn tutorial
                </button>
              </>
            ) : (
              <p className="bottom-hint">
                Ooni preheated · chat completes each step · no pickaxe required
              </p>
            )}
          </footer>
        </div>
      )}
    </div>
  );
}
