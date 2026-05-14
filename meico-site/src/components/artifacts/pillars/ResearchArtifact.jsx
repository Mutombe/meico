import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../../hooks/useReducedMotion.js'

/**
 * Research Institute — six research-type nodes → INSTITUTE hex → eight
 * industry nodes. Every node is independently hoverable. Hover the
 * INSTITUTE hex to bloom the whole grid.
 */

const RESEARCH = [
  'Applied', 'Fundamental', 'Experimental',
  'Developmental', 'Interdisciplinary', 'Theoretical',
]

const INDUSTRIES = [
  'Semiconductors', 'Green Energy', 'BiotechHealth',
  'Robotics', 'AI · Data', 'Aerospace', 'Materials', 'Advanced Mfg',
]

export default function ResearchArtifact({ c1 = '#4F8AF6', c2 = '#8B5CF6' }) {
  const reduced = useReducedMotionPreference()
  const [hoverLeft,  setHoverLeft]  = useState(null)
  const [hoverRight, setHoverRight] = useState(null)
  const [centerHover, setCenterHover] = useState(false)
  const W = 720, H = 460
  const cx = W / 2, cy = H / 2

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="r-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id="r-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="r-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Soft halo behind centre — brightens on centre hover */}
      <motion.circle
        cx={cx} cy={cy}
        fill={c1}
        animate={{ r: centerHover ? 160 : 120, opacity: centerHover ? 0.20 : 0.10 }}
        transition={{ duration: 0.5 }}
        filter="url(#r-glow-strong)"
      />

      {/* Left column — research types */}
      {RESEARCH.map((label, i) => {
        const y = 50 + i * 65
        const isHover = hoverLeft === i
        return (
          <g
            key={`l-${i}`}
            style={{ cursor: 'pointer', touchAction: 'manipulation' }}
            onPointerEnter={() => setHoverLeft(i)}
            onPointerLeave={() => setHoverLeft(null)}
            onPointerDown={() => setHoverLeft(i)}
          >
            <line
              x1={120} y1={y} x2={cx - 70} y2={cy}
              stroke={isHover ? c1 : 'rgba(233,192,99,0.18)'}
              strokeWidth={isHover ? 1.6 : 0.8}
              strokeDasharray="2 3"
              style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
            />
            {/* Hit zone */}
            <rect x={20} y={y - 14} width={110} height={28} fill="transparent" />
            <motion.circle
              cx={120} cy={y}
              fill="url(#r-grad)"
              animate={{ r: isHover ? 8 : 5, filter: isHover ? 'brightness(1.3)' : 'brightness(1)' }}
              transition={{ duration: 0.3 }}
              filter={isHover ? 'url(#r-glow-strong)' : undefined}
            />
            <text
              x={108} y={y + 4}
              textAnchor="end"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="0.12em"
              fill={isHover ? '#FFFFFF' : '#C8CFE0'}
              pointerEvents="none"
              style={{ transition: 'fill 0.3s ease' }}
            >
              {label.toUpperCase()}
            </text>
            {!reduced && (
              <motion.circle
                r={isHover ? 3.4 : 2.4}
                fill={isHover ? '#FFFFFF' : c1}
                filter="url(#r-glow)"
                initial={{ cx: 120, cy: y, opacity: 0 }}
                animate={{ cx: [120, cx - 70], cy: [y, cy], opacity: [0, 1, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.18 + 0.1, ease: 'easeInOut', times: [0, 0.6, 1] }}
              />
            )}
          </g>
        )
      })}

      {/* Right column — industries */}
      {INDUSTRIES.map((label, i) => {
        const y = 35 + i * 52
        const isHover = hoverRight === i
        return (
          <g
            key={`r-${i}`}
            style={{ cursor: 'pointer', touchAction: 'manipulation' }}
            onPointerEnter={() => setHoverRight(i)}
            onPointerLeave={() => setHoverRight(null)}
            onPointerDown={() => setHoverRight(i)}
          >
            <line
              x1={cx + 70} y1={cy} x2={W - 120} y2={y}
              stroke={isHover ? c2 : 'rgba(233,192,99,0.18)'}
              strokeWidth={isHover ? 1.6 : 0.8}
              strokeDasharray="2 3"
              style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
            />
            <rect x={W - 130} y={y - 14} width={120} height={28} fill="transparent" />
            <motion.circle
              cx={W - 120} cy={y}
              fill={c2}
              animate={{ r: isHover ? 8 : 5 }}
              transition={{ duration: 0.3 }}
              filter={isHover ? 'url(#r-glow-strong)' : undefined}
            />
            <text
              x={W - 108} y={y + 4}
              textAnchor="start"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="0.12em"
              fill={isHover ? '#FFFFFF' : '#C8CFE0'}
              pointerEvents="none"
              style={{ transition: 'fill 0.3s ease' }}
            >
              {label.toUpperCase()}
            </text>
            {!reduced && (
              <motion.circle
                r={isHover ? 3.4 : 2.4}
                fill={isHover ? '#FFFFFF' : c2}
                filter="url(#r-glow)"
                initial={{ cx: cx + 70, cy: cy, opacity: 0 }}
                animate={{ cx: [cx + 70, W - 120], cy: [cy, y], opacity: [0, 1, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1.4 + i * 0.16, ease: 'easeInOut', times: [0, 0.6, 1] }}
              />
            )}
          </g>
        )
      })}

      {/* Centre hex — Institute */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation', transformOrigin: `${cx}px ${cy}px` }}
        onPointerEnter={() => setCenterHover(true)}
        onPointerLeave={() => setCenterHover(false)}
        onPointerDown={() => setCenterHover(true)}
      >
        <motion.polygon
          points={`${cx},${cy-70} ${cx+60},${cy-35} ${cx+60},${cy+35} ${cx},${cy+70} ${cx-60},${cy+35} ${cx-60},${cy-35}`}
          fill="url(#r-grad)"
          animate={
            reduced
              ? { scale: centerHover ? 1.08 : 1 }
              : { scale: centerHover ? [1.05, 1.10, 1.05] : [1, 1.04, 1] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          filter={centerHover ? 'url(#r-glow-strong)' : 'url(#r-glow)'}
        />
        <polygon
          points={`${cx},${cy-58} ${cx+50},${cy-29} ${cx+50},${cy+29} ${cx},${cy+58} ${cx-50},${cy+29} ${cx-50},${cy-29}`}
          fill="none"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth="1"
          pointerEvents="none"
        />
        <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="var(--font-display)" fontSize="20" fontWeight="500" letterSpacing="-0.03em" fill="#FFFFFF" pointerEvents="none">
          INSTITUTE
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="rgba(255,255,255,0.7)" pointerEvents="none">
          01 / MEICO
        </text>
      </g>
    </svg>
  )
}
