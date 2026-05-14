import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * HexConic — the MEICO hero centrepiece.
 *
 *  · An outlined hexagon (1.25px brass at 40% opacity).
 *  · Inside, a conic gradient sweep (electric → cyan → brass) rotating
 *    at 32s/cycle (the `spin-slow` keyframe), heavily blurred so it
 *    reads as ambient light rather than a hard pinwheel.
 *  · A wider orbit ring (dashed brass hairline) counter-rotating, with
 *    three glowing nodes that orbit with it.
 *  · The whole composition rotates ¼ turn over the page's first 800px
 *    of scroll (parallax) for that "the chain is in motion" feel.
 *
 * Designed to sit right-of-centre on the hero, overlapping the H1 by
 * about 80px. Size 720px on desktop, scales down to 420 on mobile.
 */

export default function HexConic({ size = 720, palette }) {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, [0, 800], [0, 90])

  const colors = palette || ['#3B82F6', '#22D3EE', '#E9C063', '#8B5CF6', '#3B82F6']
  const conic = `conic-gradient(from 0deg, ${colors.join(', ')})`

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size, rotate }}
      className="relative pointer-events-none select-none"
      aria-hidden
    >
      {/* === Orbit ring — dashed, counter-rotating ============== */}
      <div
        className="absolute inset-0 spin-rev"
        style={{
          width: '100%', height: '100%',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50" cy="50" r="49"
            fill="none"
            stroke="rgba(233, 192, 99, 0.30)"
            strokeWidth="0.18"
            strokeDasharray="0.4 0.8"
          />
          {/* Three orbit nodes */}
          {[0, 120, 240].map((deg, i) => {
            const r = 49
            const x = 50 + r * Math.cos((deg - 90) * Math.PI / 180)
            const y = 50 + r * Math.sin((deg - 90) * Math.PI / 180)
            return (
              <g key={i}>
                <circle
                  cx={x} cy={y} r={0.9}
                  fill={i === 0 ? '#E9C063' : i === 1 ? '#22D3EE' : '#3B82F6'}
                />
                <circle
                  cx={x} cy={y} r={2.5}
                  fill={i === 0 ? '#E9C063' : i === 1 ? '#22D3EE' : '#3B82F6'}
                  opacity="0.18"
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* === Hex silhouette — outline + conic gradient inside === */}
      <div className="absolute inset-[8%]">
        {/* Outline (SVG hex polygon, 1.25px brass at 40%) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="hex-outline-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polygon
            points="50,2 95,26 95,74 50,98 5,74 5,26"
            fill="none"
            stroke="rgba(233, 192, 99, 0.45)"
            strokeWidth="0.22"
            strokeLinejoin="round"
            filter="url(#hex-outline-glow)"
          />
        </svg>

        {/* Conic gradient sweep — clipped to hex, rotating, blurred */}
        <div className="absolute inset-0 hex overflow-hidden">
          <div
            className="absolute inset-[-30%] spin-slow"
            style={{
              background: conic,
              filter: 'blur(48px) saturate(1.25)',
              opacity: 0.85,
              willChange: 'transform',
            }}
          />
          {/* Inner darkening — keeps centre quieter so it reads as light, not a pinwheel */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(6, 13, 32, 0.55) 0%, transparent 65%)',
            }}
          />
        </div>

        {/* Inner echo hex (hairline, slightly smaller) for refinement */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <polygon
            points="50,10 87,30 87,70 50,90 13,70 13,30"
            fill="none"
            stroke="rgba(233, 192, 99, 0.18)"
            strokeWidth="0.14"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Outer halo — soft brass+electric glow outside the hex */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59, 130, 246, 0.25), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  )
}
