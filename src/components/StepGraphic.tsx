type Graphic = "buddy" | "powers" | "mission";

export function StepGraphic({ kind }: { kind: Graphic }) {
  if (kind === "buddy") {
    return (
      <svg className="step-graphic" viewBox="0 0 280 160" aria-hidden>
        <rect width="280" height="160" rx="16" fill="#0c1f3d" />
        <rect x="24" y="28" width="100" height="70" rx="8" fill="#1a4a7a" stroke="#4a9eff" />
        <text x="74" y="55" textAnchor="middle" fill="#8fafd4" fontSize="10">
          your code
        </text>
        <text x="74" y="72" textAnchor="middle" fill="#e8f1ff" fontSize="14">
          {"{ }"}
        </text>
        <circle cx="190" cy="70" r="36" fill="#2d6cb5" stroke="#6ee7ff" strokeWidth="2" />
        <circle cx="178" cy="62" r="5" fill="#fff" />
        <circle cx="202" cy="62" r="5" fill="#fff" />
        <path d="M178 82 Q190 92 202 82" stroke="#fff" strokeWidth="2" fill="none" />
        <path
          d="M154 70 H160 M220 70 H226 M190 34 V28"
          stroke="#ff6b2c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x="140" y="138" textAnchor="middle" fill="#ff9500" fontSize="11">
          Cursor = code + AI buddy
        </text>
      </svg>
    );
  }

  if (kind === "powers") {
    return (
      <svg className="step-graphic" viewBox="0 0 280 160" aria-hidden>
        <rect width="280" height="160" rx="16" fill="#0c1f3d" />
        <g transform="translate(28,36)">
          <rect width="64" height="72" rx="10" fill="#14365c" stroke="#4a9eff" />
          <text x="32" y="28" textAnchor="middle" fontSize="22">
            💬
          </text>
          <text x="32" y="52" textAnchor="middle" fill="#e8f1ff" fontSize="9">
            Chat
          </text>
        </g>
        <g transform="translate(108,28)">
          <rect width="64" height="88" rx="10" fill="#14365c" stroke="#ff6b2c" strokeWidth="2" />
          <text x="32" y="32" textAnchor="middle" fontSize="22">
            🚀
          </text>
          <text x="32" y="56" textAnchor="middle" fill="#e8f1ff" fontSize="9">
            Agent
          </text>
        </g>
        <g transform="translate(188,44)">
          <rect width="64" height="72" rx="10" fill="#14365c" stroke="#6ee7ff" />
          <text x="32" y="28" textAnchor="middle" fontSize="22">
            ⚡
          </text>
          <text x="32" y="52" textAnchor="middle" fill="#e8f1ff" fontSize="9">
            Tab
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg className="step-graphic" viewBox="0 0 280 160" aria-hidden>
      <rect width="280" height="160" rx="16" fill="#0c1f3d" />
      <ellipse cx="72" cy="118" rx="40" ry="12" fill="#111" opacity="0.4" />
      <path
        d="M20 100h120l12-28h40l16 28h52v16H20z"
        fill="#1a4a7a"
        stroke="#2d6cb5"
        strokeWidth="2"
      />
      <circle cx="48" cy="116" r="10" fill="#222" stroke="#2d6cb5" strokeWidth="2" />
      <circle cx="128" cy="116" r="10" fill="#222" stroke="#2d6cb5" strokeWidth="2" />
      <ellipse cx="200" cy="88" rx="22" ry="14" fill="#444" />
      <ellipse cx="200" cy="82" rx="20" ry="12" fill="#555" />
      <circle cx="200" cy="92" r="8" fill="#ff9500" opacity="0.8" />
      <text x="200" y="68" textAnchor="middle" fontSize="16">
        🛸
      </text>
      <rect x="228" y="96" width="14" height="14" fill="#5b8a2a" />
      <rect x="242" y="96" width="14" height="14" fill="#6b4423" />
      <text x="140" y="28" textAnchor="middle" fill="#ff9500" fontSize="10">
        Tremor + Ooni + drones + blocks
      </text>
    </svg>
  );
}
