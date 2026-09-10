import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useApp } from "../lib/store";

/**
 * The blueprint grid — visually identical to the original design.
 * Subtle lerped parallax on fine pointers; can be toggled from the
 * status bar's GRID key.
 */
export default function Background() {
  const { gridOn } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      moving = false,
      raf = 0;

    const step = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        raf = requestAnimationFrame(step);
      } else {
        moving = false;
      }
    };

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 18;
      ty = (e.clientY / window.innerHeight - 0.5) * 18;
      if (!moving) {
        moving = true;
        raf = requestAnimationFrame(step);
      }
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!moving) {
        moving = true;
        raf = requestAnimationFrame(step);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed transition-opacity duration-500 will-change-transform"
      style={{
        top: -30,
        left: -30,
        width: "calc(100vw + 60px)",
        height: "calc(100vh + 60px)",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(232,240,246,0.14) 0px, rgba(232,240,246,0.14) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(232,240,246,0.14) 0px, rgba(232,240,246,0.14) 1px, transparent 1px, transparent 32px)",
        backgroundPosition: "center center",
        zIndex: -1,
        opacity: gridOn ? 1 : 0.05,
      }}
    />
  );
}
