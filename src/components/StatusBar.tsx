import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useApp, mx, my } from "../lib/store";
import { SECTIONS } from "../lib/content";

const NAMES: Record<string, string> = {
  home: "COVER",
  about: "ABOUT",
  experience: "EXPERIENCE",
  skills: "SKILLS",
  projects: "PROJECTS",
  contact: "CONTACT",
};

const pad = (v: number) => v.toFixed(1).padStart(6, "0");

function Key({
  on,
  label,
  onClick,
  title,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex h-[18px] items-center gap-1.5 border px-1.5 font-mono text-[9px] tracking-[0.14em] transition-colors duration-200 ${
        on
          ? "border-copper/60 text-copperb"
          : "border-softline text-faint hover:text-dim"
      }`}
    >
      <span className={`h-1 w-1 rounded-full ${on ? "bg-copperb" : "bg-faint/40"}`} />
      {label}
    </button>
  );
}

/** CAD-style status bar pinned to the bottom of the viewport. */
export default function StatusBar() {
  const {
    section,
    gridOn,
    dynOn,
    orthoOn,
    toggleGrid,
    toggleDyn,
    toggleOrtho,
    showToast,
  } = useApp();

  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const zRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(mx, "change", (v) => {
    if (xRef.current) xRef.current.textContent = `X ${pad(v)}`;
  });
  useMotionValueEvent(my, "change", (v) => {
    if (yRef.current) yRef.current.textContent = `Y ${pad(v)}`;
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (zRef.current)
      zRef.current.textContent = `Z ${String(Math.round(v * 100)).padStart(3, "0")}%`;
  });

  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const f = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        })
      );
    f();
    const id = window.setInterval(f, 1000);
    return () => window.clearInterval(id);
  }, []);

  const idx = Math.max(
    SECTIONS.findIndex((s) => s.id === section),
    0
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] flex h-7 items-center justify-between gap-3 border-t border-softline bg-[rgba(12,33,54,0.85)] px-3 font-mono text-[10px] tracking-[0.12em] backdrop-blur-md">
      {/* left: coordinates + mode keys */}
      <div className="flex items-center gap-3">
        <span ref={xRef} className="hidden w-[86px] text-copperb sm:inline-block">
          X 0000.0
        </span>
        <span ref={yRef} className="hidden w-[86px] text-copperb sm:inline-block">
          Y 0000.0
        </span>
        <span className="hidden text-faint md:inline">│</span>
        <div className="hidden items-center gap-1.5 md:flex">
          <Key
            on={gridOn}
            label="GRID"
            title="Toggle background grid"
            onClick={() => {
              toggleGrid();
              showToast(gridOn ? "GRID — OFF" : "GRID — ON");
            }}
          />
          <Key
            on={orthoOn}
            label="ORTHO"
            title="Snap cursor to 32px grid"
            onClick={() => {
              toggleOrtho();
              showToast(orthoOn ? "ORTHO — OFF" : "ORTHO — ON · SNAP 32");
            }}
          />
          <Key
            on={dynOn}
            label="DYN"
            title="Toggle coordinate readout"
            onClick={() => {
              toggleDyn();
              showToast(dynOn ? "DYN INPUT — OFF" : "DYN INPUT — ON");
            }}
          />
        </div>
        <span className="text-faint sm:hidden">
          SHT {String(idx).padStart(2, "0")}/05
        </span>
      </div>

      {/* center: clock */}
      <div className="text-dim">{time} IST</div>

      {/* right: sheet + zoom + rev */}
      <div className="flex items-center gap-3">
        <span className="hidden text-dim md:inline">
          SHT {String(idx).padStart(2, "0")}/05 — {NAMES[section] ?? "COVER"}
        </span>
        <span ref={zRef} className="hidden w-[62px] text-right text-copperb sm:inline-block">
          Z 000%
        </span>
        <span className="text-faint">REV A</span>
      </div>
    </div>
  );
}
