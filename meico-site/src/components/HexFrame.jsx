/**
 * HexFrame — the MEICO brand motif as a reusable component.
 *
 * Wraps children in a hexagonal mask with a glowing electric border drawn
 * in SVG so the line is crisp at every size and tinted by accent.
 *
 * Props:
 *   size     — pixel size (square). Default 96.
 *   accent   — hex colour for the border + glow.
 *   filled   — if true, fills the hex with a translucent accent wash.
 *   children — typically an <img> or icon to render inside.
 */
export default function HexFrame({
  size = 96,
  accent = '#3B82F6',
  filled = false,
  children,
  className = '',
}) {
  // Hexagon points for a pointy-top hex of size×size
  const w = size
  const h = size
  const pts = [
    [w * 0.5, 0],
    [w, h * 0.25],
    [w, h * 0.75],
    [w * 0.5, h],
    [0, h * 0.75],
    [0, h * 0.25],
  ]
  const polyPoints = pts.map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: w, height: h }}
    >
      {/* SVG outline + glow */}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <defs>
          <filter id={`hexglow-${size}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {filled && (
          <polygon
            points={polyPoints}
            fill={accent}
            fillOpacity={0.10}
          />
        )}
        <polygon
          points={polyPoints}
          fill="none"
          stroke={accent}
          strokeWidth={1.4}
          strokeLinejoin="round"
          filter={`url(#hexglow-${size})`}
          opacity={0.85}
        />
        {/* Inner hairline echo for depth */}
        <polygon
          points={pts.map(([x, y]) => `${x * 0.92 + w * 0.04},${y * 0.92 + h * 0.04}`).join(' ')}
          fill="none"
          stroke={accent}
          strokeWidth={0.5}
          strokeLinejoin="round"
          opacity={0.25}
        />
      </svg>
      {/* Content centred */}
      <div className="relative z-10 flex items-center justify-center" style={{ width: w * 0.6, height: h * 0.6 }}>
        {children}
      </div>
    </div>
  )
}
