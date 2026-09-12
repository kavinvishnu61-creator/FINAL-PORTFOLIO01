import { motion } from "framer-motion";
import { gearPath, polar } from "../lib/gear";
import { useApp } from "../lib/store";

/* ------------------------------------------------------------------ */
/* Small spinning cog used in nav / preloader / watermarks             */
/* ------------------------------------------------------------------ */
export function MiniGear({
  size = 16,
  dur = 10,
  rev = false,
  sw = 2.4,
  className = "",
}: {
  size?: number;
  dur?: number;
  rev?: boolean;
  sw?: number;
  className?: string;
}) {
  const d = gearPath(16, 16, 14, 11.2, 10);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
      style={{
        animation: `${rev ? "spinSlowRev" : "spinSlow"} ${dur}s linear infinite`,
        transformOrigin: "center",
      }}
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinejoin="miter" />
      <circle cx="16" cy="16" r="4.4" fill="none" stroke="currentColor" strokeWidth={sw * 0.85} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero figure — two meshing gears as a live engineering drawing       */
/* ------------------------------------------------------------------ */
// ── Shared module m = 13 ─────────────────────────────────────────────────────
// rPitch = m × N / 2  →  rOut = rPitch + m  →  rRoot = rPitch − 1.25·m
// Center distance C = rPitch_big + rPitch_small = 143 + 78 = 221
// SMALL center placed 221 units from BIG along the same direction as the
// original layout so the visual composition is preserved.
// (MODULE = 13 used for all derived values above; no runtime constant needed)
const BIG   = { x: 200, y: 300, rOut: 156, rRoot: 127, teeth: 22 }; // rPitch=143
const SMALL = { x: 381, y: 173, rOut:  91, rRoot:  62, teeth: 12 }; // rPitch= 78

export function GearsFigure() {
  const { booted } = useApp();

  const draw = (delay: number, dur = 1.7) =>
    ({
      initial: { pathLength: 0 },
      animate: booted ? { pathLength: 1 } : { pathLength: 0 },
      transition: { delay, duration: dur, ease: "easeInOut" as const },
    }) as const;

  // Bore circles orbit at 63% of pitch radius to stay well inside the gear body
  const boresBig   = Array.from({ length: 6 }, (_, i) => polar(BIG.x,   BIG.y,   90, i * 60 + 12));
  const boresSmall = Array.from({ length: 4 }, (_, i) => polar(SMALL.x, SMALL.y, 47, i * 90 + 45));

  return (
    <div className="relative mx-auto w-full max-w-[480px]" aria-hidden>
      <svg viewBox="0 0 520 520" className="h-auto w-full overflow-visible">
        {/* annotated title */}
        <text x="6" y="34" fill="#84A6C7" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="3" opacity="0.9">
          DWG KV-2025 // GEAR TRAIN
        </text>
        <text x="6" y="52" fill="#3E6C99" fontSize="10" fontFamily="IBM Plex Mono, monospace" letterSpacing="2">
          Ø336 ±0.02 · MESH 12:22 · CLASS B
        </text>

        {/* static geometry: centerlines + construction circles */}
        <g stroke="#CD8347" strokeWidth="1" opacity="0.55" className="dash-flow" fill="none">
          <line x1={BIG.x - 196} y1={BIG.y} x2={BIG.x + 196} y2={BIG.y} />
          <line x1={BIG.x} y1={BIG.y - 196} x2={BIG.x} y2={BIG.y + 196} />
          <line x1={SMALL.x - 112} y1={SMALL.y} x2={SMALL.x + 112} y2={SMALL.y} />
          <line x1={SMALL.x} y1={SMALL.y - 112} x2={SMALL.x} y2={SMALL.y + 112} />
        </g>
        {/* pitch circles — r = m×N/2 */}
        <circle cx={BIG.x} cy={BIG.y} r="143" fill="none" stroke="#3E6C99" strokeWidth="1" strokeDasharray="4 7" opacity="0.6" />
        <circle cx={SMALL.x} cy={SMALL.y} r="78" fill="none" stroke="#3E6C99" strokeWidth="1" strokeDasharray="4 7" opacity="0.6" />

        {/* datum marks at centers */}
        <path d={`M${BIG.x - 7},${BIG.y} h14 M${BIG.x},${BIG.y - 7} v14`} stroke="#E6A868" strokeWidth="1.4" fill="none" />
        <path d={`M${SMALL.x - 6},${SMALL.y} h12 M${SMALL.x},${SMALL.y - 6} v12`} stroke="#E6A868" strokeWidth="1.4" fill="none" />

        {/* ── big gear — rotating CW ───────────────────────────────────────────
             Phase −6° baked into path: places a tooth GAP at the mesh point
             (atan2(173−300, 381−200) ≈ −35°, nearest gap lands at −35° with −6° offset)
             spinSlow = CW,  period = N_big × tooth_period = 22 × 6 s = 132 s   */}
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: "spinSlow 132s linear infinite",
          }}
        >
          <motion.path
            d={gearPath(BIG.x, BIG.y, BIG.rOut, BIG.rRoot, BIG.teeth, -2)}
            fill="rgba(28,67,112,0.16)"
            stroke="#3E6C99"
            strokeWidth="1.6"
            {...draw(0.25, 2)}
          />
          {boresBig.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="14"
              fill="none"
              stroke="#3E6C99"
              strokeWidth="1.2"
              opacity="0.85"
              {...draw(0.7, 1.1)}
            />
          ))}
          <motion.circle cx={BIG.x} cy={BIG.y} r="34" fill="none" stroke="#3E6C99" strokeWidth="1.4" {...draw(0.9, 0.9)} />
          <motion.circle cx={BIG.x} cy={BIG.y} r="13" fill="none" stroke="#3E6C99" strokeWidth="1.2" {...draw(1.1, 0.7)} />
        </g>

        {/* ── small gear — rotating CCW ─────────────────────────────────────────
             Phase +4° baked into path: places a tooth TIP at the mesh point
             (atan2(300−173, 200−381) ≈ 145°, nearest tip lands at 145° with +4° offset)
             spinSlowRev = CCW,  period = N_small × tooth_period = 12 × 6 s = 72 s  */}
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: "spinSlowRev 72s linear infinite",
          }}
        >
          <motion.path
            d={gearPath(SMALL.x, SMALL.y, SMALL.rOut, SMALL.rRoot, SMALL.teeth, 10)}
            fill="rgba(205,131,71,0.10)"
            stroke="#CD8347"
            strokeWidth="1.6"
            {...draw(0.5, 2)}
          />
          {boresSmall.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="8.5"
              fill="none"
              stroke="#CD8347"
              strokeWidth="1.1"
              opacity="0.9"
              {...draw(1, 0.9)}
            />
          ))}
          <motion.circle cx={SMALL.x} cy={SMALL.y} r="22" fill="none" stroke="#CD8347" strokeWidth="1.3" {...draw(1.15, 0.8)} />
        </g>
      </svg>

      {/* figure caption */}
      <div className="mt-3 flex items-center justify-between border-t border-softline pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
        <span>FIG. 01 — GEAR TRAIN STUDY</span>
        <span>NOT TO SCALE</span>
      </div>
    </div>
  );
}
