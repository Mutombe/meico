/**
 * SectionSeam — a *whisper-quiet* transition between sections.
 *
 * Just a soft, blurred multi-tint wash that fades to nothing on both
 * edges. No waves. No animation. No structure. Its only job is to keep
 * neighbouring sections from showing a hard cut where they meet.
 *
 * The `variant` prop is kept for API compatibility with existing call
 * sites but is intentionally ignored — every seam looks the same now.
 */
export default function SectionSeam({ palette = ['#3B82F6'], height = 70 }) {
  const [c1, c2 = c1, c3 = c1] = palette

  return (
    <div
      aria-hidden
      className="relative w-full pointer-events-none select-none"
      style={{
        height,
        marginTop:    -Math.round(height * 0.5),
        marginBottom: -Math.round(height * 0.5),
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, #000 50%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, #000 50%, transparent 100%)',
        zIndex: 0,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 100% at 30% 50%, ${c1}1F 0%, transparent 70%),
            radial-gradient(ellipse 60% 100% at 70% 50%, ${c2}1A 0%, transparent 70%),
            radial-gradient(ellipse 40% 100% at 50% 50%, ${c3}12 0%, transparent 75%)
          `,
          filter: 'blur(24px)',
        }}
      />
    </div>
  )
}
