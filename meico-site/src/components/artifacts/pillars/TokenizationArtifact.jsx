import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../../hooks/useReducedMotion.js'

/**
 * Tokenization — asset hex centre, 8 sectors orbiting. Each piece is
 * individually hoverable: hover a sector to brighten it + brighten its
 * inbound token-fragment trail. Hover the centre asset hex to bloom
 * the whole grid. Works on mobile via pointer events.
 */

const SECTORS = [
  'AGRI', 'MFG', 'TRADE', 'EDU',
  'REAL ESTATE', 'ENERGY', 'PUBLIC', 'FINANCE',
]

export default function TokenizationArtifact({ c1 = '#60A5FA', c2 = '#818CF8' }) {
  const reduced = useReducedMotionPreference()
  const [hover, setHover] = useState(null)
  const [centerHover, setCenterHover] = useState(false)
  const W = 720, H = 460
  const cx = W / 2, cy = H / 2
  const R = 175

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="t-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id="t-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="t-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Orbit guide — brightens when centre is hovered */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke={centerHover ? c1 : 'rgba(96,165,250,0.18)'}
        strokeOpacity={centerHover ? 0.45 : 1}
        strokeWidth="1"
        strokeDasharray="2 5"
        style={{ transition: 'stroke 0.4s ease, stroke-opacity 0.4s ease' }}
      />

      {/* Centre asset hex */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation', transformOrigin: `${cx}px ${cy}px` }}
        onPointerEnter={() => setCenterHover(true)}
        onPointerLeave={() => setCenterHover(false)}
        onPointerDown={() => setCenterHover(true)}
      >
        <motion.polygon
          points={`${cx},${cy-50} ${cx+44},${cy-25} ${cx+44},${cy+25} ${cx},${cy+50} ${cx-44},${cy+25} ${cx-44},${cy-25}`}
          fill="url(#t-grad)"
          animate={
            reduced
              ? { scale: centerHover ? 1.08 : 1 }
              : { scale: centerHover ? [1.05, 1.10, 1.05] : [1, 1.04, 1] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          filter={centerHover ? 'url(#t-glow-strong)' : 'url(#t-glow)'}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="500" fill="#FFFFFF" letterSpacing="-0.02em" pointerEvents="none">ASSET</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="rgba(255,255,255,0.75)" pointerEvents="none">ON-CHAIN</text>
      </g>

      {/* Sector nodes around the ring — each independently hoverable */}
      {SECTORS.map((label, i) => {
        const a = -Math.PI / 2 + (2 * Math.PI / SECTORS.length) * i
        const x = cx + R * Math.cos(a)
        const y = cy + R * Math.sin(a)
        const isHover = hover === i
        const pts = []
        for (let k = 0; k < 6; k++) {
          const ang = (Math.PI / 3) * k - Math.PI / 2
          pts.push(`${(x + 26 * Math.cos(ang)).toFixed(2)},${(y + 26 * Math.sin(ang)).toFixed(2)}`)
        }

        return (
          <g
            key={label}
            style={{ cursor: 'pointer', touchAction: 'manipulation', transformOrigin: `${x}px ${y}px` }}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onPointerDown={() => setHover(i)}
          >
            {/* Halo on hover */}
            <motion.circle
              cx={x} cy={y} r="40"
              fill={c1}
              opacity={isHover ? 0.22 : 0}
              animate={{ opacity: isHover ? 0.22 : 0 }}
              transition={{ duration: 0.35 }}
              filter="url(#t-glow-strong)"
            />
            <motion.polygon
              points={pts.join(' ')}
              fill="rgba(15, 31, 66, 0.92)"
              stroke={isHover ? c1 : c2}
              strokeWidth={isHover ? 1.6 : 1.1}
              animate={{ scale: isHover ? 1.14 : 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${x}px ${y}px`, filter: isHover ? 'brightness(1.15)' : 'none' }}
            />
            <text
              x={x} y={y + 4}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="0.16em"
              fill={isHover ? '#FFFFFF' : '#E0E7FF'}
              pointerEvents="none"
              style={{ transition: 'fill 0.3s ease' }}
            >
              {label}
            </text>

            {/* Travelling token fragment — centre → sector. Brighter on hover */}
            {!reduced && (
              <motion.circle
                r={isHover ? 3.6 : 2.6}
                fill={isHover ? '#FFFFFF' : c1}
                filter="url(#t-glow-strong)"
                initial={{ cx, cy, opacity: 0 }}
                animate={{ cx: [cx, x], cy: [cy, y], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.6,
                  times: [0, 0.15, 0.85, 1],
                  repeat: Infinity,
                  delay: i * 0.32,
                  ease: 'easeInOut',
                }}
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
