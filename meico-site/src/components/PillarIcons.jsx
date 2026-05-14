/**
 * PillarIcons — original SVG icon set, drawn fresh for MEICO.
 *
 * Every icon is built around the hexagonal house-M motif of the brand mark.
 * Each accepts a `color` (and optional `color2` for gradient fusion) plus
 * a `size`. The strokes are 1.3px so the icons read crisp at 24–96px.
 *
 * Visual language:
 *  · Research Institute → atom with hex orbits (knowledge → industry)
 *  · B2B Marketplace    → network of hex nodes (partners connected)
 *  · Exchange (CEX/DEX) → twin arcing arrows around a centre hex
 *  · MeicoPay           → hex wallet with a coin emerging
 *  · Tokenization       → large asset fracturing into 4 hex slices
 *  · Shipping           → hex with a route line through waypoint dots
 *  · Energy             → lightning bolt cleaving a hex (renewable lift)
 */

import { motion } from 'framer-motion'

// Slight stroke-draw-in animation on mount — reset by remounting on route change.
const drawAnim = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.4, delay, ease: [0.21, 0.47, 0.32, 0.98] },
})

// A reusable hex-stroke path constant (centred on 32,32, radius 22)
function hexPoints(cx = 32, cy = 32, r = 22) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return pts.map((p) => p.join(',')).join(' ')
}

function Frame({ size, color, color2, children, gradientId }) {
  const grad = color2 || color
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={grad} />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {children}
    </svg>
  )
}

// ============= 1 · RESEARCH INSTITUTE — atom with hex orbits =====
export function IconResearch({ size = 64, color = '#4F8AF6', color2 = '#8B5CF6' }) {
  const id = 'g-research'
  return (
    <Frame size={size} color={color} color2={color2} gradientId={id}>
      <g filter={`url(#${id}-glow)`}>
        {/* Central hex nucleus */}
        <motion.polygon
          points={hexPoints(32, 32, 8)}
          fill={`url(#${id})`}
          fillOpacity="0.85"
          stroke={`url(#${id})`}
          strokeWidth="1.3"
          strokeLinejoin="round"
          {...drawAnim(0)}
        />
        {/* Three elliptical orbits at 0°, 60°, -60° */}
        {[0, 60, -60].map((deg, i) => (
          <motion.ellipse
            key={deg}
            cx="32" cy="32" rx="22" ry="9"
            transform={`rotate(${deg} 32 32)`}
            stroke={`url(#${id})`}
            strokeWidth="1"
            strokeOpacity="0.85"
            {...drawAnim(0.15 * (i + 1))}
          />
        ))}
        {/* Electron dots */}
        {[
          [54, 32],
          [22, 14],
          [22, 50],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="1.8"
            fill={`url(#${id})`}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
          />
        ))}
      </g>
    </Frame>
  )
}

// ============= 2 · B2B MARKETPLACE — network of hex nodes ========
export function IconB2B({ size = 64, color = '#38BDF8', color2 = '#06B6D4' }) {
  const id = 'g-b2b'
  // Four hex nodes at corners + centre
  const nodes = [
    [12, 16], [52, 16],
    [12, 48], [52, 48],
    [32, 32],
  ]
  return (
    <Frame size={size} color={color} color2={color2} gradientId={id}>
      <g filter={`url(#${id}-glow)`}>
        {/* Connecting lines from centre to corners */}
        {nodes.slice(0, 4).map(([x, y], i) => (
          <motion.line
            key={i}
            x1="32" y1="32" x2={x} y2={y}
            stroke={`url(#${id})`}
            strokeWidth="1"
            strokeOpacity="0.6"
            {...drawAnim(i * 0.08)}
          />
        ))}
        {/* Corner hex nodes */}
        {nodes.slice(0, 4).map(([x, y], i) => (
          <motion.polygon
            key={i}
            points={hexPoints(x, y, 6)}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="1.3"
            strokeLinejoin="round"
            {...drawAnim(0.3 + i * 0.08)}
          />
        ))}
        {/* Centre filled hex */}
        <motion.polygon
          points={hexPoints(32, 32, 8)}
          fill={`url(#${id})`}
          fillOpacity="0.85"
          stroke={`url(#${id})`}
          strokeWidth="1.3"
          strokeLinejoin="round"
          {...drawAnim(0.55)}
        />
        {/* Pulsing centre dot */}
        <motion.circle
          cx="32" cy="32" r="2"
          fill="#FFFFFF"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>
    </Frame>
  )
}

// ============= 3 · EXCHANGE (CEX & DEX) — twin arcing arrows =====
export function IconExchange({ size = 64, color = '#06B6D4', color2 = '#14B8A6' }) {
  const id = 'g-exchange'
  return (
    <Frame size={size} color={color} color2={color2} gradientId={id}>
      <g filter={`url(#${id}-glow)`}>
        {/* Outer hex frame */}
        <motion.polygon
          points={hexPoints(32, 32, 24)}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinejoin="round"
          {...drawAnim(0)}
        />
        {/* Top arc + arrow head (clockwise) */}
        <motion.path
          d="M 14 24 A 18 18 0 0 1 50 24"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          {...drawAnim(0.15)}
        />
        <motion.path
          d="M 46 18 L 51 23 L 46 28"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...drawAnim(0.45)}
        />
        {/* Bottom arc + arrow head (counter) */}
        <motion.path
          d="M 50 40 A 18 18 0 0 1 14 40"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          {...drawAnim(0.25)}
        />
        <motion.path
          d="M 18 46 L 13 41 L 18 36"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...drawAnim(0.55)}
        />
        {/* Centre hex coin */}
        <motion.polygon
          points={hexPoints(32, 32, 6)}
          fill={`url(#${id})`}
          fillOpacity="0.9"
          stroke={`url(#${id})`}
          strokeWidth="1"
          strokeLinejoin="round"
          {...drawAnim(0.65)}
        />
      </g>
    </Frame>
  )
}

// ============= 4 · MEICOPAY — hex wallet with coin emerging =====
export function IconPay({ size = 64, color = '#A855F7', color2 = '#EC4899' }) {
  const id = 'g-pay'
  return (
    <Frame size={size} color={color} color2={color2} gradientId={id}>
      <g filter={`url(#${id}-glow)`}>
        {/* Wallet body — slightly rounded rect with notch on the right */}
        <motion.path
          d="M 10 22 L 52 22 L 52 30 L 56 30 L 56 38 L 52 38 L 52 46 L 10 46 Z"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.4"
          strokeLinejoin="round"
          {...drawAnim(0)}
        />
        {/* Wallet flap edge */}
        <motion.line
          x1="10" y1="26" x2="52" y2="26"
          stroke={`url(#${id})`}
          strokeWidth="1"
          strokeOpacity="0.55"
          {...drawAnim(0.18)}
        />
        {/* Coin in the chip slot */}
        <motion.circle
          cx="50" cy="34" r="3"
          fill={`url(#${id})`}
          fillOpacity="0.95"
          {...drawAnim(0.35)}
        />
        {/* Hex chip — central */}
        <motion.polygon
          points={hexPoints(24, 34, 5)}
          fill={`url(#${id})`}
          fillOpacity="0.4"
          stroke={`url(#${id})`}
          strokeWidth="1.2"
          strokeLinejoin="round"
          {...drawAnim(0.45)}
        />
        {/* Sparkle next to wallet */}
        <motion.g
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.05, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '15px 16px' }}
        >
          <line x1="15" y1="12" x2="15" y2="20" stroke={`url(#${id})`} strokeWidth="1" strokeLinecap="round" />
          <line x1="11" y1="16" x2="19" y2="16" stroke={`url(#${id})`} strokeWidth="1" strokeLinecap="round" />
        </motion.g>
      </g>
    </Frame>
  )
}

// ============= 5 · TOKENIZATION — large asset fractures to 4 ====
export function IconTokenization({ size = 64, color = '#60A5FA', color2 = '#818CF8' }) {
  const id = 'g-token'
  // Four small hexes around centre, drifting outward — implies fracturing
  const drift = [
    [-10, -10], [10, -10],
    [-10, 10],  [10, 10],
  ]
  return (
    <Frame size={size} color={color} color2={color2} gradientId={id}>
      <g filter={`url(#${id}-glow)`}>
        {/* Large faint base hex — the asset before tokenisation */}
        <motion.polygon
          points={hexPoints(32, 32, 22)}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="0.9"
          strokeOpacity="0.28"
          strokeDasharray="3 3"
          strokeLinejoin="round"
          {...drawAnim(0)}
        />
        {/* Four small hexes, drifting outward at corners */}
        {drift.map(([dx, dy], i) => (
          <motion.g key={i}>
            <motion.polygon
              points={hexPoints(32 + dx, 32 + dy, 7)}
              fill={`url(#${id})`}
              fillOpacity="0.85"
              stroke={`url(#${id})`}
              strokeWidth="1.2"
              strokeLinejoin="round"
              initial={{ opacity: 0, x: -dx * 0.4, y: -dy * 0.4 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.3 + i * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            />
          </motion.g>
        ))}
      </g>
    </Frame>
  )
}

// ============= 6 · SHIPPING — hex with routed path + waypoints ===
export function IconShipping({ size = 64, color = '#F59E0B', color2 = '#F97316' }) {
  const id = 'g-shipping'
  // S-curve route waypoints
  const waypoints = [
    [12, 24],
    [26, 18],
    [38, 38],
    [52, 32],
  ]
  return (
    <Frame size={size} color={color} color2={color2} gradientId={id}>
      <g filter={`url(#${id}-glow)`}>
        {/* Background hex frame */}
        <motion.polygon
          points={hexPoints(32, 32, 24)}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="0.9"
          strokeOpacity="0.3"
          strokeLinejoin="round"
          {...drawAnim(0)}
        />
        {/* S-curve route — bezier through waypoints */}
        <motion.path
          d="M 12 24 Q 19 16, 26 18 T 38 38 T 52 32"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          {...drawAnim(0.15)}
        />
        {/* Waypoint dots */}
        {waypoints.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r={i === 0 || i === waypoints.length - 1 ? 2.6 : 1.8}
            fill={`url(#${id})`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: 'easeOut' }}
          />
        ))}
        {/* Tiny container on route — slides along the path */}
        <motion.g
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        >
          <motion.rect
            x="-3" y="-2" width="6" height="4"
            fill={`url(#${id})`}
            initial={{ x: 12, y: 24 }}
            animate={{ x: [12, 26, 38, 52], y: [24, 18, 38, 32] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
          />
        </motion.g>
      </g>
    </Frame>
  )
}

// ============= 7 · ENERGY — lightning cleaves a hex =============
export function IconEnergy({ size = 64, color = '#22C55E', color2 = '#84CC16' }) {
  const id = 'g-energy'
  return (
    <Frame size={size} color={color} color2={color2} gradientId={id}>
      <g filter={`url(#${id}-glow)`}>
        {/* Hex frame */}
        <motion.polygon
          points={hexPoints(32, 32, 22)}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.3"
          strokeLinejoin="round"
          {...drawAnim(0)}
        />
        {/* Lightning bolt — sharp diagonal through */}
        <motion.path
          d="M 34 14 L 22 34 L 30 34 L 28 50 L 42 28 L 34 28 Z"
          fill={`url(#${id})`}
          fillOpacity="0.9"
          stroke={`url(#${id})`}
          strokeWidth="1.2"
          strokeLinejoin="round"
          {...drawAnim(0.25)}
        />
        {/* Tiny leaf next to bolt — renewable cue */}
        <motion.path
          d="M 47 44 Q 52 39, 54 43 Q 52 47, 47 44 Z"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1"
          strokeLinejoin="round"
          {...drawAnim(0.5)}
        />
        {/* Leaf vein */}
        <motion.line
          x1="48" y1="45" x2="53" y2="42"
          stroke={`url(#${id})`}
          strokeWidth="0.8"
          {...drawAnim(0.6)}
        />
      </g>
    </Frame>
  )
}

// ============= Lookup by pillar slug ==============================
export const ICON_BY_SLUG = {
  'research-institute': IconResearch,
  'b2b':                IconB2B,
  'exchange':           IconExchange,
  'meico-pay':          IconPay,
  'tokenization':       IconTokenization,
  'shipping':           IconShipping,
  'energy':             IconEnergy,
}

export default function PillarIcon({ slug, size = 64, color, color2 }) {
  const Cmp = ICON_BY_SLUG[slug]
  if (!Cmp) return null
  return <Cmp size={size} color={color} color2={color2} />
}
