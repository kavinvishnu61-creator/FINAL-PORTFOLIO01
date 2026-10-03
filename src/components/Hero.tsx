import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useApp } from "../lib/store";
import { EASE } from "../lib/anim";
import { GearsFigure } from "./Gear";
import { Wrap } from "./Section";

const FINAL_TEXT =
  "Passionate and hardworking mechanical engineer looking to gain practical experience, solve real world problems and learn from industry experts.";

const TITLE_BLOCK: { k: string; v: string; href?: string }[] = [
  { k: "Drawn By", v: "Kavin Vishnu S" },
  { k: "Discipline", v: "Mechanical Eng." },
  { k: "Title", v: "Product & Service Engineer" },
  { k: "Contact", v: "7867846661", href: `tel:7867846661` },
];

function Fade({
  booted,
  d = 0,
  className = "",
  children,
}: {
  booted: boolean;
  d?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.85, delay: d, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { booted } = useApp();
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!booted) return;
    let i = 0;
    let timer = 0;
    const stepFn = () => {
      i += 1;
      setTyped(FINAL_TEXT.slice(0, i));
      if (i < FINAL_TEXT.length) {
        const ch = FINAL_TEXT[i - 1];
        const d = ch === "," || ch === "—" ? 110 : 11 + Math.random() * 24;
        timer = window.setTimeout(stepFn, d);
      } else {
        setTypingDone(true);
      }
    };
    timer = window.setTimeout(stepFn, 300);
    return () => window.clearTimeout(timer);
  }, [booted]);

  return (
    <header id="home" className="relative">
      <Wrap className="pb-16 pt-[128px] md:pt-[148px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          {/* left: name + tagline */}
          <div>
            <Fade booted={booted} d={0}>
              <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                <span className="inline-block h-1.5 w-1.5 rotate-45 border border-copperb" />
                Portfolio — Mechanical Engineer
                <span className="h-px flex-1 bg-softline" />
              </div>
            </Fade>

            <Fade booted={booted} d={0.08}>
              <h1 className="font-mono text-[clamp(44px,7.4vw,88px)] font-bold uppercase leading-[1.02] tracking-[0.01em] text-ink">
                Kavin
                <br />
                Vishnu<span className="mr-1 text-copperb">.</span>
                <span className="anim-blink text-copper" aria-hidden>
                  _
                </span>
              </h1>
            </Fade>

            <Fade booted={booted} d={0.16}>
              <p className="mt-6 min-h-[90px] max-w-[560px] text-[16.5px] leading-relaxed text-dim md:text-lg">
                {typingDone ? (
                  <>
                    Passionate and hardworking mechanical engineer looking to gain{" "}
                    <strong className="font-semibold text-ink">
                      practical experience
                    </strong>
                    , solve real world problems and learn from industry experts.
                  </>
                ) : (
                  <>
                    {typed}
                    <span className="anim-blink text-copper">_</span>
                  </>
                )}
              </p>
            </Fade>

            <Fade booted={booted} d={0.3} className="lg:hidden">
              <div className="mx-auto mt-4 max-w-[360px]">
                <GearsFigure />
              </div>
            </Fade>
          </div>

          {/* right: gear drawing */}
          <Fade booted={booted} d={0.34} className="hidden lg:block">
            <GearsFigure />
          </Fade>
        </div>

        {/* dimension line */}
        <Fade booted={booted} d={0.7}>
          <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-faint sm:text-xs">
            <span className="text-sm text-copper">←</span>
            <span className="dim-rule hidden sm:block" />
            <span className="tracking-[0.08em]">
              B.E. Mechanical Engineering – 1.5 Yrs Industry Experience
            </span>
            <span className="dim-rule hidden sm:block" />
            <span className="text-sm text-copper">→</span>
          </div>
        </Fade>

        {/* title block */}
        <Fade booted={booted} d={0.85}>
          <div className="mt-9 border border-bline border-b-2 border-b-copper bg-[rgba(18,49,82,0.6)] backdrop-blur-md">
            <div className="grid grid-cols-2 gap-px bg-softline md:grid-cols-4 xl:grid-cols-4">
              {TITLE_BLOCK.map((c) => (
                <div key={c.k} className="tbcell bg-[rgba(18,49,82,0.55)] px-4 py-4">
                  <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                    {c.k}
                  </div>
                  <div className="break-words font-mono text-[12.5px] font-medium text-ink">
                    {c.href ? (
                      <a href={c.href} data-cad="CALL" className="transition-colors hover:text-copperb">
                        {c.v}
                      </a>
                    ) : (
                      c.v
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        {/* scroll cue */}
        <Fade booted={booted} d={1.1}>
          <a
            href="#about"
            data-cad="SCROLL"
            className="group mt-12 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-faint transition-colors hover:text-copperb"
          >
            <ChevronDown size={14} className="anim-bob text-copperb" />
            Scroll to inspect
          </a>
        </Fade>
      </Wrap>
    </header>
  );
}
