import { TUTORIAL_STEPS } from "../data/tutorialSteps";

type Props = {
  currentStep: number;
  complete: boolean;
};

export function TutorialProgress({ currentStep, complete }: Props) {
  return (
    <nav className="step-rail" aria-label="Tutorial progress">
      <ol className="step-list">
        {TUTORIAL_STEPS.map((step) => {
          const done = complete || step.id < currentStep;
          const active = !complete && step.id === currentStep;
          return (
            <li
              key={step.id}
              className={
                done ? "step-item done" : active ? "step-item active" : "step-item locked"
              }
              aria-current={active ? "step" : undefined}
            >
              <span className="step-num">{done ? "✓" : step.id}</span>
              <span className="step-label">{step.title}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
