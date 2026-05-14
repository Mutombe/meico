import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/**
 * DonutChart — a cinematic, interactive donut.
 *
 *   · Stroke-draws each segment in sequence when scrolled into view.
 *   · Hovering a segment (or its legend row) pulls it outward and
 *     thickens its stroke, with a coloured drop-shadow halo.
 *   · The centre label cross-fades between the default ("1B / MAX SUPPLY")
 *     and the hovered segment ("Token Sale Program / 36%").
 *
 * Props:
 *   data    — [{ label, pct, hex }]
 *   title   — small panel title
 *   kicker  — eyebrow above the title (e.g. "Token allocation")
 *   kickerColor — accent hex for the eyebrow
 *   center  — { label, value } for the un-hovered state
 */
export default function DonutChart({
  data,
  title,
  kicker,
  kickerColor = '#60A5FA',
  center = { label: 'MAX SUPPLY', value: '1B' },
  size = 280,
  thickness = 38,
}) {
  const [hover, setHover] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  // Reserve room around the donut for hover-explosion (segments grow ~10px)
  const r = (size - thickness - 24) / 2
  const c = 2 * Math.PI * r

  // Pre-compute each segment's geometry once
  const segments = useMemo(() => {
    let cumulative = 0
    return data.map((seg, i) => {
      const dash = (seg.pct / 100) * c
      const gap = c - dash
      const offset = -(cumulative / 100) * c
      cumulative += seg.pct
      return { ...seg, i, dash, gap, offset }
    })
  }, [data, c])

  const hoveredSegment = hover !== null ? segments[hover] : null

  return (
    <div ref={ref} className="glass clip-corner p-7 md:p-9">
      {kicker && (
        <p className="mono text-[0.62rem]" style={{ color: kickerColor }}>
          — {kicker}
        </p>
      )}
      {title && <h2 className="display-md text-paper mt-3">{title}</h2>}

      <div className="mt-7 grid sm:grid-cols-[280px_1fr] gap-7 items-center">
        {/* Donut */}
        <div
          className="relative mx-auto"
          style={{ width: size, height: size }}
        >
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            className="block"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {segments.map((s) => (
                <filter
                  key={`f-${s.i}`}
                  id={`glow-${s.i}-${kickerColor.replace('#', '')}`}
                  x="-30%" y="-30%" width="160%" height="160%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {/* Faint track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgba(96, 165, 250, 0.07)"
              strokeWidth={thickness}
            />

            {/* Segments — animated stroke-draw + hover explode */}
            {segments.map((seg) => {
              const isHover = hover === seg.i
              return (
                <motion.circle
                  key={seg.i}
                  cx={size / 2}
                  cy={size / 2}
                  fill="none"
                  stroke={seg.hex}
                  strokeLinecap="butt"
                  initial={false}
                  animate={{
                    r: isHover ? r + 8 : r,
                    strokeWidth: isHover ? thickness + 6 : thickness,
                    strokeDasharray: inView
                      ? `${seg.dash} ${seg.gap}`
                      : `0 ${c}`,
                  }}
                  transition={{
                    r:            { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    strokeWidth:  { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    strokeDasharray: {
                      duration: 1.2,
                      delay: 0.1 + seg.i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  style={{
                    strokeDashoffset: seg.offset,
                    transform: `rotate(-90deg)`,
                    transformOrigin: `${size / 2}px ${size / 2}px`,
                    cursor: 'pointer',
                    filter: isHover ? `drop-shadow(0 0 14px ${seg.hex})` : 'none',
                  }}
                  onMouseEnter={() => setHover(seg.i)}
                  onMouseLeave={() => setHover(null)}
                />
              )
            })}
          </svg>

          {/* Centre label — cross-fades between default + hovered segment */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <AnimatePresence mode="wait" initial={false}>
              {hoveredSegment ? (
                <motion.div
                  key={`h-${hoveredSegment.i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="leading-tight"
                >
                  <p
                    className="mono text-[0.55rem] tracking-[0.22em]"
                    style={{ color: hoveredSegment.hex }}
                  >
                    {hoveredSegment.label.toUpperCase()}
                  </p>
                  <p
                    className="mt-1 font-display tabular-nums"
                    style={{ fontSize: 56, fontWeight: 500, color: hoveredSegment.hex, letterSpacing: '-0.02em' }}
                  >
                    {hoveredSegment.pct}
                    <span style={{ fontSize: 28, opacity: 0.7 }}>%</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="leading-tight"
                >
                  <p className="mono text-paper-mid text-[0.55rem] tracking-[0.22em]">
                    {center.label}
                  </p>
                  <p
                    className="mt-1 font-display text-brass-400 tabular-nums"
                    style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.02em' }}
                  >
                    {center.value}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Legend — synced to donut hover */}
        <ul className="space-y-1">
          {segments.map((seg) => {
            const isHover = hover === seg.i
            return (
              <li
                key={seg.i}
                onMouseEnter={() => setHover(seg.i)}
                onMouseLeave={() => setHover(null)}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-300"
                style={{
                  background: isHover ? `${seg.hex}14` : 'transparent',
                  transform: isHover ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                <span
                  className="block shrink-0 transition-all duration-300"
                  style={{
                    width: isHover ? 18 : 12,
                    height: isHover ? 18 : 12,
                    borderRadius: 3,
                    background: seg.hex,
                    boxShadow: isHover ? `0 0 12px ${seg.hex}` : 'none',
                  }}
                />
                <span
                  className="flex-1 text-[14px] transition-colors duration-300"
                  style={{ color: isHover ? '#F2F4FA' : '#C8CFE0' }}
                >
                  {seg.label}
                </span>
                <span
                  className="mono tabular-nums text-[0.68rem] transition-colors duration-300"
                  style={{ color: isHover ? seg.hex : '#F2F4FA' }}
                >
                  {seg.pct}%
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
