import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../../hooks/useReducedMotion.js'

/**
 * Energy — 3 sources (SOLAR/WIND/HYDRO) → DePIN core → 3 sinks
 * (GRID/EV/INDUSTRY). Every node + the core are independently hoverable.
 */

export default function EnergyArtifact({ c1 = '#FACC15', c2 = '#F59E0B' }) {
  const reduced = useReducedMotionPreference()
  const [hover, setHover] = useState(null) // 'src-i' | 'sink-i' | 'core'
  const W = 720, H = 460
  const cx = W / 2, cy = H / 2

  const sources = [
    { x: 80,  y: 90,  label: 'SOLAR', sub: '☀' },
    { x: 80,  y: 230, label: 'WIND',  sub: '⤴' },
    { x: 80,  y: 370, label: 'HYDRO', sub: '≈' },
  ]
  const sinks = [
    { x: 640, y: 90,  label: 'GRID',       sub: '⌁' },
    { x: 640, y: 230, label: 'EV NETWORK', sub: '⚡' },
    { x: 640, y: 370, label: 'INDUSTRY',   sub: '◫' },
  ]

  const drawPath = (a, b) => {
    const mx = (a.x + b.x) / 2
    return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
  }

  const isCore = hover === 'core'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="e2-grad" x1="0" x2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id="e2-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="e2-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Source conduits + packets */}
      {sources.map((s, i) => {
        const d = drawPath(s, { x: cx - 60, y: cy })
        const isHover = hover === `src-${i}` || isCore
        return (
          <g key={`src-${s.label}`}>
            <path
              d={d}
              fill="none"
              stroke={isHover ? c1 : 'rgba(250,204,21,0.35)'}
              strokeWidth={isHover ? 1.8 : 1.2}
              strokeDasharray="2 5"
              style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
            />
            {!reduced && (
              <motion.circle
                r={isHover ? 4 : 3} fill={isHover ? '#FFFFFF' : c1}
                filter="url(#e2-glow)"
                animate={{ offsetDistance: ['0%', '100%'] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                style={{ offsetPath: `path("${d}")` }}
              />
            )}
          </g>
        )
      })}

      {/* Sink conduits + packets */}
      {sinks.map((s, i) => {
        const d = drawPath({ x: cx + 60, y: cy }, s)
        const isHover = hover === `sink-${i}` || isCore
        return (
          <g key={`sink-${s.label}`}>
            <path
              d={d}
              fill="none"
              stroke={isHover ? c2 : 'rgba(245,158,11,0.45)'}
              strokeWidth={isHover ? 1.8 : 1.2}
              strokeDasharray="2 5"
              style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
            />
            {!reduced && (
              <motion.circle
                r={isHover ? 4 : 3} fill={isHover ? '#FFFFFF' : c2}
                filter="url(#e2-glow)"
                animate={{ offsetDistance: ['0%', '100%'] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1.4 + i * 0.3, ease: 'easeInOut' }}
                style={{ offsetPath: `path("${d}")` }}
              />
            )}
          </g>
        )
      })}

      {/* Centre core — hoverable */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation', transformOrigin: `${cx}px ${cy}px` }}
        onPointerEnter={() => setHover('core')}
        onPointerLeave={() => setHover(null)}
        onPointerDown={() => setHover('core')}
      >
        <motion.circle
          cx={cx} cy={cy}
          fill="url(#e2-grad)"
          animate={
            reduced
              ? { r: isCore ? 80 : 60, opacity: isCore ? 0.32 : 0.18 }
              : isCore
                ? { r: [76, 88, 76], opacity: [0.30, 0.45, 0.30] }
                : { r: [60, 72, 60], opacity: [0.18, 0.35, 0.18] }
          }
          transition={{ duration: 3, repeat: Infinity }}
          filter={isCore ? 'url(#e2-glow-strong)' : 'url(#e2-glow)'}
        />
        <motion.polygon
          points={`${cx},${cy-44} ${cx+38},${cy-22} ${cx+38},${cy+22} ${cx},${cy+44} ${cx-38},${cy+22} ${cx-38},${cy-22}`}
          fill="url(#e2-grad)"
          filter="url(#e2-glow)"
          animate={{ scale: isCore ? 1.10 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="500" fill="#0F1F42" letterSpacing="-0.02em" pointerEvents="none">DePIN</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.22em" fill="rgba(15,31,66,0.7)" pointerEvents="none">METERING</text>
      </g>

      {/* Source nodes — hoverable */}
      {sources.map((s, i) => {
        const isHover = hover === `src-${i}`
        return (
          <g
            key={s.label}
            style={{ cursor: 'pointer', touchAction: 'manipulation' }}
            onPointerEnter={() => setHover(`src-${i}`)}
            onPointerLeave={() => setHover(null)}
            onPointerDown={() => setHover(`src-${i}`)}
          >
            <circle cx={s.x} cy={s.y} r="40" fill="transparent" />
            <motion.circle
              cx={s.x} cy={s.y}
              fill="rgba(15,31,66,0.95)"
              stroke={c1}
              animate={{ r: isHover ? 27 : 22, strokeWidth: isHover ? 2 : 1.4 }}
              transition={{ duration: 0.3 }}
              filter={isHover ? 'url(#e2-glow-strong)' : undefined}
            />
            <text x={s.x} y={s.y + 6} textAnchor="middle" fontSize={isHover ? 23 : 20} fill={c1} pointerEvents="none" style={{ transition: 'font-size 0.3s ease' }}>{s.sub}</text>
            <text x={s.x} y={s.y + 44} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill={isHover ? '#FFFFFF' : '#FDE68A'} pointerEvents="none" style={{ transition: 'fill 0.3s ease' }}>{s.label}</text>
          </g>
        )
      })}

      {/* Sink nodes — hoverable */}
      {sinks.map((s, i) => {
        const isHover = hover === `sink-${i}`
        return (
          <g
            key={s.label}
            style={{ cursor: 'pointer', touchAction: 'manipulation' }}
            onPointerEnter={() => setHover(`sink-${i}`)}
            onPointerLeave={() => setHover(null)}
            onPointerDown={() => setHover(`sink-${i}`)}
          >
            <circle cx={s.x} cy={s.y} r="40" fill="transparent" />
            <motion.circle
              cx={s.x} cy={s.y}
              fill="rgba(15,31,66,0.95)"
              stroke={c2}
              animate={{ r: isHover ? 27 : 22, strokeWidth: isHover ? 2 : 1.4 }}
              transition={{ duration: 0.3 }}
              filter={isHover ? 'url(#e2-glow-strong)' : undefined}
            />
            <text x={s.x} y={s.y + 6} textAnchor="middle" fontSize={isHover ? 21 : 18} fill={c2} pointerEvents="none" style={{ transition: 'font-size 0.3s ease' }}>{s.sub}</text>
            <text x={s.x} y={s.y + 44} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill={isHover ? '#FFFFFF' : '#FDE68A'} pointerEvents="none" style={{ transition: 'fill 0.3s ease' }}>{s.label}</text>
          </g>
        )
      })}
    </svg>
  )
}
