type Props = {
  onStart: () => void;
};

export function LandingScreen({ onStart }: Props) {
  return (
    <section className="landing">
      <div className="landing-card">
        <p className="landing-eyebrow mc-pixel">Level 1 · Spawn point</p>
        <h1>Brent&apos;s Cursor Playground</h1>
        <p className="landing-lead">
          Park the Tremor, preheat the Ooni, launch the drones — then learn Cursor in{" "}
          <strong>10 quick steps</strong> (like crafting, but for shipping code).
        </p>
        <ul className="landing-bullets">
          <li>🛻 Dark-blue Ford Tremor energy (mobility mode)</li>
          <li>🛸 Drone recon for your codebase</li>
          <li>🍕 Ooni-fueled focus blocks</li>
          <li>⛏️ Minecraft rules: gather context, craft commits</li>
        </ul>
        <button type="button" className="landing-cta" onClick={onStart}>
          Start tutorial
        </button>
        <p className="landing-note">Steve would press this button. So should you.</p>
      </div>
    </section>
  );
}
