import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Infinite marquee with scroll-velocity boost and hover pause.
 */
export default function Marquee({
  items,
  reverse = false,
  speed = 44,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const vel = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    if (reduced) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      vel.current = Math.min(Math.abs(y - lastY) * 0.6, 110);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let x = reverse ? -1 : 0;
    let last = performance.now();
    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      const el = track.current;
      if (!el) return;
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      vel.current *= 0.93;
      const v = paused.current ? 0 : speed + vel.current;
      x += (reverse ? v : -v) * dt;
      if (!reverse && x <= -half) x += half;
      if (reverse && x >= 0) x -= half;
      el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, reverse, speed]);

  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5">{it}</span>
          <span className="inline-block h-1.5 w-1.5 rotate-45 border border-copper" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="mq-fade relative overflow-hidden border-y border-dashed border-bline bg-[rgba(18,49,82,0.3)]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-hidden
    >
      <div
        ref={track}
        className="flex w-max py-3.5 font-mono text-[12px] uppercase tracking-[0.12em] text-dim will-change-transform"
      >
        <Row />
        <Row />
      </div>
    </div>
  );
}
