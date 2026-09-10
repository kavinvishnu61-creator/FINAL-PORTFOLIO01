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
const BIG = { x: 200, y: 300, rOut: 168, rRoot: 143, teeth: 22 };
const SMALL = { x: 393, y: 165, rOut: 88, rRoot: 74, teeth: 12 };

export function GearsFigure() {
  const { booted } = useApp();

  const draw = (delay: number, dur = 1.7) =>
    ({
      initial: { pathLength: 0 },
      animate: booted ? { pathLength: 1 } : { pathLength: 0 },
      transition: { delay, duration: dur, ease: "easeInOut" as const },
    }) as const;

  const boresBig = Array.from({ length: 6 }, (_, i) => polar(BIG.x, BIG.y, 108, i * 60 + 12));
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
        <circle cx={BIG.x} cy={BIG.y} r="108" fill="none" stroke="#3E6C99" strokeWidth="1" strokeDasharray="4 7" opacity="0.6" />
        <circle cx={SMALL.x} cy={SMALL.y} r="47" fill="none" stroke="#3E6C99" strokeWidth="1" strokeDasharray="4 7" opacity="0.6" />

        {/* datum marks at centers */}
        <path d={`M${BIG.x - 7},${BIG.y} h14 M${BIG.x},${BIG.y - 7} v14`} stroke="#E6A868" strokeWidth="1.4" fill="none" />
        <path d={`M${SMALL.x - 6},${SMALL.y} h12 M${SMALL.x},${SMALL.y - 6} v12`} stroke="#E6A868" strokeWidth="1.4" fill="none" />

        {/* big gear — rotating assembly */}
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: "spinSlow 90s linear infinite",
          }}
        >
          <motion.path
            d={gearPath(BIG.x, BIG.y, BIG.rOut, BIG.rRoot, BIG.teeth)}
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

        {/* small gear — counter-rotating */}
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            animation: "spinSlowRev 62s linear infinite",
          }}
        >
          <motion.path
            d={gearPath(SMALL.x, SMALL.y, SMALL.rOut, SMALL.rRoot, SMALL.teeth)}
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
