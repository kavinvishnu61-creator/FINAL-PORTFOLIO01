import { CONTACT } from "../lib/content";
import { Reveal, SectionHead, Wrap } from "./Section";

const SPECS: { k: string; v: string; href?: string }[] = [
  { k: "Education", v: "B.E. Mechanical Engineering, GCE Erode" },
  { k: "Role", v: "Product & Service Engineer" },
  { k: "Experience", v: "1.5 Years" },
  { k: "Company", v: "Cherry Precision Products" },
  { k: "Phone", v: "7867846661", href: `tel:${CONTACT.phone}` },
  { k: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { k: "Location", v: "Ganapathy, Coimbatore" },
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
              is a Mechanical Engineer with a B.E. in Mechanical Engineering from Government College 
              of Engineering, Erode, and hands-on experience supporting product performance and 
              customer-facing service engineering in a precision manufacturing environment.
            </p>

            <div className="my-6 border-l-2 border-copper bg-[rgba(18,49,82,0.45)] px-5 py-4 font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.05em] text-copperb">
              Bridging design intent with real-world product performance.
            </div>

            <p className="mb-5 max-w-[54ch] text-[15.5px] leading-relaxed text-dim">
              Currently working as a <strong className="font-semibold text-ink">Product and Service Engineer at Cherry Precision Products</strong>
              , focused on bridging design intent with real-world product performance — supporting product 
              issues, coordinating fixes, and feeding field learnings back into engineering.
            </p>
            <p className="max-w-[54ch] text-[15.5px] leading-relaxed text-dim">
              Background includes practical exposure to{" "}
              <strong className="font-semibold text-ink">
                CNC operations, AutoCAD, SolidWorks, and CATIA
              </strong>
              , along with in-plant training and hands-on workshops. Primary
              areas of interest:{" "}
              <strong className="font-semibold text-ink">
                IC engines, hydraulics, and pneumatics.
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

            </div>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
