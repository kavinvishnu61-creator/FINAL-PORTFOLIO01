/** Builds a trapezoid-tooth cog outline as a single SVG path. */
export function gearPath(
  cx: number,
  cy: number,
  rOut: number,
  rRoot: number,
  teeth: number
): string {
  const step = (Math.PI * 2) / teeth;
  const parts: string[] = [];
  const P = (r: number, a: number) =>
    `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;

  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const seq: Array<[number, number]> = [
      [rRoot, a],
      [rRoot, a + step * 0.16],
      [rOut, a + step * 0.32],
      [rOut, a + step * 0.52],
      [rRoot, a + step * 0.68],
      [rRoot, a + step * 0.86],
    ];
    seq.forEach(([r, ang], j) => {
      parts.push(`${i === 0 && j === 0 ? "M" : "L"}${P(r, ang)}`);
    });
  }
  return parts.join("") + "Z";
}

/** Polar → cartesian helper for gear adornments. */
export function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
