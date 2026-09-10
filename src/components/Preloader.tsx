import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../lib/store";
import { EASE_HARD } from "../lib/anim";
import { MiniGear } from "./Gear";

const LINES = [
  { t: "[SYS] INITIALIZING PORTFOLIO KERNEL", at: 0, copper: false },
  { t: "[SYS] MOUNTING CAD DEPENDENCIES ..... OK", at: 30, copper: false },
  { t: "[SYS] CALIBRATING GRID · ORTHO · SNAP . OK", at: 62, copper: false },
  { t: "[DONE] SHEET READY — REV A", at: 88, copper: true },
];

export default function Preloader() {
  const { setBooted } = useApp();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const skip = useRef(false);

  useEffect(() => {
    const t0 = performance.now();
    const DUR = 1750;
    let raf = 0;
    const tick = (t: number) => {
      const p = skip.current ? 1 : Math.min((t - t0) / DUR, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setBooted(true);
        window.setTimeout(() => setDone(true), 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setBooted]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          onClick={() => (skip.current = true)}
          className="fixed inset-0 z-[400] flex items-center justify-center bg-navy-900"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: EASE_HARD }}
        >
          {/* drawing-sheet border */}
          <div aria-hidden className="pointer-events-none absolute inset-3 border border-softline" />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-3 h-[3px] w-16 -translate-x-1/2 bg-navy-900" />

          <div className="w-[min(460px,82vw)]">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-copperb">
                <MiniGear size={26} dur={2.2} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                KV · Portfolio Boot
              </span>
            </div>

            <div className="min-h-[96px] space-y-2 font-mono text-[11px] tracking-[0.06em] text-dim sm:text-xs">
              {LINES.filter((l) => progress >= l.at || (l.at === 0 && true)).map((l, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={l.copper ? "text-copperb" : ""}
                >
                  {l.t}
                  {i === LINES.filter((x) => progress >= x.at).length - 1 && (
                    <span className="anim-blink text-copper"> █</span>
                  )}
                </motion.p>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-[2px] flex-1 overflow-hidden bg-softline">
                <div
                  className="h-full bg-copperb shadow-[0_0_10px_rgba(230,168,104,0.7)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="w-10 text-right font-mono text-[11px] text-copperb">
                {progress}%
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 right-7 text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-faint">
            <p>Kavin Vishnu S — Portfolio</p>
            <p>Sheet 01/01 · Scale 1:1</p>
          </div>
          <div className="absolute bottom-6 left-7 font-mono text-[9px] uppercase tracking-[0.2em] text-faint/70">
            Click to skip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
