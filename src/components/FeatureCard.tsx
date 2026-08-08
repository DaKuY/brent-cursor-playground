import { useState } from "react";
import type { Exercise } from "../types";

type Props = {
  exercise: Exercise;
};

export function FeatureCard({ exercise }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(exercise.promptHint);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <article className="feature-card">
      <h3>{exercise.title}</h3>
      <p>{exercise.description}</p>
      {exercise.fileHint ? (
        <p className="file-hint">
          Start in <code>{exercise.fileHint}</code>
        </p>
      ) : null}
      <button type="button" className="copy-btn" onClick={copyPrompt}>
        {copied ? "Copied!" : "Copy sample prompt"}
      </button>
    </article>
  );
}
