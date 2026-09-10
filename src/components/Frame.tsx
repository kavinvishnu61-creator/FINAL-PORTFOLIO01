/**
 * Fixed drawing-sheet border with corner registration crosses and
 * margin annotations — the page reads as one plotted sheet.
 */
export default function Frame() {
  const corners = [
    { top: 12, left: 12 },
    { top: 12, right: 12 },
    { bottom: 12, left: 12 },
    { bottom: 12, right: 12 },
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[40] select-none">
      <div className="absolute inset-3 border border-softline" />

      {/* corner registration crosses */}
      {corners.map((c, i) => (
        <span key={i} className="absolute" style={c}>
          <span className="absolute left-1/2 top-1/2 h-px w-[22px] -translate-x-1/2 -translate-y-1/2 bg-bline/80" />
          <span className="absolute left-1/2 top-1/2 h-[22px] w-px -translate-x-1/2 -translate-y-1/2 bg-bline/80" />
        </span>
      ))}

      {/* margin annotations */}
      <span className="absolute left-8 top-3 -translate-y-1/2 bg-navy-900 px-2 font-mono text-[9px] tracking-[0.28em] text-faint">
        KV · PORTFOLIO — 2025
      </span>
      <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 translate-x-1/2 -rotate-90 bg-navy-900 px-2 font-mono text-[9px] tracking-[0.32em] text-faint md:block">
        DO NOT SCALE DRAWING
      </span>
    </div>
  );
}
