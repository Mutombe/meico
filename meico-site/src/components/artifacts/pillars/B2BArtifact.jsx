import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../../hooks/useReducedMotion.js'

/**
 * B2B Marketplace — three hoverable hot-spots: SUPPLIER · MEICO B2B HEX ·
 * BUYER. Hover any to highlight + brighten the rail entering it.
 */
export default function B2BArtifact({ c1 = '#38BDF8', c2 = '#06B6D4' }) {
  const reduced = useReducedMotionPreference()
  const [hover, setHover] = useState(null) // 'src' | 'hex' | 'dst'
  const W = 720, H = 360
  const yTop = 130, yBot = 240
  const xL = 110, xR = W - 110, cx = W / 2
  const cy = (yTop + yBot) / 2

  const isL = hover === 'src'
  const isC = hover === 'hex'
  const isR = hover === 'dst'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="b-grad" x1="0" x2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id="b-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="b-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Side labels */}
      <text x={xL} y={50} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.22em" fill={c1}>SUPPLIER</text>
      <text x={cx} y={50} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.22em" fill="#E9C063">MEICO · B2B</text>
      <text x={xR} y={50} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.22em" fill={c2}>BUSINESS</text>

      {/* Top rail — goods (left → right). Highlighted whenever its endpoint is hovered */}
      <line
        x1={xL + 40} y1={yTop} x2={cx - 50} y2={yTop}
        stroke={isL || isC ? c1 : 'rgba(56,189,248,0.30)'}
        strokeWidth={isL || isC ? 1.8 : 1.2}
        strokeDasharray="3 5"
        style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
      />
      <line
        x1={cx + 50} y1={yTop} x2={xR - 40} y2={yTop}
        stroke={isR || isC ? c2 : 'rgba(6,182,212,0.30)'}
        strokeWidth={isR || isC ? 1.8 : 1.2}
        strokeDasharray="3 5"
        style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
      />
      <text x={cx} y={yTop - 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.20em" fill="rgba(200,207,224,0.55)">GOODS →</text>

      {/* Bottom rail — payment (right → left) */}
      <line
        x1={cx - 50} y1={yBot} x2={xL + 40} y2={yBot}
        stroke={isL || isC ? '#E9C063' : 'rgba(233,192,99,0.30)'}
        strokeWidth={isL || isC ? 1.8 : 1.2}
        strokeDasharray="3 5"
        style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
      />
      <line
        x1={xR - 40} y1={yBot} x2={cx + 50} y2={yBot}
        stroke={isR || isC ? '#E9C063' : 'rgba(233,192,99,0.30)'}
        strokeWidth={isR || isC ? 1.8 : 1.2}
        strokeDasharray="3 5"
        style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
      />
      <text x={cx} y={yBot + 26} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.20em" fill="rgba(200,207,224,0.55)">← MEICO SETTLEMENT</text>

      {/* SUPPLIER circle — hoverable */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation' }}
        onPointerEnter={() => setHover('src')}
        onPointerLeave={() => setHover(null)}
        onPointerDown={() => setHover('src')}
      >
        <motion.circle
          cx={xL} cy={cy} r="44"
          fill="rgba(15,31,66,0.85)"
          stroke={c1}
          animate={{
            r: isL ? 50 : 44,
            strokeWidth: isL ? 1.8 : 1.2,
            filter: isL ? 'brightness(1.2)' : 'brightness(1)',
          }}
          transition={{ duration: 0.3 }}
          filter={isL ? 'url(#b-glow-strong)' : undefined}
        />
        <text x={xL} y={cy - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.18em" fill={isL ? '#FFFFFF' : c1} pointerEvents="none">SOURCE</text>
        <text x={xL} y={cy + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.18em" fill="rgba(200,207,224,0.65)" pointerEvents="none">AFRICA</text>
      </g>

      {/* BUYER circle — hoverable */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation' }}
        onPointerEnter={() => setHover('dst')}
        onPointerLeave={() => setHover(null)}
        onPointerDown={() => setHover('dst')}
      >
        <motion.circle
          cx={xR} cy={cy} r="44"
          fill="rgba(15,31,66,0.85)"
          stroke={c2}
          animate={{
            r: isR ? 50 : 44,
            strokeWidth: isR ? 1.8 : 1.2,
          }}
          transition={{ duration: 0.3 }}
          filter={isR ? 'url(#b-glow-strong)' : undefined}
        />
        <text x={xR} y={cy - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.18em" fill={isR ? '#FFFFFF' : c2} pointerEvents="none">BUYER</text>
        <text x={xR} y={cy + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.18em" fill="rgba(200,207,224,0.65)" pointerEvents="none">PAN-AFRICAN</text>
      </g>

      {/* Centre hex — hoverable */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation', transformOrigin: `${cx}px ${cy}px` }}
        onPointerEnter={() => setHover('hex')}
        onPointerLeave={() => setHover(null)}
        onPointerDown={() => setHover('hex')}
      >
        <motion.polygon
          points={`${cx},${cy-50} ${cx+44},${cy-25} ${cx+44},${cy+25} ${cx},${cy+50} ${cx-44},${cy+25} ${cx-44},${cy-25}`}
          fill="url(#b-grad)"
          animate={{ scale: isC ? 1.10 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          filter={isC ? 'url(#b-glow-strong)' : 'url(#b-glow)'}
        />
        <polygon
          points={`${cx},${cy-40} ${cx+34},${cy-20} ${cx+34},${cy+20} ${cx},${cy+40} ${cx-34},${cy+20} ${cx-34},${cy-20}`}
          fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"
          pointerEvents="none"
        />
        <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="var(--font-display)" fontSize="18" fontWeight="500" fill="#FFFFFF" letterSpacing="-0.02em" pointerEvents="none">B2B</text>
      </g>

      {/* Travelling packets */}
      {!reduced && (
        <>
          <motion.circle r="3" fill={c1} filter="url(#b-glow)"
            initial={{ cx: xL+40, cy: yTop, opacity: 0 }}
            animate={{ cx: [xL+40, cx-50, cx+50, xR-40], cy: [yTop, yTop, yTop, yTop], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.6, 1] }} />
          <motion.circle r="3" fill={c1} filter="url(#b-glow)"
            initial={{ cx: xL+40, cy: yTop, opacity: 0 }}
            animate={{ cx: [xL+40, cx-50, cx+50, xR-40], cy: [yTop, yTop, yTop, yTop], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.6, 1], delay: 1.8 }} />
          <motion.circle r="3" fill="#E9C063" filter="url(#b-glow)"
            initial={{ cx: xR-40, cy: yBot, opacity: 0 }}
            animate={{ cx: [xR-40, cx+50, cx-50, xL+40], cy: [yBot, yBot, yBot, yBot], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.6, 1], delay: 0.9 }} />
        </>
      )}
    </svg>
  )
}
