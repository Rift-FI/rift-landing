/**
 * Currents.
 *
 * Continuous lines crossing the panel, each undulating at its own
 * wavelength and speed, so they weave and separate as they pass. It reads
 * as flow between places without drawing a map, and it is nobody else's
 * idea: not a particle field, not a globe, not a dashboard.
 *
 * The trick is that each line is drawn two panel-widths long with a whole
 * number of periods per width, then translated by exactly one width on a
 * linear loop. Because the wave repeats on that interval, the seam never
 * shows and the motion never stops or snaps back.
 *
 * One transform per line, animated in CSS, so the whole thing is a handful
 * of composited layers rather than hundreds of nodes. prefers-reduced-
 * motion holds every line still.
 *
 * Class names are prefixed `cur-` on purpose. An earlier version of this
 * panel used `.field`, which is also the form label class, and its
 * `line-height: 0` silently collapsed every label in the contact form.
 */

const W = 1200;
const H = 460;

type Line = {
  d: string;
  w: number;
  o: number;
  dur: number;
  delay: number;
};

/** Smooth sine across 2W, with `periods` whole waves per W so it loops. */
function wave(y: number, amp: number, periods: number, phase: number) {
  const step = 12;
  const pts: string[] = [];
  for (let x = 0; x <= W * 2; x += step) {
    const t = (x / W) * periods * Math.PI * 2 + phase;
    // a second, slower harmonic keeps it from reading as a pure sine
    const yy = y + Math.sin(t) * amp + Math.sin(t * 0.5 + phase) * amp * 0.35;
    pts.push(`${x},${Math.round(yy * 10) / 10}`);
  }
  return "M" + pts.join(" L");
}

function build(): Line[] {
  const out: Line[] = [];
  const N = 16;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);

    /* Bunch the lines toward the middle so the panel has a dense core and
       open space top and bottom, rather than even stripes. */
    const eased = t + Math.sin(t * Math.PI) * 0.1 * (t < 0.5 ? 1 : -1);
    const y = H * (0.1 + eased * 0.8);

    const centre = 1 - Math.abs(t - 0.5) * 2;

    out.push({
      d: wave(y, 14 + centre * 30, 1 + (i % 3), i * 0.7),
      w: 1 + centre * 1.4,
      o: 0.1 + centre * 0.42,
      dur: 26 + (i % 5) * 9,
      delay: -i * 3.1,
    });
  }
  return out;
}

const LINES = build();

export const Currents = () => (
  <div className="cur" aria-hidden="true">
    <svg
      className="cur-svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="presentation"
    >
      <defs>
        {/* Fades the lines out at the top and bottom edges so the band has
            no hard start or stop. */}
        <linearGradient id="curFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="22%" stopColor="#fff" stopOpacity="1" />
          <stop offset="78%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <mask id="curMask">
          <rect width={W} height={H} fill="url(#curFade)" />
        </mask>
        <radialGradient id="curWash" cx="50%" cy="50%" r="58%">
          <stop offset="0%" stopColor="#97FCE3" stopOpacity=".14" />
          <stop offset="100%" stopColor="#97FCE3" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill="url(#curWash)" />

      <g mask="url(#curMask)">
        {LINES.map((l, i) => (
          <path
            key={i}
            className="cur-line"
            d={l.d}
            strokeWidth={l.w}
            style={
              {
                "--o": l.o,
                animationDuration: `${l.dur}s`,
                animationDelay: `${l.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  </div>
);
