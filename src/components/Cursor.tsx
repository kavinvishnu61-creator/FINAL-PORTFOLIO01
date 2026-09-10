import { useEffect, useRef, useState } from "react";
import { useApp, mx, my } from "../lib/store";

/**
 * CAD crosshair — full-height/width hairlines with a lerped chase,
 * live coordinate readout, and context labels over interactive elements.
 * ORTHO snaps the chase to the 32px grid. DYN toggles the readout.
 */
export default function Cursor() {
  const { dynOn, orthoOn } = useApp();
  const dynRef = useRef(dynOn);
  dynRef.current = dynOn;
  const orthoRef = useRef(orthoOn);
  orthoRef.current = orthoOn;

  const [fine, setFine] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const vLine = useRef<HTMLDivElement>(null);
  const hLine = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const labelText = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!fine) return;
    const SNAP = 32;
    let tx = -100,
      ty = -100,
      cx = -100,
      cy = -100,
      raf = 0,
      seen = false,
      mode = "";

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        cx = tx;
        cy = ty;
        if (root.current) root.current.style.opacity = "1";
      }
      const t = e.target as HTMLElement | null;
      const cad = t?.closest?.("[data-cad]") as HTMLElement | null;
      const interactive = cad ?? (t?.closest?.("a,button") as HTMLElement | null);
      mode = cad?.dataset.cad || (interactive ? "SELECT" : "");
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!seen) return;
      const gx = orthoRef.current ? Math.round(tx / SNAP) * SNAP : tx;
      const gy = orthoRef.current ? Math.round(ty / SNAP) * SNAP : ty;
      cx += (gx - cx) * 0.24;
      cy += (gy - cy) * 0.24;
      if (vLine.current)
        vLine.current.style.transform = `translate3d(${cx.toFixed(1)}px,0,0)`;
      if (hLine.current)
        hLine.current.style.transform = `translate3d(0,${cy.toFixed(1)}px,0)`;
      if (mark.current) {
        mark.current.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) translate(-50%,-50%) rotate(${mode ? 45 : 0}deg)`;
        mark.current.dataset.hot = mode ? "1" : "0";
      }
      if (label.current && labelText.current) {
        label.current.style.transform = `translate3d(${cx + 16}px, ${cy + 16}px, 0)`;
        label.current.style.opacity = dynRef.current || mode ? "1" : "0";
        const text = mode
          ? `[ ${mode.toUpperCase()} ]`
          : `X ${cx.toFixed(1)} · Y ${cy.toFixed(1)}`;
        if (labelText.current.textContent !== text)
          labelText.current.textContent = text;
      }
      mx.set(cx);
      my.set(cy);
    };

    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget && root.current) root.current.style.opacity = "0";
    };
    const onIn = () => {
      if (root.current && seen) root.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseover", onIn);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseover", onIn);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[300] opacity-0 transition-opacity duration-300"
    >
      <div ref={vLine} className="absolute left-0 top-0 h-full w-px bg-copperb/15" />
      <div ref={hLine} className="absolute left-0 top-0 h-px w-full bg-copperb/15" />
      <div
        ref={mark}
        data-hot="0"
        className="absolute left-0 top-0 h-[9px] w-[9px] border border-copperb/45 transition-[width,height,border-color] duration-200 data-[hot=1]:h-[20px] data-[hot=1]:w-[20px] data-[hot=1]:border-copperb"
      />
      <div
        ref={label}
        className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] tracking-[0.08em] text-copperb transition-opacity duration-200"
        style={{ textShadow: "0 0 8px rgba(12,33,54,0.95), 0 0 2px rgba(12,33,54,0.95)" }}
      >
        <span ref={labelText} />
      </div>
    </div>
  );
}
