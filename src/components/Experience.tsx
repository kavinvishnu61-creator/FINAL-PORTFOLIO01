import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE } from "../lib/anim";
import { EXPERIENCE, type RevItem } from "../lib/content";
import { SectionHead, Wrap, Reveal } from "./Section";

function Row({
  it,
  i,
  open,
  onToggle,
}: {
  it: RevItem;
  i: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -42, y: 26 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
      style={{ transformOrigin: "top center" }}
      className={`group/row relative rounded-md transition-colors duration-300 hover:bg-[rgba(255,255,255,0.055)] ${
        i % 2 ? "bg-[rgba(255,255,255,0.03)]" : ""
      }`}
    >
      <span className="absolute left-0 top-0 h-full w-[2px] origin-center scale-y-0 bg-copper transition-transform duration-300 group-hover/row:scale-y-100" />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        data-cad={open ? "COLLAPSE" : "EXPAND"}
        className="block w-full px-3 py-5 text-left md:px-4"
      >
        <div className="grid items-start gap-x-4 [grid-template-columns:36px_minmax(0,1fr)_24px] md:[grid-template-columns:56px_1.15fr_1.5fr_150px_24px]">
          <div className="pt-0.5 font-mono text-sm font-semibold text-copperb">
            {it.rev}
          </div>

          <div>
            <div className="font-semibold leading-snug text-ink">{it.role}</div>
            <div className="mt-1 font-mono text-xs text-faint">{it.company}</div>
            <div className="mt-2 text-sm leading-relaxed text-dim md:hidden">
              {it.details}
              <span className="mt-2 flex items-center gap-2 font-mono text-[10px] text-faint">
                {it.current && (
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-copperb" />
                )}
                {it.date}
              </span>
            </div>
          </div>

          <div className="hidden text-sm leading-relaxed text-dim md:block">
            {it.details}
          </div>

          <div className="hidden items-center gap-2 whitespace-nowrap pt-1 font-mono text-[11px] text-faint md:flex">
            {it.current && (
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-copperb" />
            )}
            {it.date}
          </div>

          <div className="flex justify-end pt-1">
            <Plus
              size={14}
              className={`transition-all duration-300 ${
                open ? "rotate-45 text-copperb" : "text-faint group-hover/row:text-dim"
              }`}
            />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <ul className="space-y-1.5 pb-1 pl-[52px] pr-2 pt-4 md:pl-[72px]">
                {it.bullets.map((b, j) => (
                  <li key={j} className="flex items-baseline gap-2.5 text-[13px] leading-relaxed text-dim">
                    <span className="font-mono text-copper">+</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function Experience() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="experience" className="border-b border-softline py-24 md:py-28">
      <Wrap>
        <SectionHead num="02" title="Experience" sub="// REVISION HISTORY" />

        <Reveal>
          <div className="mb-1 hidden grid-cols-[56px_1.15fr_1.5fr_150px_24px] gap-x-4 px-4 pb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint md:grid">
            <span>Rev</span>
            <span>Role / Company</span>
            <span>Details</span>
            <span>Date</span>
            <span />
          </div>
        </Reveal>

        <div style={{ perspective: 900 }}>
          {EXPERIENCE.map((it, i) => (
            <Row
              key={it.rev}
              it={it}
              i={i}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            <span>* All revisions approved — see CV for full change log</span>
            <span>ECO-2025-001 · Click a row to expand</span>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
