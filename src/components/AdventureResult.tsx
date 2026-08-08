import {
  buildMissionStory,
  buildMissionTitle,
  superpowerBadge,
} from "../lib/buildMission";
import type { PlayerChoices } from "../types";

type Props = {
  choices: PlayerChoices;
  onRestart: () => void;
};

export function AdventureResult({ choices, onRestart }: Props) {
  const badge = superpowerBadge(choices);
  const story = buildMissionStory(choices);
  const title = buildMissionTitle(choices);

  return (
    <section className="adventure-result">
      <p className="mc-pixel result-eyebrow">Mission complete · world saved</p>
      <h2>{title}</h2>
      <div className="result-scene" aria-hidden>
        <svg viewBox="0 0 300 180" className="result-svg">
          <rect width="300" height="180" rx="12" fill="#060d18" />
          <text x="150" y="22" textAnchor="middle" fill="#4a9eff" fontSize="10">
            {badge.emoji} {badge.name}
          </text>
          <path
            d="M30 130h160l14-32h36l18 32h62v20H30z"
            fill="#0a1628"
            stroke="#2d6cb5"
            strokeWidth="2"
          />
          <circle cx="70" cy="150" r="12" fill="#111" stroke="#2d6cb5" strokeWidth="2" />
          <circle cx="170" cy="150" r="12" fill="#111" stroke="#2d6cb5" strokeWidth="2" />
          <ellipse cx="230" cy="108" rx="24" ry="16" fill="#555" />
          <text x="230" y="112" textAnchor="middle" fontSize="18">
            {choices.pizza === "veggie" ? "🥬" : choices.pizza === "cheese" ? "🧀" : "🍕"}
          </text>
          <text x="60" y="95" fontSize="20">
            {choices.drone === "film" ? "🎥" : choices.drone === "race" ? "🏁" : "🛸"}
          </text>
          <text x="250" y="145" fontSize="22">
            {choices.minecraft === "castle"
              ? "🏰"
              : choices.minecraft === "creeper"
                ? "🟩"
                : "💎"}
          </text>
          <rect x="12" y="140" width="12" height="12" fill="#5b8a2a" />
          <rect x="12" y="152" width="12" height="12" fill="#6b4423" />
        </svg>
      </div>
      <p className="result-story">{story}</p>
      <p className="result-cursor-tip">
        Want to try for real? Ask a grown-up to install{" "}
        <a href="https://cursor.com" target="_blank" rel="noreferrer">
          Cursor
        </a>{" "}
        and give Agent a tiny job on a real project.
      </p>
      <button type="button" className="landing-cta" onClick={onRestart}>
        Play again
      </button>
    </section>
  );
}
