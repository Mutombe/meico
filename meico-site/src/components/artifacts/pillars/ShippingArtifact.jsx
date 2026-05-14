import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../../hooks/useReducedMotion.js'

/**
 * Shipping — 3 waypoints (ORIGIN → HUB → PORT). Each waypoint is
 * independently hoverable. Hovering brightens the leg of the route
 * entering it, scales the node, and reveals a sub-label.
 */

export default function ShippingArtifact({ c1 = '#34D399', c2 = '#10B981' }) {
  const reduced = useReducedMotionPreference()
  const [hover, setHover] = useState(null) // 0 | 1 | 2
  const W = 720, H = 440

  const wp = [
    { x: 90,  y: 240, label: 'ORIGIN', sub: 'Warehouse' },
    { x: 360, y: 170, label: 'HUB',    sub: 'Cross-dock' },
    { x: 630, y: 250, label: 'PORT',   sub: 'Vessel' },
  ]

  const path = `M ${wp[0].x} ${wp[0].y} Q ${(wp[0].x+wp[1].x)/2} ${wp[1].y - 30}, ${wp[1].x} ${wp[1].y} T ${wp[2].x} ${wp[2].y}`
  const reversePath = `M ${wp[2].x} ${wp[2].y + 50} Q ${(wp[0].x+wp[2].x)/2} ${wp[1].y + 80}, ${wp[0].x} ${wp[0].y + 50}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="s-grad" x1="0" x2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id="s-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="s-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <motion.path
        d={path}
        fill="none"
        stroke="url(#s-grad)"
        strokeWidth={hover !== null ? 1.8 : 1.4}
        strokeDasharray="3 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, strokeWidth: hover !== null ? 1.8 : 1.4 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      <path d={reversePath} fill="none" stroke="rgba(233,192,99,0.35)" strokeWidth="1" strokeDasharray="2 5" />

      <text x={W/2} y={120} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="rgba(52,211,153,0.85)">
        GOODS  →  ON CHAIN
      </text>
      <text x={W/2} y={360} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="rgba(233,192,99,0.75)">
        ←  SETTLEMENT  ·  PROOF OF DELIVERY
      </text>

      {!reduced && [0, 0.5, 1].map((delay, i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.g
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 5.2, repeat: Infinity, delay: delay * 1.7, ease: 'linear' }}
            style={{ offsetPath: `path("${path}")`, offsetRotate: '0deg' }}
          >
            <g transform="translate(-14,-10)">
              <rect width="28" height="20" rx="2" fill={c2} stroke={c1} strokeWidth="1" filter="url(#s-glow)" />
              <rect x="3" y="3" width="3" height="14" fill="rgba(0,0,0,0.25)" />
              <rect x="9" y="3" width="3" height="14" fill="rgba(0,0,0,0.25)" />
              <rect x="15" y="3" width="3" height="14" fill="rgba(0,0,0,0.25)" />
              <rect x="21" y="3" width="3" height="14" fill="rgba(0,0,0,0.25)" />
            </g>
          </motion.g>
        </motion.g>
      ))}

      {!reduced && [0, 0.5].map((delay, i) => (
        <motion.circle
          key={`r${i}`}
          r="3" fill="#E9C063"
          animate={{ offsetDistance: ['0%', '100%'] }}
          transition={{ duration: 4.4, repeat: Infinity, delay: delay * 1.9, ease: 'easeInOut' }}
          style={{ offsetPath: `path("${reversePath}")` }}
        />
      ))}

      {/* Waypoint nodes — each independently hoverable */}
      {wp.map((p, i) => {
        const isHover = hover === i
        return (
          <g
            key={p.label}
            style={{ cursor: 'pointer', touchAction: 'manipulation' }}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onPointerDown={() => setHover(i)}
          >
            {/* Wider hit zone */}
            <circle cx={p.x} cy={p.y} r="40" fill="transparent" />
            <motion.circle
              cx={p.x} cy={p.y}
              fill="rgba(15, 31, 66, 0.92)"
              stroke={c1}
              animate={{
                r: isHover ? 19 : 14,
                strokeWidth: isHover ? 2 : 1.4,
              }}
              transition={{ duration: 0.3 }}
              filter={isHover ? 'url(#s-glow-strong)' : 'url(#s-glow)'}
            />
            <motion.circle
              cx={p.x} cy={p.y}
              fill={c1}
              animate={{ r: isHover ? 7 : 5 }}
              transition={{ duration: 0.3 }}
            />
            <text x={p.x} y={p.y - 28} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill={isHover ? '#FFFFFF' : '#A7F3D0'} pointerEvents="none" style={{ transition: 'fill 0.3s ease' }}>
              {p.label}
            </text>
            <text x={p.x} y={p.y + 36} textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" fill="rgba(255,255,255,0.7)" letterSpacing="-0.01em" pointerEvents="none">
              {p.sub}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
