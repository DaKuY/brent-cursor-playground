import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEY, TUTORIAL_STEPS } from "../data/tutorialSteps";
import type { ChatMessage } from "../types";

function loadStep(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 1;
    const parsed = JSON.parse(raw) as { step: number; completed?: boolean };
    if (parsed.completed) return 11;
    return Math.min(Math.max(parsed.step, 1), 10);
  } catch {
    return 1;
  }
}

function saveProgress(step: number, completed: boolean) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, completed }));
}

export function useTutorialProgress() {
  const [currentStep, setCurrentStep] = useState(loadStep);
  const [tutorialComplete, setTutorialComplete] = useState(() => loadStep() > 10);

  useEffect(() => {
    if (tutorialComplete) saveProgress(10, true);
    else saveProgress(currentStep, false);
  }, [currentStep, tutorialComplete]);

  const advance = useCallback(() => {
    setCurrentStep((s) => {
      if (s >= 10) {
        setTutorialComplete(true);
        return 11;
      }
      return s + 1;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(1);
    setTutorialComplete(false);
  }, []);

  return {
    currentStep: Math.min(currentStep, 10),
    tutorialComplete,
    totalSteps: TUTORIAL_STEPS.length,
    advance,
    reset,
    setTutorialComplete,
  };
}

let msgCounter = 0;
export function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  msgCounter += 1;
  return { id: `m-${msgCounter}`, role, content, timestamp: Date.now() };
}
