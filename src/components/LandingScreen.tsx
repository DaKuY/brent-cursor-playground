type Props = {
  onStart: () => void;
};

export function LandingScreen({ onStart }: Props) {
  return (
    <section className="landing">
      <div className="landing-card">
        <p className="landing-eyebrow mc-pixel">3 steps · tap to play</p>
        <h1>Brent&apos;s Cursor Playground</h1>
        <p className="landing-lead">
          Learn what <strong>Cursor</strong> is in 3 easy taps — like a mini game with trucks,
          pizza, drones, and Minecraft.
        </p>
        <button type="button" className="landing-cta" onClick={onStart}>
          Start
        </button>
        <p className="landing-note">No typing needed — just pick bubbles!</p>
      </div>
    </section>
  );
}
