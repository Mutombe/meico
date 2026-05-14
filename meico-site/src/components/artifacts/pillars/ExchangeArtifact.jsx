import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../../hooks/useReducedMotion.js'

/**
 * Exchange — CEX order-book (left), MEICO hex (centre), DEX liquidity
 * pool (right). Three hoverable zones. Hover CEX to brighten order-book
 * bars; hover DEX to pulse the pool rings; hover centre to bloom both.
 */
export default function ExchangeArtifact({ c1 = '#06B6D4', c2 = '#14B8A6' }) {
  const reduced = useReducedMotionPreference()
  const [hover, setHover] = useState(null) // 'cex' | 'hex' | 'dex'
  const W = 720, H = 420
  const cx = W / 2, cy = H / 2

  const isCex = hover === 'cex' || hover === 'hex'
  const isDex = hover === 'dex' || hover === 'hex'
  const isHex = hover === 'hex'

  const bookBars = Array.from({ length: 10 }, (_, i) => ({
    y: 80 + i * 25,
    width: 60 + (i % 2 === 0 ? Math.abs(5 - i) * 12 : Math.abs(5 - i) * 9),
    side: i < 5 ? 'ask' : 'bid',
  }))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="e-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id="e-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="e-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <line x1={cx} y1="20" x2={cx} y2={H-20} stroke="rgba(233,192,99,0.30)" strokeWidth="1" strokeDasharray="2 4" />

      <text x={W*0.20} y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.24em" fill={isCex ? '#FFFFFF' : c1}>CEX · ORDER BOOK</text>
      <text x={W*0.80} y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.24em" fill={isDex ? '#FFFFFF' : c2}>DEX · LIQUIDITY POOL</text>

      {/* CEX zone — wraps the order book in a hit region */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation' }}
        onPointerEnter={() => setHover('cex')}
        onPointerLeave={() => setHover(null)}
        onPointerDown={() => setHover('cex')}
      >
        <rect x={W*0.05} y={60} width={W*0.30} height={H-100} fill="transparent" />
        {bookBars.map((b, i) => (
          <motion.rect
            key={`bar-${i}`}
            x={W*0.20 - b.width/2}
            y={b.y}
            width={b.width}
            height={4}
            rx="1.5"
            fill={b.side === 'bid' ? '#22D3EE' : '#0891B2'}
            opacity={isCex ? 1 : 0.75}
            animate={
              reduced
                ? undefined
                : isCex
                  ? { width: [b.width * 1.05, b.width * 0.7, b.width * 1.05] }
                  : { width: [b.width, b.width * 0.85, b.width] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
          />
        ))}
        <text x={W*0.20} y={H-30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.18em" fill="rgba(200,207,224,0.55)" pointerEvents="none">
          DEPTH · BID / ASK
        </text>
      </g>

      {/* DEX zone — wraps liquidity rings + pool */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation' }}
        onPointerEnter={() => setHover('dex')}
        onPointerLeave={() => setHover(null)}
        onPointerDown={() => setHover('dex')}
      >
        <rect x={W*0.65} y={60} width={W*0.30} height={H-100} fill="transparent" />
        {[120, 95, 70, 45].map((r, i) => (
          <motion.circle
            key={`r-${i}`}
            cx={W*0.80} cy={cy}
            fill="none"
            stroke={i % 2 === 0 ? c1 : c2}
            strokeOpacity={isDex ? 0.85 - i * 0.10 : 0.45 - i * 0.08}
            strokeWidth={isDex ? 1.6 : 1.1}
            strokeDasharray="3 3"
            animate={
              reduced
                ? undefined
                : isDex
                  ? { r: [r * 1.08, r + 12, r * 1.08] }
                  : { r: [r, r + 6, r] }
            }
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
        <motion.circle
          cx={W*0.80} cy={cy}
          fill="url(#e-grad)"
          animate={{ r: isDex ? 24 : 18 }}
          transition={{ duration: 0.3 }}
          filter={isDex ? 'url(#e-glow-strong)' : 'url(#e-glow)'}
        />
        <text x={W*0.80} y={cy+5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.18em" fill="#FFFFFF" pointerEvents="none">POOL</text>
        <text x={W*0.80} y={H-30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.18em" fill="rgba(200,207,224,0.55)" pointerEvents="none">
          AMM · K = CONST
        </text>
      </g>

      {/* Centre MEICO hex — hoverable */}
      <g
        style={{ cursor: 'pointer', touchAction: 'manipulation', transformOrigin: `${cx}px ${cy}px` }}
        onPointerEnter={() => setHover('hex')}
        onPointerLeave={() => setHover(null)}
        onPointerDown={() => setHover('hex')}
      >
        <motion.polygon
          points={`${cx},${cy-50} ${cx+44},${cy-25} ${cx+44},${cy+25} ${cx},${cy+50} ${cx-44},${cy+25} ${cx-44},${cy-25}`}
          fill="url(#e-grad)"
          animate={{ scale: isHex ? 1.10 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          filter={isHex ? 'url(#e-glow-strong)' : 'url(#e-glow)'}
        />
        <text x={cx} y={cy+5} textAnchor="middle" fontFamily="var(--font-display)" fontSize="16" fontWeight="500" letterSpacing="-0.02em" fill="#FFFFFF" pointerEvents="none">
          MEICO
        </text>
      </g>

      {!reduced && (
        <>
          <motion.circle r="3" fill="#22D3EE" filter="url(#e-glow)"
            initial={{ cx: W*0.20, cy: cy-40, opacity: 0 }}
            animate={{ cx: [W*0.20, cx, W*0.80], cy: [cy-40, cy, cy], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.circle r="3" fill={c2} filter="url(#e-glow)"
            initial={{ cx: W*0.80, cy: cy+40, opacity: 0 }}
            animate={{ cx: [W*0.80, cx, W*0.20], cy: [cy+40, cy, cy+10], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
        </>
      )}
    </svg>
  )
}
