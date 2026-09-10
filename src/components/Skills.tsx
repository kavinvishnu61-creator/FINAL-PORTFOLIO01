import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../lib/anim";
import { SKILLS, type SkillCat } from "../lib/content";
import { Reveal, SectionHead, Wrap } from "./Section";

const TABS: { id: SkillCat; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "DESIGN", label: "Design" },
  { id: "CAE/CAM", label: "CAE / CAM" },
  { id: "MFG", label: "Mfg" },
  { id: "PROCESS", label: "Process" },
];

function LevelBar({ lvl, name }: { lvl: number; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1" role="img" aria-label={`${name} proficiency: ${lvl} of 5`}>
        {Array.from({ length: 5 }, (_, j) =>
          j < lvl ? (
            <motion.span
              key={j}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: 0.2 + j * 0.08, duration: 0.4, ease: EASE }}
              className="block h-[6px] w-4 origin-left bg-copper"
              style={{
                animation: "pulseGlow 2s infinite alternate",
                animationDelay: `${1 + j * 0.12}s`,
              }}
            />
          ) : (
            <span key={j} className="block h-[6px] w-4 bg-softline" />
          )
        )}
      </div>
      <span className="w-7 text-right font-mono text-[10px] text-faint">{lvl}/5</span>
    </div>
  );
}

export default function Skills() {
  const [cat, setCat] = useState<SkillCat>("ALL");
  const rows = SKILLS.filter((s) => cat === "ALL" || s.cat === cat);

  return (
    <section id="skills" className="border-b border-softline py-24 md:py-28">
      <Wrap>
        <SectionHead num="03" title="Skills" sub="// BILL OF MATERIALS" />

        {/* filter tabs */}
        <Reveal>
          <div className="mb-7 flex flex-wrap gap-2">
            {TABS.map((t) => {
              const n =
                t.id === "ALL" ? SKILLS.length : SKILLS.filter((s) => s.cat === t.id).length;
              const active = cat === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setCat(t.id)}
                  data-cad="FILTER"
                  className={`border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-all duration-200 ${
                    active
                      ? "border-copper bg-copper font-semibold text-navy-900"
                      : "border-softline text-dim hover:border-copper/70 hover:text-copperb"
                  }`}
                >
                  {t.label}
                  <span className={active ? "text-navy-900/70" : "text-faint"}> [{n}]</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate" style={{ borderSpacing: "0 4px" }}>
              <thead>
                <tr>
                  <th className="rounded-l-md bg-dim px-4 py-3 text-left font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-paperink">
                    Item
                  </th>
                  <th className="bg-dim px-4 py-3 text-left font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-paperink">
                    Description
                  </th>
                  <th className="bg-dim px-4 py-3 text-left font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-paperink">
                    Category
                  </th>
                  <th className="rounded-r-md bg-dim px-4 py-3 text-left font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-paperink">
                    Proficiency
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {rows.map((s, i) => (
                    <motion.tr
                      key={s.name}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="group"
                    >
                      <td
                        className={`rounded-l-md px-4 py-3.5 font-mono text-[13px] text-copperb transition-colors group-hover:bg-[rgba(255,255,255,0.06)] ${
                          i % 2 ? "bg-[rgba(255,255,255,0.03)]" : ""
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td
                        className={`px-4 py-3.5 text-sm text-ink transition-colors group-hover:bg-[rgba(255,255,255,0.06)] ${
                          i % 2 ? "bg-[rgba(255,255,255,0.03)]" : ""
                        }`}
                      >
                        {s.name}
                      </td>
                      <td
                        className={`px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-dim transition-colors group-hover:bg-[rgba(255,255,255,0.06)] ${
                          i % 2 ? "bg-[rgba(255,255,255,0.03)]" : ""
                        }`}
                      >
                        {s.cat}
                      </td>
                      <td
                        className={`rounded-r-md px-4 py-3.5 transition-colors group-hover:bg-[rgba(255,255,255,0.06)] ${
                          i % 2 ? "bg-[rgba(255,255,255,0.03)]" : ""
                        }`}
                      >
                        <LevelBar lvl={s.lvl} name={s.name} />
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            <span>Proficiency — self-assessed against live project use</span>
            <span>QTY {String(rows.length).padStart(2, "0")} · {cat} FILTER</span>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
