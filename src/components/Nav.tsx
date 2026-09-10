import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useApp } from "../lib/store";
import { SECTIONS, CONTACT } from "../lib/content";
import { EASE } from "../lib/anim";
import { MiniGear } from "./Gear";

export default function Nav() {
  const { section } = useApp();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 60));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[100] border-b border-softline bg-[rgba(12,33,54,0.65)] backdrop-blur-md">
        <div
          className={`mx-auto flex w-full max-w-[1040px] items-center justify-between px-6 transition-all duration-300 sm:px-7 ${
            compact ? "h-[48px]" : "h-[60px]"
          }`}
        >
          <a
            href="#home"
            data-cad="HOME"
            className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-[0.06em] text-ink transition-colors hover:text-copperb"
          >
            <span className="text-copperb">
              <MiniGear size={15} dur={14} />
            </span>
            KAVIN VISHNU<span className="text-copperb">.</span>
          </a>

          <div className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-dim lg:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-cad={s.label}
                className={`navlink ${section === s.id ? "active" : ""}`}
              >
                <span className="mr-1.5 text-faint">{s.num}</span>
                {s.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="flex items-center gap-2 border border-bline px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-ink transition-colors hover:border-copperb hover:text-copperb lg:hidden"
          >
            {open ? <X size={13} /> : <Menu size={13} />}
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[95] bg-[rgba(12,33,54,0.96)] backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-8 pb-16 pt-24">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                  Sheet Index
                </p>
                {SECTIONS.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.07 * i + 0.08, duration: 0.4, ease: EASE }}
                    className={`flex items-baseline gap-4 border-b border-softline py-4 font-mono text-2xl uppercase tracking-[0.04em] transition-colors ${
                      section === s.id ? "text-copperb" : "text-ink hover:text-copperb"
                    }`}
                  >
                    <span className="text-sm text-copper">{s.num}</span>
                    {s.label}
                    {section === s.id && (
                      <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-faint">
                        CURRENT
                      </span>
                    )}
                  </motion.a>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-faint"
              >
                <p>{CONTACT.email}</p>
                <p>Anthiyur, Erode — IST</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
