import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "../lib/anim";

export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1040px] px-6 sm:px-7 ${className}`}>
      {children}
    </div>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="relative mb-12 md:mb-14">
      <div
        aria-hidden
        className="outline-word pointer-events-none absolute -left-[0.04em] -top-[0.6em] select-none font-mono font-bold uppercase leading-none text-[clamp(62px,11vw,148px)]"
      >
        {title}
      </div>
      <Reveal className="relative">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <div className="eyebrow mb-2.5 flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-1.5 rotate-45 border border-copperb" />
              § {num}
            </div>
            <h2 className="flex items-center gap-4 font-mono text-[clamp(26px,4vw,34px)] font-bold uppercase tracking-[0.02em] text-ink">
              {title}
              <span className="hidden h-px w-20 bg-bline/60 sm:block" />
            </h2>
          </div>
          {sub && (
            <div className="pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              {sub}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
