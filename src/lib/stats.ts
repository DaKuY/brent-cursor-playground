/** Simple helpers for the stats bar — extend me with Tab or Agent. */
export function completionPercent(done: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

export function formatProgress(done: number, total: number): string {
  return `${done} / ${total} complete (${completionPercent(done, total)}%)`;
}
