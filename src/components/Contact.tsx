import { useState, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowUp, Check, Copy, Download, ExternalLink, Mail, Phone } from "lucide-react";
import { CONTACT } from "../lib/content";
import { useApp } from "../lib/store";
import { Reveal, Wrap } from "./Section";
import { MiniGear } from "./Gear";

function Magnetic({ children }: { children: ReactNode }) {
  const x = useSpring(0, { stiffness: 220, damping: 16 });
  const y = useSpring(0, { stiffness: 220, damping: 16 });
  return (
    <motion.div
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.24);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

const btnBase =
  "inline-flex items-center gap-2 border px-5 py-3 font-mono text-[12px] tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";

export default function Contact() {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    showToast("EMAIL COPIED TO CLIPBOARD");
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="pb-12 pt-24 md:pt-28">
      <Wrap>
        <Reveal>
          <div className="brackets relative overflow-hidden border border-bline border-t-2 border-t-copper bg-[rgba(18,49,82,0.5)] backdrop-blur-md">
            {/* gear watermark */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 opacity-[0.35]" aria-hidden>
              <MiniGear size={240} dur={70} sw={0.5} className="text-bline" />
            </div>

            <div className="relative px-6 py-12 text-center md:px-10 md:py-14">
              <div className="eyebrow mb-3">§ 05 — Get In Touch</div>
              <h2 className="font-mono text-[clamp(28px,5vw,44px)] font-bold uppercase text-ink">
                Let&apos;s Build Something<span className="text-copperb">.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[54ch] text-[14.5px] leading-relaxed text-dim">
                Open to entry-level roles and opportunities to gain practical experience —
                or a conversation about IC engines, hydraulics and pneumatics.
              </p>

              <div className="mt-6 inline-flex items-center gap-2.5 border border-softline px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inset-0 rounded-full bg-copperb"
                    style={{ animation: "pingSoft 1.8s cubic-bezier(0,0,0.2,1) infinite" }}
                  />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-copperb" />
                </span>
                Open to opportunities · Ganapathy, Coimbatore — IST
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    data-cad="EMAIL"
                    aria-label="Send an email to Kavin Vishnu"
                    className={`${btnBase} border-copper bg-copper font-semibold text-navy-900 hover:bg-copperb hover:shadow-[0_8px_22px_rgba(230,168,104,0.35)]`}
                  >
                    <Mail size={14} /> Email Me
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cad="LINKEDIN"
                    aria-label="View LinkedIn profile"
                    className={`${btnBase} border-bline text-ink hover:border-copperb hover:text-copperb hover:shadow-[0_8px_22px_rgba(205,131,71,0.15)]`}
                  >
                    <ExternalLink size={14} /> LinkedIn
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    data-cad="CALL"
                    aria-label="Call Kavin Vishnu"
                    className={`${btnBase} border-bline text-ink hover:border-copperb hover:text-copperb hover:shadow-[0_8px_22px_rgba(205,131,71,0.15)]`}
                  >
                    <Phone size={14} /> Call Me
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={CONTACT.resume}
                    download
                    data-cad="DOWNLOAD"
                    aria-label="Download resume PDF"
                    className={`${btnBase} border-bline text-ink hover:border-copperb hover:text-copperb hover:shadow-[0_8px_22px_rgba(205,131,71,0.15)]`}
                  >
                    <Download size={14} /> Resume
                  </a>
                </Magnetic>
              </div>

              <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-faint">
                <span className="tracking-[0.04em]">{CONTACT.email}</span>
                <button
                  onClick={copyEmail}
                  data-cad="COPY"
                  className={`flex items-center gap-1.5 border px-2 py-1 text-[10px] uppercase tracking-[0.12em] transition-colors ${
                    copied
                      ? "border-copper text-copperb"
                      : "border-softline hover:border-copperb hover:text-copperb"
                  }`}
                >
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* footer strip */}
        <div className="mb-10 mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-softline pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          <span>© {new Date().getFullYear()} Kavin Vishnu S — Rev A</span>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cad="DATUM"
            className="group flex items-center gap-1.5 transition-colors hover:text-copperb"
          >
            Return to datum
            <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </Wrap>
    </footer>
  );
}
