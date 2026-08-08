import { TUTORIAL_STEPS } from "../data/tutorialSteps";
import type { TutorialStep } from "../types";

type Props = {
  step: TutorialStep;
  currentStep: number;
  total: number;
  complete: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function StepSlideshow({
  step,
  currentStep,
  total,
  complete,
  onPrev,
  onNext,
}: Props) {
  const index = TUTORIAL_STEPS.findIndex((s) => s.id === step.id);

  return (
    <section className="slideshow" aria-roledescription="carousel" aria-label="Tutorial steps">
      <div className="slide-dots" role="tablist">
        {TUTORIAL_STEPS.map((s) => (
          <span
            key={s.id}
            role="tab"
            aria-selected={s.id === currentStep}
            className={
              complete || s.id < currentStep
                ? "dot done"
                : s.id === currentStep
                  ? "dot active"
                  : "dot"
            }
          />
        ))}
      </div>

      <article className="slide-card" aria-live="polite">
        <p className="slide-meta">
          Step {currentStep} / {total} · {complete ? "Complete" : step.title}
        </p>
        <h2>{step.headline}</h2>
        <p className="slide-lesson">{step.lesson}</p>
        <p className="slide-try">
          <span className="mc-pixel">Quest:</span> {step.tryIt.replace(/\*\*/g, "")}
        </p>
      </article>

      <div className="slide-nav">
        <button
          type="button"
          className="slide-btn"
          onClick={onPrev}
          disabled={index <= 0}
          aria-label="Previous slide"
        >
          ←
        </button>
        <span className="slide-counter">
          {index + 1}/{total}
        </span>
        <button
          type="button"
          className="slide-btn"
          onClick={onNext}
          disabled={index >= total - 1 && !complete}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </section>
  );
}
