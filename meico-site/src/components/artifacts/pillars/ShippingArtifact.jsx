import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../../../hooks/useReducedMotion.js'

/**
 * Shipping — THE DePIN FREIGHT NETWORK.
 *
 * A pan-African mesh of sensor-equipped freight hubs (DePIN nodes)
 * linked by corridors. Containers move along the corridors carrying
 * goods; each hub emits live telemetry that rises into the MEICO chain
 * rail at the top as an immutable proof-of-delivery ledger.
 *
 * Every hub is independently hoverable — it scales, blooms a live ring,
 * and reveals its role + a "live telemetry" tag.
 */

const W = 760, H = 470
const RAIL_Y = 38

// Freight hubs, loosely spread across the continent (wide north → south point).
const N = [
  { x: 140, y: 150, label: 'LAGOS',    sub: 'Inland depot' },
  { x: 288, y: 120, label: 'KANO',     sub: 'Cross-dock' },
  { x: 472, y: 138, label: 'ADDIS',    sub: 'Corridor hub' },
  { x: 622, y: 178, label: 'MOMBASA',  sub: 'Sea port' },
  { x: 256, y: 292, label: 'KINSHASA', sub: 'River freight' },
  { x: 432, y: 316, label: 'LUSAKA',   sub: 'Cross-dock' },
  { x: 588, y: 300, label: 'DAR',      sub: 'Sea port' },
  { x: 402, y: 424, label: "JO'BURG",  sub: 'Distribution' },
]

const EDGES = [
  [0, 1], [1, 2], [2, 3], [1, 4], [4, 5],
  [5, 2], [5, 6], [6, 3], [4, 7], [7, 5], [7, 6],
]

const UPLINKS = [2, 3, 6] // hubs that write telemetry to the chain rail

// gentle perpendicular bow so corridors read as routes, not straight wires
function bow(a, b, k = 16) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
  const dx = b.x - a.x, dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  return { cx: mx + (-dy / len) * k, cy: my + (dx / len) * k }
}
function edgeD(a, b) {
  const c = bow(a, b)
  return `M ${a.x} ${a.y} Q ${c.cx} ${c.cy} ${b.x} ${b.y}`
}
function routeD(ids) {
  return ids.reduce((d, id, i) => {
    const p = N[id]
    if (i === 0) return `M ${p.x} ${p.y}`
    const c = bow(N[ids[i - 1]], p)
    return `${d} Q ${c.cx} ${c.cy} ${p.x} ${p.y}`
  }, '')
}

const ROUTES = [
  { path: routeD([0, 1, 2, 3]), dur: 7.2, delay: 0 },
  { path: routeD([4, 5, 6, 3]), dur: 6.6, delay: 1.3 },
  { path: routeD([7, 5, 2]),    dur: 5.8, delay: 2.4 },
]

function Container({ c1, c2 }) {
  return (
    <g transform="translate(-15,-11)">
      <rect width="30" height="22" rx="2.5" fill={c2} stroke={c1} strokeWidth="1" filter="url(#s-glow)" />
      <rect x="4"  y="3" width="2.5" height="16" fill="rgba(0,0,0,0.22)" />
      <rect x="10" y="3" width="2.5" height="16" fill="rgba(0,0,0,0.22)" />
      <rect x="16" y="3" width="2.5" height="16" fill="rgba(0,0,0,0.22)" />
      <rect x="22" y="3" width="2.5" height="16" fill="rgba(0,0,0,0.22)" />
      {/* on-board DePIN sensor */}
      <circle cx="15" cy="-3" r="2.2" fill="#E9C063" filter="url(#s-glow)" />
    </g>
  )
}

export default function ShippingArtifact({ c1 = '#34D399', c2 = '#10B981' }) {
  const reduced = useReducedMotionPreference()
  const [hover, setHover] = useState(null)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="s-grad" x1="0" x2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <linearGradient id="s-rail" x1="0" x2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="12%" stopColor="#E9C063" />
          <stop offset="88%" stopColor="#E9C063" />
          <stop offset="100%" stopColor="transparent" />
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

      {/* ── MEICO CHAIN — immutable freight ledger rail ───────────── */}
      <text x={W / 2} y={20} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.24em" fill="rgba(233,192,99,0.85)">
        MEICO CHAIN — IMMUTABLE FREIGHT LEDGER
      </text>
      <line x1="60" y1={RAIL_Y} x2={W - 60} y2={RAIL_Y} stroke="url(#s-rail)" strokeWidth="1.4" strokeDasharray="2 5" />
      {Array.from({ length: 11 }).map((_, i) => {
        const x = 90 + i * 58
        return (
          <motion.rect
            key={`blk${i}`}
            x={x} y={RAIL_Y - 4} width="9" height="8" rx="1.5"
            fill="rgba(15,31,66,0.95)" stroke="#E9C063" strokeWidth="1"
            initial={reduced ? false : { opacity: 0.35 }}
            animate={reduced ? false : { opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
          />
        )
      })}

      {/* ── corridors ─────────────────────────────────────────────── */}
      {EDGES.map(([a, b], i) => (
        <motion.path
          key={`e${i}`}
          d={edgeD(N[a], N[b])}
          fill="none"
          stroke="url(#s-grad)"
          strokeWidth={hover === a || hover === b ? 2 : 1.2}
          strokeDasharray="3 6"
          opacity={hover === a || hover === b ? 0.95 : 0.5}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={reduced ? false : { pathLength: 1, opacity: hover === a || hover === b ? 0.95 : 0.5 }}
          transition={{ duration: 1.4, delay: 0.2 + i * 0.06, ease: 'easeOut' }}
          style={{ transition: 'stroke-width 0.3s ease, opacity 0.3s ease' }}
        />
      ))}

      {/* ── telemetry uplinks: hub → chain rail ───────────────────── */}
      {UPLINKS.map((id, i) => {
        const p = N[id]
        const up = `M ${p.x} ${p.y} L ${p.x} ${RAIL_Y}`
        return (
          <g key={`u${id}`}>
            <line x1={p.x} y1={p.y} x2={p.x} y2={RAIL_Y} stroke="rgba(233,192,99,0.28)" strokeWidth="1" strokeDasharray="2 5" />
            {!reduced && [0, 0.6].map((d, k) => (
              <motion.circle
                key={k}
                r="2.6" fill="#E9C063" filter="url(#s-glow)"
                animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5 + d * 1.3, ease: 'easeIn' }}
                style={{ offsetPath: `path("${up}")` }}
              />
            ))}
          </g>
        )
      })}

      {/* ── containers in motion along the primary corridors ──────── */}
      {ROUTES.map((r, i) => (
        reduced ? (
          <g key={`c${i}`} transform={`translate(${N[i === 0 ? 0 : i === 1 ? 4 : 7].x},${N[i === 0 ? 0 : i === 1 ? 4 : 7].y})`}>
            <Container c1={c1} c2={c2} />
          </g>
        ) : (
          <motion.g
            key={`c${i}`}
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: r.dur, repeat: Infinity, delay: r.delay, ease: 'linear' }}
            style={{ offsetPath: `path("${r.path}")`, offsetRotate: '0deg' }}
          >
            <Container c1={c1} c2={c2} />
          </motion.g>
        )
      ))}

      {/* ── freight hubs (DePIN nodes) — each hoverable ───────────── */}
      {N.map((p, i) => {
        const isHover = hover === i
        return (
          <g
            key={p.label}
            style={{ cursor: 'pointer', touchAction: 'manipulation' }}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onPointerDown={() => setHover(i)}
          >
            <circle cx={p.x} cy={p.y} r="38" fill="transparent" />
            {/* live pulse ring */}
            {!reduced && (
              <motion.circle
                cx={p.x} cy={p.y} fill="none" stroke={c1} strokeWidth="1"
                animate={isHover
                  ? { r: 26, opacity: 0.5 }
                  : { r: [13, 22, 13], opacity: [0.4, 0, 0.4] }}
                transition={isHover ? { duration: 0.3 } : { duration: 2.8, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
              />
            )}
            <motion.circle
              cx={p.x} cy={p.y}
              fill="rgba(15, 31, 66, 0.92)"
              stroke={c1}
              animate={{ r: isHover ? 18 : 13, strokeWidth: isHover ? 2 : 1.4 }}
              transition={{ duration: 0.3 }}
              filter={isHover ? 'url(#s-glow-strong)' : 'url(#s-glow)'}
            />
            <motion.circle
              cx={p.x} cy={p.y} fill={c1}
              animate={{ r: isHover ? 6.5 : 4.5 }}
              transition={{ duration: 0.3 }}
            />
            <text x={p.x} y={p.y - 26} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.2em" fill={isHover ? '#FFFFFF' : '#A7F3D0'} pointerEvents="none" style={{ transition: 'fill 0.3s ease' }}>
              {p.label}
            </text>
            <text x={p.x} y={p.y + 32} textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" fill="rgba(255,255,255,0.72)" letterSpacing="-0.01em" pointerEvents="none">
              {p.sub}
            </text>
            {isHover && (
              <text x={p.x} y={p.y + 46} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="0.16em" fill="#E9C063" pointerEvents="none">
                ● LIVE TELEMETRY
              </text>
            )}
          </g>
        )
      })}

      {/* ── caption ───────────────────────────────────────────────── */}
      <text x={W / 2} y={H - 8} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="rgba(52,211,153,0.85)">
        DePIN FREIGHT NETWORK · GOODS IN MOTION → PROOF ON CHAIN
      </text>
    </svg>
  )
}
