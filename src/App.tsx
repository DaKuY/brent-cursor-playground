import { useCallback, useEffect, useMemo, useState } from "react";
import { AdventureResult } from "./components/AdventureResult";
import { ChoiceBubbles } from "./components/ChoiceBubbles";
import { LandingScreen } from "./components/LandingScreen";
import { SceneBackdrop } from "./components/SceneBackdrop";
import { StepGraphic } from "./components/StepGraphic";
import { TUTORIAL_STEPS } from "./data/tutorialSteps";
import { useTutorialProgress } from "./hooks/useTutorialProgress";
import { EMPTY_CHOICES, type ChoiceOption, type PlayerChoices } from "./types";

type Phase = "landing" | "tutorial" | "result";

export default function App() {
  const { currentStep, totalSteps, advance, reset, finish } = useTutorialProgress();
  const [phase, setPhase] = useState<Phase>("landing");
  const [choices, setChoices] = useState<PlayerChoices>({ ...EMPTY_CHOICES });
  const [reply, setReply] = useState<string | null>(null);
  const [step3Draft, setStep3Draft] = useState<Partial<PlayerChoices>>({});

  const step = useMemo(
    () => TUTORIAL_STEPS.find((s) => s.id === currentStep) ?? TUTORIAL_STEPS[0],
    [currentStep],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setReply(null);
    if (currentStep === 3) setStep3Draft({});
  }, [currentStep]);

  const beginTutorial = () => {
    setPhase("tutorial");
    setChoices({ ...EMPTY_CHOICES });
    setStep3Draft({});
    setReply(null);
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    reset();
    setChoices({ ...EMPTY_CHOICES });
    setStep3Draft({});
    setReply(null);
    setPhase("landing");
    window.scrollTo(0, 0);
  };

  const goNext = useCallback(
    (nextChoices: PlayerChoices) => {
      setReply(null);
      if (currentStep >= 3) {
        setChoices(nextChoices);
        finish();
        setPhase("result");
        return;
      }
      advance();
    },
    [advance, currentStep, finish],
  );

  const pickStep1or2 = (opt: ChoiceOption) => {
    const key = currentStep === 1 ? "whatIsCursor" : "superpower";
    const next = { ...choices, [key]: opt.id };
    setChoices(next);
    setReply(opt.kidReply);
    window.setTimeout(() => goNext(next), 700);
  };

  const pickStep3 = (key: keyof PlayerChoices, opt: ChoiceOption) => {
    const draft = { ...step3Draft, [key]: opt.id };
    setStep3Draft(draft);
    setReply(opt.kidReply);

    const complete =
      draft.pizza && draft.drone && draft.minecraft;
    if (complete) {
      const next = {
        ...choices,
        pizza: draft.pizza!,
        drone: draft.drone!,
        minecraft: draft.minecraft!,
      };
      setChoices(next);
      window.setTimeout(() => goNext(next), 800);
    }
  };

  const step3Ready =
    Boolean(step3Draft.pizza) &&
    Boolean(step3Draft.drone) &&
    Boolean(step3Draft.minecraft);

  return (
    <div className="app-shell">
      <SceneBackdrop />

      {phase === "landing" && <LandingScreen onStart={beginTutorial} />}

      {phase === "tutorial" && (
        <div className="tutorial-mobile tutorial-simple">
          <header className="top-bar">
            <p className="top-title mc-pixel">Step {currentStep} / {totalSteps}</p>
          </header>

          <StepGraphic kind={step.graphic} />

          <article className="kid-card">
            <h2>{step.title}</h2>
            <p className="kid-line">{step.kidLine}</p>
            <p className="feature-line">{step.cursorFeature}</p>
          </article>

          {step.id < 3 && (
            <ChoiceBubbles
              options={step.choices}
              selectedId={
                currentStep === 1 ? choices.whatIsCursor : choices.superpower
              }
              onSelect={pickStep1or2}
            />
          )}

          {step.id === 3 &&
            step.choiceGroups?.map((group) => (
              <div key={group.key} className="choice-group">
                <p className="choice-group-label">{group.prompt}</p>
                <ChoiceBubbles
                  options={group.options}
                  selectedId={step3Draft[group.key] as string | undefined}
                  onSelect={(opt) => pickStep3(group.key, opt)}
                />
              </div>
            ))}

          {step.id === 3 && !step3Ready && (
            <p className="pick-hint">Pick one bubble in each row to launch!</p>
          )}

          {reply && <p className="kid-reply">{reply}</p>}
        </div>
      )}

      {phase === "result" && (
        <div className="tutorial-mobile">
          <AdventureResult choices={choices} onRestart={handleRestart} />
        </div>
      )}
    </div>
  );
}
