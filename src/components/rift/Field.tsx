/**
 * The flow field.
 *
 * A drift of mint particles on deep green, in the register hyperliquid uses
 * for its dark panel. Abstract on purpose: it reads as movement and volume
 * without claiming to be a map, a product screenshot, or a number.
 *
 * Built rather than drawn, for three reasons. It is about 6KB instead of a
 * 100KB render, it is sharp at any width, and it carries no text, so nothing
 * in it can go stale or promise a product we do not ship.
 *
 * Every particle is one <circle> with two CSS animations, drift and pulse,
 * each given its own duration and a negative delay so nothing starts in
 * lockstep. CSS rather than requestAnimationFrame, so it runs on the
 * compositor and holds its frames while the rest of the page is still
 * loading. prefers-reduced-motion stops all of it.
 */

const W = 1200;
const H = 520;
const N = 360;

/** Deterministic, so the field is identical on every render and in tests. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type P = {
  x: number; y: number; r: number; o: number;
  dx: number; dy: number; dur: number; delay: number; pulse: number;
};

function build(): P[] {
  const rand = rng(20261018);
  const out: P[] = [];

  for (let i = 0; i < N; i++) {
    const x = rand() * W;

    /* Cluster around a diagonal band so the field has a current running
       through it rather than sitting as even noise. The band drifts down
       as it crosses, and particles fall off either side of it. */
    const band = H * 0.26 + (x / W) * H * 0.42;
    const spread = H * (0.1 + rand() * 0.5);
    const y = band + (rand() - 0.5) * spread * 2;
    if (y < -20 || y > H + 20) continue;

    /* Distance from the band drives size and opacity, so the centre of the
       current reads brighter and heavier than its edges. */
    const off = Math.min(Math.abs(y - band) / (H * 0.5), 1);
    const near = 1 - off;

    const big = rand();
    const r =
      big > 0.955 ? 4 + rand() * 3.4 :
      big > 0.83 ? 2.2 + rand() * 1.6 :
      0.9 + rand() * 1.2;

    out.push({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      r: Math.round(r * 10) / 10,
      o: Math.round((0.3 + near * 0.68) * (0.55 + rand() * 0.45) * 100) / 100,
      dx: Math.round((6 + rand() * 26) * 10) / 10,
      dy: Math.round((rand() - 0.5) * 16 * 10) / 10,
      dur: Math.round((14 + rand() * 22) * 10) / 10,
      delay: Math.round(rand() * 30 * 10) / 10,
      pulse: Math.round((3 + rand() * 6) * 10) / 10,
    });
  }
  return out;
}

const PARTICLES = build();

export const Field = () => (
  <div className="field" aria-hidden="true">
    <svg
      className="field-svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <defs>
        {/* One soft bloom, reused. Cheaper than a filter per particle and
            it keeps the big dots from looking like flat stickers. */}
        <filter id="fieldGlow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="4.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="fieldWash" cx="62%" cy="44%" r="62%">
          <stop offset="0%" stopColor="#97FCE3" stopOpacity=".16" />
          <stop offset="100%" stopColor="#97FCE3" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill="url(#fieldWash)" />

      {/* Two passes. The small dots render unfiltered so they stay sharp;
          only the large ones get the bloom, which is where it reads. */}
      <g>
        {PARTICLES.filter((p) => p.r <= 3.6).map((p, i) => (
          <circle
            key={i}
            className="p"
            cx={p.x}
            cy={p.y}
            r={p.r}
            style={
              {
                "--o": p.o,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                animationDuration: `${p.dur}s, ${p.pulse}s`,
                animationDelay: `-${p.delay}s, -${p.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      <g filter="url(#fieldGlow)">
        {PARTICLES.filter((p) => p.r > 3.6).map((p, i) => (
          <circle
            key={i}
            className="p p-lg"
            cx={p.x}
            cy={p.y}
            r={p.r}
            style={
              {
                "--o": p.o,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                animationDuration: `${p.dur}s, ${p.pulse}s`,
                animationDelay: `-${p.delay}s, -${p.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  </div>
);

/** Only numbers we can stand behind. Nothing here is modelled or projected. */
const STATS: { v: string; l: string }[] = [
  { v: "4", l: "Markets" },
  { v: "$10M+", l: "Processed to date" },
  { v: "Minutes", l: "To settle" },
];

export const Stats = () => (
  <div className="stats">
    <div className="wrap stats-in">
      {STATS.map((s) => (
        <div className="stat" key={s.l}>
          <b>{s.v}</b>
          <span>{s.l}</span>
        </div>
      ))}
    </div>
  </div>
);
