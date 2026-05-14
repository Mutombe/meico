import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../hooks/useReducedMotion.js'
import { pillars } from '../../data/siteData.js'

/**
 * EcosystemArtifact — the centrepiece interactive of the site.
 *
 *  · A central MEICO hex (the chain) sits at viewBox centre.
 *  · The 7 pillar hexes orbit in a heptagonal arrangement.
 *  · A dashed brass-gold connection line runs from centre to each pillar.
 *  · A light packet travels along each connection on a staggered loop
 *    (centre → pillar → fade), so the diagram reads as "the chain is
 *    speaking to every pillar continuously".
 *  · Hover any pillar node: it lifts, its connection brightens, its
 *    name + accent halo appear. Click navigates to the pillar page.
 *  · Reduced-motion users see all geometry but no looping packets.
 */

function hexPoints(cx, cy, r) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
}

const SIZE = 720
const CENTER = SIZE / 2
const ORBIT_R = 260
const PILLAR_R = 42
const N = pillars.length // 7

function pillarPos(i) {
  // Start at top (-90°), step round the heptagon
  const a = -Math.PI / 2 + (2 * Math.PI / N) * i
  return { x: CENTER + ORBIT_R * Math.cos(a), y: CENTER + ORBIT_R * Math.sin(a) }
}

export default function EcosystemArtifact({ className = '' }) {
  const [hover, setHover] = useState(null)
  const [centerHover, setCenterHover] = useState(false)
  const reduced = useReducedMotionPreference()

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block w-full h-auto"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Per-pillar gradient defs */}
          {pillars.map((p) => (
            <linearGradient
              key={p.slug}
              id={`grad-${p.slug}`}
              x1="0" y1="0" x2="1" y2="1"
            >
              <stop offset="0%"   stopColor={p.accentHex} />
              <stop offset="100%" stopColor={p.accentHex2} />
            </linearGradient>
          ))}

          {/* Brand gradient for the centre hex */}
          <linearGradient id="grad-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#3B82F6" />
            <stop offset="50%"  stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#E9C063" />
          </linearGradient>

          {/* Soft glow filter — applied to centre + hover state */}
          <filter id="hex-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background outer ring — a hint of orbit */}
        <circle
          cx={CENTER} cy={CENTER} r={ORBIT_R}
          fill="none"
          stroke="rgba(233, 192, 99, 0.10)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* === Connection lines + travelling packets ============== */}
        {pillars.map((p, i) => {
          const { x, y } = pillarPos(i)
          const isHover = hover === i
          const c1 = p.accentHex
          const c2 = p.accentHex2

          return (
            <g key={`conn-${p.slug}`}>
              {/* Base dashed line (always visible, dim) */}
              <line
                x1={CENTER} y1={CENTER}
                x2={x}      y2={y}
                stroke={isHover ? `url(#grad-${p.slug})` : 'rgba(233, 192, 99, 0.30)'}
                strokeWidth={isHover ? '1.5' : '0.9'}
                strokeDasharray="3 4"
                style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }}
              />

              {/* Travelling packet — centre → pillar, infinite loop, staggered */}
              {!reduced && (
                <motion.circle
                  r="3.2"
                  fill={c1}
                  filter="url(#dot-glow)"
                  initial={{ cx: CENTER, cy: CENTER, opacity: 0 }}
                  animate={{
                    cx: [CENTER, x],
                    cy: [CENTER, y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    times: [0, 0.1, 0.85, 1],
                    repeat: Infinity,
                    delay: i * 0.42,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </g>
          )
        })}

        {/* === Centre MEICO hex =================================== */}
        <g
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
          onPointerEnter={() => setCenterHover(true)}
          onPointerLeave={() => setCenterHover(false)}
          onPointerDown={() => setCenterHover(true)}
        >
          {/* Pulsing outer halo */}
          <motion.circle
            cx={CENTER} cy={CENTER} r="78"
            fill="url(#grad-brand)"
            animate={
              reduced
                ? { opacity: centerHover ? 0.45 : 0.20, r: 78 }
                : {
                    r: centerHover ? [88, 96, 88] : [78, 88, 78],
                    opacity: centerHover ? [0.32, 0.50, 0.32] : [0.18, 0.30, 0.18],
                  }
            }
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            filter="url(#hex-glow)"
          />

          {/* Filled centre hex */}
          <motion.polygon
            points={hexPoints(CENTER, CENTER, 70)}
            fill="url(#grad-brand)"
            opacity="0.95"
            filter="url(#hex-glow)"
            animate={{ scale: centerHover ? 1.08 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />

          {/* Inner echo hex — hairline */}
          <polygon
            points={hexPoints(CENTER, CENTER, 58)}
            fill="none"
            stroke="rgba(6, 13, 32, 0.55)"
            strokeWidth="1.4"
          />

          {/* Brand mark — stylised hex-M (a simplified version of the logo) */}
          <g transform={`translate(${CENTER - 22}, ${CENTER - 22})`}>
            <path
              d="M 2 28 L 2 14 L 14 8 L 22 14 L 30 8 L 42 14 L 42 28"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="22" y="42"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="6"
              letterSpacing="1.6"
              fill="rgba(255,255,255,0.9)"
            >
              MEICO
            </text>
          </g>
        </g>

        {/* === Pillar nodes ====================================== */}
        {pillars.map((p, i) => {
          const { x, y } = pillarPos(i)
          const isHover = hover === i
          const num = String(i + 1).padStart(2, '0')

          return (
            <g
              key={`node-${p.slug}`}
              style={{
                cursor: 'pointer',
                transformOrigin: `${x}px ${y}px`,
                touchAction: 'manipulation',
              }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onPointerDown={() => setHover(i)}
            >
              {/* Halo on hover */}
              <motion.circle
                cx={x} cy={y}
                r={PILLAR_R + 22}
                fill={p.accentHex}
                opacity={isHover ? 0.22 : 0}
                animate={{ opacity: isHover ? 0.22 : 0 }}
                transition={{ duration: 0.35 }}
                filter="url(#hex-glow)"
              />

              {/* Hex node */}
              <motion.polygon
                points={hexPoints(x, y, PILLAR_R)}
                fill={`url(#grad-${p.slug})`}
                stroke={isHover ? p.accentHex : 'rgba(6, 13, 32, 0.7)'}
                strokeWidth={isHover ? 1.4 : 1}
                animate={{ scale: isHover ? 1.12 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${x}px ${y}px`, filter: isHover ? 'brightness(1.15) saturate(1.1)' : 'none' }}
              />

              {/* Inner echo */}
              <polygon
                points={hexPoints(x, y, PILLAR_R - 8)}
                fill="none"
                stroke="rgba(255,255,255,0.30)"
                strokeWidth="0.6"
              />

              {/* Numeral */}
              <text
                x={x} y={y + 5}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontWeight="500"
                fontSize="20"
                letterSpacing="-0.04em"
                fill="#FFFFFF"
                opacity={isHover ? 1 : 0.95}
              >
                {num}
              </text>

              {/* Click affordance — invisible Link wrapping the whole node */}
              <a
                href={`/ecosystem/${p.slug}`}
                onClick={(e) => {
                  // Let react-router handle the in-app nav by clicking the corresponding overlay Link
                }}
              >
                <rect
                  x={x - PILLAR_R - 6}
                  y={y - PILLAR_R - 6}
                  width={(PILLAR_R + 6) * 2}
                  height={(PILLAR_R + 6) * 2}
                  fill="transparent"
                />
              </a>
            </g>
          )
        })}

        {/* Pillar labels — outside the hex, in a soft halo */}
        {pillars.map((p, i) => {
          const { x, y } = pillarPos(i)
          const dx = x - CENTER
          const dy = y - CENTER
          const len = Math.hypot(dx, dy) || 1
          const lx = x + (dx / len) * (PILLAR_R + 28)
          const ly = y + (dy / len) * (PILLAR_R + 28)
          const isHover = hover === i
          // anchor based on side
          const anchor = lx > CENTER + 30 ? 'start' : lx < CENTER - 30 ? 'end' : 'middle'
          return (
            <text
              key={`lbl-${p.slug}`}
              x={lx} y={ly}
              textAnchor={anchor}
              fontFamily="var(--font-mono)"
              fontSize="11"
              letterSpacing="0.16em"
              textTransform="uppercase"
              fill={isHover ? p.accentHex : 'rgba(200, 207, 224, 0.65)'}
              style={{ transition: 'fill 0.4s ease' }}
            >
              {p.name.toUpperCase()}
            </text>
          )
        })}
      </svg>

      {/* Overlay React-router Links so node clicks navigate properly */}
      {pillars.map((p, i) => {
        const { x, y } = pillarPos(i)
        // Convert svg coords to % of viewBox so it scales with the svg
        const left = (x / SIZE) * 100
        const top  = (y / SIZE) * 100
        return (
          <Link
            key={`hit-${p.slug}`}
            to={`/ecosystem/${p.slug}`}
            aria-label={`Open ${p.name}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onPointerDown={() => setHover(i)}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top:  `${top}%`,
              width:  `${(PILLAR_R * 2 + 12) / SIZE * 100}%`,
              height: `${(PILLAR_R * 2 + 12) / SIZE * 100}%`,
              transform: 'translate(-50%, -50%)',
              touchAction: 'manipulation',
            }}
          />
        )
      })}
    </div>
  )
}
