import { CONTACT } from "../lib/content";
import { Reveal, SectionHead, Wrap } from "./Section";

const SPECS: { k: string; v: string; href?: string }[] = [
  { k: "Education", v: "B.E. Mechanical (7.0 CGPA)" },
  { k: "Role", v: "Mechanical Engineer" },
  { k: "HSC", v: "GBHSS, Anthiyur (72%)" },
  { k: "SSLC", v: "GHS, Thavittupalayam (52%)" },
  { k: "Phone", v: CONTACT.phonePretty, href: `tel:${CONTACT.phone}` },
  { k: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { k: "Location", v: "Anthiyur, Erode Dt." },
  { k: "Interests", v: "IC Engines · Hydraulics · Pneumatics" },
];

export default function About() {
  return (
    <section id="about" className="border-b border-softline py-24 md:py-28">
      <Wrap>
        <SectionHead num="01" title="About" sub="// OPERATOR MANUAL" />

        <div className="grid gap-12 lg:grid-cols-[1.28fr_1fr] lg:gap-14">
          <Reveal>
            <p className="mb-5 max-w-[54ch] text-[15.5px] leading-relaxed text-dim">
              <strong className="font-semibold text-ink">Kavin Vishnu S</strong>{" "}
              is a passionate and hardworking Mechanical Engineer with a B.E. in Mechanical 
              Engineering from Government College of Engineering, Erode. Looking to gain 
              practical experience, solve real-world problems and learn from industry experts.
            </p>

            <div className="my-6 border-l-2 border-copper bg-[rgba(18,49,82,0.45)] px-5 py-4 font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.05em] text-copperb">
              Solving real-world problems through practical engineering.
            </div>

            <p className="mb-5 max-w-[54ch] text-[15.5px] leading-relaxed text-dim">
              Completed academic project in{" "}
              <strong className="font-semibold text-ink">
                Energy Conservation and Auditing at Ponni Sugars
              </strong>
              , where a pressure transmitter-based control was implemented in a fly ash 
              handling system, saving 120+ units of electricity per day.
            </p>
            <p className="max-w-[54ch] text-[15.5px] leading-relaxed text-dim">
              Background includes practical exposure to{" "}
              <strong className="font-semibold text-ink">
                CNC operations, AutoCAD, SolidWorks and CATIA
              </strong>
              , backed by in-plant training at TNSTC and Electric Loco Shed. Primary
              areas of interest:{" "}
              <strong className="font-semibold text-ink">
                IC engines, hydraulics and pneumatics.
              </strong>
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="border-t border-softline pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                Quick Spec
              </div>
              <div className="mt-3">
                {SPECS.map((s) => (
                  <div key={s.k} className="specrow">
                    <div className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-copperb">
                      {s.k}
                    </div>
                    <div className="px-4 py-3 text-[13.5px] text-ink">
                      {s.href ? (
                        <a
                          href={s.href}
                          data-cad={s.k === "Email" ? "EMAIL" : "CALL"}
                          className="text-copperb transition-opacity hover:opacity-75 hover:underline"
                        >
                          {s.v}
                        </a>
                      ) : (
                        s.v
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* figure plate */}
              <figure className="group mt-7 border border-dashed border-bline bg-[rgba(28,67,112,0.22)] p-2">
                <div className="relative overflow-hidden">
                  <img
                    src="/images/about-figure.png"
                    alt="Blueprint style exploded view of mechanical components rendered in copper line-art"
                    loading="lazy"
                    className="aspect-[16/10] w-full scale-[1.08] object-cover opacity-90 brightness-[0.95] transition duration-700 group-hover:scale-[1.14] group-hover:opacity-100"
                  />
                  <div className="scanline" />
                </div>
                <figcaption className="flex items-center justify-between px-1 pb-1 pt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                  <span>FIG. 02 — Component Explode</span>
                  <span>Scale 1:2</span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
