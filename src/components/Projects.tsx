import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "../lib/content";
import { Reveal, SectionHead, Wrap } from "./Section";
import { MiniGear } from "./Gear";

function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * 6);
    ry.set(px * 6);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 950 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TAGS = ["PNEUMATICS", "ENERGY AUDIT", "AUTOMATION", "Δ SAVE 120+ U/DAY"];

export default function Projects() {
  return (
    <section id="projects" className="border-b border-softline py-24 md:py-28">
      <Wrap>
        <SectionHead num="04" title="Projects" sub="// SHEET REGISTER" />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Ponni Sugars — energy audit */}
          <Reveal>
            <a
              href={CONTACT.report}
              target="_blank"
              rel="noopener noreferrer"
              data-cad="OPEN REPORT"
              className="group block h-full"
            >
              <Tilt className="brackets relative flex h-full flex-col border border-dashed border-bline bg-[rgba(18,49,82,0.4)] backdrop-blur-[6px] transition-[border-color,box-shadow] duration-300 hover:border-copperb hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.65),0_0_18px_rgba(205,131,71,0.18)]">
                <div className="relative overflow-hidden border-b border-dashed border-bline">
                  <img
                    src="/images/project-ponni.png"
                    alt="Blueprint schematic of a thermal power plant fly-ash handling system"
                    loading="lazy"
                    className="aspect-[16/9] w-full scale-[1.08] object-cover opacity-90 brightness-[0.95] transition duration-700 group-hover:scale-[1.14] group-hover:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(12,33,54,0.55)] via-transparent to-transparent" />
                  <div className="scanline" />
                  <span className="absolute left-3 top-3 border border-softline bg-[rgba(12,33,54,0.75)] px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-copperb backdrop-blur-sm">
                    FIG. 03
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-faint transition-colors duration-300 group-hover:text-copperb">
                    Sheet 01 / Ponni Sugars (Erode) Ltd — Thermal Power Plant · Jan–Apr 2025
                  </div>
                  <h3 className="mt-3 font-mono text-lg uppercase leading-snug text-ink">
                    Industrial System Optimization
                  </h3>
                  <p className="mt-1 text-sm font-medium text-dim">
                    Energy Conservation &amp; Auditing
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-faint">
                    Proposed and deployed pressure-transmitter-based control in
                    the fly-ash handling system to cut compressed-air usage —
                    estimated savings of 120+ units of electricity/day when
                    scaled across all transporter units.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                      <span
                        key={t}
                        className="border border-softline px-2 py-0.5 font-mono text-[9.5px] tracking-[0.08em] text-dim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="sweep-link font-mono text-[11px] tracking-[0.1em] text-copperb">
                      View project report
                      <ArrowUpRight
                        size={13}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-faint">PDF</span>
                  </div>
                </div>
              </Tilt>
            </a>
          </Reveal>

          {/* reserved sheet */}
          <Reveal delay={0.1}>
            <div className="relative flex min-h-[340px] flex-col items-center justify-center border border-dashed border-bline/70 bg-[rgba(18,49,82,0.22)] p-6 text-center opacity-70 md:min-h-0">
              <span className="relative text-faint">
                <MiniGear size={28} dur={26} />
                <span
                  className="absolute inset-0 rounded-full border border-copper/50"
                  style={{ animation: "pingSoft 2.4s cubic-bezier(0,0,0.2,1) infinite" }}
                />
              </span>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
                Sheet 02 — Reserved
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                More projects in the toolroom
              </p>
              <span className="mt-6 block h-px w-24 bg-softline" />
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.24em] text-faint/70">
                Awaiting release · Rev —
              </p>
            </div>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
