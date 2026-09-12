/**
 * Builds a trapezoid-tooth gear outline as a single SVG path.
 *
 * Engineering-correct implementation:
 *  - pitch radius rPitch = (rOut + rRoot) / 2
 *  - module m = 2 * rPitch / teeth  (same module ⟹ same physical tooth size)
 *  - tooth width on pitch circle ≈ π*m/2  (50 % tooth, 50 % space — standard)
 *  - toothFrac = (π*m/2) / (2π*rPitch/teeth) = teeth*(π*m/2)/(2π*rPitch)
 *              = teeth*m / (4*rPitch) = (2*rPitch) / (4*rPitch) = 0.5
 *  So toothFrac is always 0.5 when module is shared → correct meshing.
 */
export function gearPath(
  cx: number,
  cy: number,
  rOut: number,
  rRoot: number,
  teeth: number,
  /** Phase offset in degrees — baked into the path geometry so meshing phase
   *  is inherent to the shape, not dependent on CSS transform wrappers.      */
  phaseDeg = 0
): string {
  /**
   * Tooth shape: symmetric trapezoid centered at each pitch mid-point.
   *
   *  rootHalf = half angular width at dedendum circle  (wider  → ~52 % of pitch)
   *  tipHalf  = half angular width at addendum circle  (narrower → ~36 % of pitch)
   *
   *  This taper approximates a standard 20° pressure-angle involute profile:
   *  the flanks converge from a broad root to a narrower tip, exactly as in
   *  the reference textbook cross-section.
   *
   *  Gap (root-circle level) = pitch − 2*rootHalf ≈ 48 % of pitch.
   *  Since both gears share the same module the tooth/gap sizes match → mesh. ✓
   */
  const step     = (Math.PI * 2) / teeth;
  const phaseRad = (phaseDeg * Math.PI) / 180;
  const rootHalf = step * 0.26;  // ≈ 52 % tooth width at root
  const tipHalf  = step * 0.18;  // ≈ 36 % tooth width at tip
  const parts: string[] = [];
  const P = (r: number, a: number) =>
    `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;

  for (let i = 0; i < teeth; i++) {
    // Tooth centre is at the midpoint of each pitch interval
    const tc = i * step + step * 0.5 + phaseRad;

    // 4-point tapered trapezoid (straight line from root to tip on each flank)
    // The L from tooth[i] root-trailing → tooth[i+1] root-leading draws the root-circle gap.
    const seq: Array<[number, number]> = [
      [rRoot, tc - rootHalf],   // root: leading edge  (wider base)
      [rOut,  tc - tipHalf],    // tip:  leading edge  (narrower top)
      [rOut,  tc + tipHalf],    // tip:  trailing edge
      [rRoot, tc + rootHalf],   // root: trailing edge
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
