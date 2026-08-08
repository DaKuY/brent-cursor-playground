import { useCallback, useEffect, useState } from "react";
import { TUTORIAL_STEPS } from "../data/tutorialSteps";
import { STORAGE_KEY } from "../types";

export function useTutorialProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tutorialComplete, setTutorialComplete] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { step?: number; completed?: boolean };
      if (parsed.completed) setTutorialComplete(true);
      else if (parsed.step) setCurrentStep(Math.min(Math.max(parsed.step, 1), 3));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step: currentStep, completed: tutorialComplete }),
    );
  }, [currentStep, tutorialComplete]);

  const advance = useCallback(() => {
    setCurrentStep((s) => {
      if (s >= 3) {
        setTutorialComplete(true);
        return 3;
      }
      return s + 1;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(1);
    setTutorialComplete(false);
  }, []);

  const finish = useCallback(() => {
    setTutorialComplete(true);
  }, []);

  return {
    currentStep,
    tutorialComplete,
    totalSteps: TUTORIAL_STEPS.length,
    advance,
    reset,
    finish,
  };
}
