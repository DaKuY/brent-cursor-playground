import { formatProgress } from "../lib/stats";

type Props = {
  done: number;
  total: number;
};

export function StatsBar({ done, total }: Props) {
  const pct = total === 0 ? 0 : (done / total) * 100;

  return (
    <div className="stats-bar" role="status" aria-live="polite">
      <div className="stats-label">{formatProgress(done, total)}</div>
      <div className="progress-track" aria-hidden>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
