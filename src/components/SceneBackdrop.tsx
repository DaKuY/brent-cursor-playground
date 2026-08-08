export function SceneBackdrop() {
  return (
    <div className="scene-backdrop" aria-hidden>
      <div className="sky-gradient" />
      <div className="drone drone-a">🛸</div>
      <div className="drone drone-b">🛸</div>
      <div className="drone drone-c">📡</div>

      <div className="minecraft-strip">
        <span className="mc-block grass" />
        <span className="mc-block grass" />
        <span className="mc-block dirt" />
        <span className="mc-block stone" />
        <span className="mc-creeper" title="Creeper approves of clean diffs">
          🟩
        </span>
      </div>

      <div className="pizza-zone">
        <div className="ooni-oven">
          <div className="ooni-dome" />
          <div className="ooni-mouth" />
          <div className="ooni-fire" />
        </div>
        <span className="pizza-label">Ooni night shift 🍕</span>
      </div>

      <svg
        className="tremor-truck"
        viewBox="0 0 420 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Dark blue Ford Tremor silhouette</title>
        <path
          d="M40 78h300l28-42h34l24 42h44v28H40V78z"
          fill="#0a1628"
          stroke="#2d6cb5"
          strokeWidth="2"
        />
        <path d="M88 78V52h118l-14 26H88z" fill="#1a4a7a" />
        <path d="M218 52h92l20 26h-112V52z" fill="#14365c" />
        <rect x="248" y="58" width="36" height="14" rx="2" fill="#6ee7ff" opacity="0.5" />
        <circle cx="110" cy="106" r="18" fill="#111" stroke="#2d6cb5" strokeWidth="3" />
        <circle cx="110" cy="106" r="8" fill="#333" />
        <circle cx="310" cy="106" r="18" fill="#111" stroke="#2d6cb5" strokeWidth="3" />
        <circle cx="310" cy="106" r="8" fill="#333" />
        <rect x="52" y="82" width="8" height="4" fill="#ff6b2c" className="tremor-badge" />
        <text x="64" y="86" fill="#ff6b2c" fontSize="8" fontFamily="monospace">
          TREMOR
        </text>
      </svg>
    </div>
  );
}
