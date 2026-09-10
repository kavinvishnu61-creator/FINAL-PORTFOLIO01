import { useApp } from "../lib/store";
import { SECTIONS } from "../lib/content";

/** Fixed sheet-index rail on the left edge (xl+). */
export default function SideRail() {
  const { section } = useApp();

  return (
    <div className="fixed left-7 top-1/2 z-[45] hidden -translate-y-1/2 flex-col gap-3.5 xl:flex">
      {SECTIONS.map((s) => {
        const active = section === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cad={s.label}
            aria-label={s.label}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`h-px transition-all duration-300 ${
                active ? "w-8 bg-copperb" : "w-4 bg-faint/50 group-hover:w-6 group-hover:bg-dim"
              }`}
            />
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-300 ${
                active
                  ? "text-copperb opacity-100"
                  : "text-faint opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.num} {s.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
