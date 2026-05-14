import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../../hooks/useReducedMotion.js'

/**
 * MeicoPay — tilted wallet card centre, currency orbs orbiting it. Each
 * orb is independently hoverable: it pauses orbit + scales + tints; the
 * wallet card is also a hoverable target showing the full brand. The
 * orbital ring brightens when wallet is hovered.
 */
export default function PayArtifact({ c1 = '#A855F7', c2 = '#EC4899' }) {
  const reduced = useReducedMotionPreference()
  const [hover, setHover] = useState(null) // 'wallet' | number (orb index)
  const W = 720, H = 420
  const cx = W / 2, cy = H / 2

  const ORBS = [
    { label: '$',   angle:   -60, color: '#E9C063', sub: 'USD' },
    { label: '€',   angle:    60, color: '#22D3EE', sub: 'EUR' },
    { label: '₿',   angle:   180, color: c1,        sub: 'BTC' },
    { label: 'Ξ',   angle:   140, color: c2,        sub: 'ETH' },
    { label: 'ZAR', angle:  -120, color: '#60A5FA', sub: 'ZAR' },
  ]
  const ORBIT_R = 150

  const isWalletHover = hover === 'wallet'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="p-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id="p-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="p-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Orbit ring — brightens when wallet hovered */}
      <circle
        cx={cx} cy={cy} r={ORBIT_R}
        fill="none"
        stroke={isWalletHover ? c1 : 'rgba(168,85,247,0.20)'}
        strokeOpacity={isWalletHover ? 0.55 : 1}
        strokeWidth={isWalletHover ? 1.4 : 1}
        strokeDasharray="3 5"
        style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }}
      />

      {/* Wallet card — hoverable */}
      <g
        transform={`translate(${cx-120} ${cy-72}) rotate(-4 120 72)`}
        style={{ cursor: 'pointer', touchAction: 'manipulation' }}
        onPointerEnter={() => setHover('wallet')}
        onPointerLeave={() => setHover(null)}
        onPointerDown={() => setHover('wallet')}
      >
        <motion.rect
          x="6" y="10" width="240" height="144" rx="14"
          fill="rgba(168,85,247,0.30)"
          animate={{ opacity: isWalletHover ? 0.55 : 0.30 }}
          transition={{ duration: 0.3 }}
          filter={isWalletHover ? 'url(#p-glow-strong)' : 'url(#p-glow)'}
        />
        <motion.rect
          x="0" y="0" width="240" height="144" rx="14"
          fill="url(#p-grad)"
          animate={{ scale: isWalletHover ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '120px 72px' }}
        />
        <rect x="0" y="40" width="240" height="2" fill="rgba(255,255,255,0.15)" pointerEvents="none" />
        <rect x="22" y="56" width="32" height="24" rx="3" fill="#E9C063" opacity="0.95" pointerEvents="none" />
        <line x1="22" y1="64" x2="54" y2="64" stroke="rgba(6,13,32,0.4)" strokeWidth="0.8" pointerEvents="none" />
        <line x1="22" y1="72" x2="54" y2="72" stroke="rgba(6,13,32,0.4)" strokeWidth="0.8" pointerEvents="none" />
        <text x="22" y="34" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.28em" fill="rgba(255,255,255,0.85)" pointerEvents="none">MEICO·PAY</text>
        <text x="22" y="108" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.18em" fill="#FFFFFF" pointerEvents="none">•••• •••• 0M0</text>
        <text x="22" y="128" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.22em" fill="rgba(255,255,255,0.75)" pointerEvents="none">SELF-CUSTODY</text>
      </g>

      {/* Currency orbs — each independently hoverable. Orbit pauses
          when any orb is hovered (so the user can pin it). */}
      {ORBS.map((o, i) => {
        const rad = (o.angle * Math.PI) / 180
        const ox = cx + ORBIT_R * Math.cos(rad)
        const oy = cy + ORBIT_R * Math.sin(rad)
        const isHover = hover === i
        return (
          <motion.g
            key={i}
            animate={reduced || hover !== null ? { rotate: 0 } : { rotate: 360 }}
            transition={
              reduced || hover !== null
                ? { duration: 0.6, ease: 'easeOut' }
                : { duration: 60 - i * 4, repeat: Infinity, ease: 'linear' }
            }
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <g
              style={{ cursor: 'pointer', touchAction: 'manipulation' }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onPointerDown={() => setHover(i)}
            >
              <motion.circle
                cx={ox} cy={oy}
                fill={o.color}
                animate={{ r: isHover ? 26 : 18, opacity: isHover ? 0.40 : 0.16 }}
                transition={{ duration: 0.3 }}
                filter={isHover ? 'url(#p-glow-strong)' : 'url(#p-glow)'}
              />
              <motion.circle
                cx={ox} cy={oy}
                fill="rgba(15,31,66,0.95)"
                stroke={o.color}
                animate={{ r: isHover ? 14 : 11, strokeWidth: isHover ? 1.8 : 1.2 }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={ox} y={oy + 3}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize={isHover ? 13 : 11}
                fontWeight="500"
                fill={isHover ? '#FFFFFF' : o.color}
                pointerEvents="none"
                style={{ transition: 'fill 0.3s ease, font-size 0.3s ease' }}
              >
                {o.label}
              </text>
              {isHover && (
                <text
                  x={ox} y={oy + 30}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="8"
                  letterSpacing="0.22em"
                  fill={o.color}
                  pointerEvents="none"
                >
                  {o.sub}
                </text>
              )}
            </g>
          </motion.g>
        )
      })}

      {!reduced && (
        <>
          <motion.circle r="3" fill={c2} filter="url(#p-glow)"
            initial={{ cx: cx - 200, cy: 80, opacity: 0 }}
            animate={{ cx: [cx - 200, cx, cx + 200], cy: [80, cy, 80], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.circle r="3" fill={c1} filter="url(#p-glow)"
            initial={{ cx: cx + 200, cy: H - 80, opacity: 0 }}
            animate={{ cx: [cx + 200, cx, cx - 200], cy: [H - 80, cy, H - 80], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
        </>
      )}

      <text x="40" y="40" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.22em" fill="rgba(200,207,224,0.55)">
        FIAT ↔ CRYPTO · ON / OFF RAMP
      </text>
      <text x={W - 40} y={H - 30} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.22em" fill="rgba(200,207,224,0.55)">
        CROSS-BORDER · MINUSCULE FEES
      </text>
    </svg>
  )
}
