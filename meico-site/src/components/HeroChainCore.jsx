import { useRef, useState } from 'react'
import {
  motion, useScroll, useTransform, useMotionValue, useSpring,
} from 'framer-motion'
import { useReducedMotionPreference } from '../hooks/useReducedMotion.js'

/**
 * HeroChainCore — the homepage signature artifact.
 *
 * A living "Layer-0 chain core": a glowing MEICO hex at the centre,
 * six satellite hex-nodes orbiting on a hexagonal ring, connection
 * lines between them, and data packets continuously streaming INWARD
 * to the core — the chain visibly *settling* everything around it.
 *
 * Every piece is interactive:
 *   · hover the core    → it scales + the whole halo intensifies
 *   · hover a satellite → it lifts, its halo blooms, its connection
 *     line lights up in full colour and its inbound packet brightens
 *   (pointer events, so it also responds to tap on touch devices)
 *
 * Plus: mouse-parallax 3D tilt, scroll-linked rotation, and a full
 * reduced-motion fallback.
 */

// Each satellite carries a pillar logo (now transparent-bg PNGs) and
// wears that pillar's accent colour.
const SATS = [
  { color: '#4F8AF6', icon: '/pillar-icons/research-institute.png' },
  { color: '#F59E0B', icon: '/pillar-icons/shipping.png' },
  { color: '#06B6D4', icon: '/pillar-icons/exchange.png' },
  { color: '#A855F7', icon: '/pillar-icons/meico-pay.png' },
  { color: '#22C55E', icon: '/pillar-icons/energy.png' },
  { color: '#60A5FA', icon: '/pillar-icons/tokenization.png' },
]
const ICON_SIZE = 21

const VB = 440
const C = VB / 2
const ORBIT = 165
const CORE_R = 54
const SAT_R = 17

function hex(cx, cy, r, rot = -Math.PI / 2) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const a = rot + (Math.PI / 3) * i
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

export default function HeroChainCore({ size = 680 }) {
  const reduced = useReducedMotionPreference()
  const ref = useRef(null)
  const [hover, setHover] = useState(null) // 'core' | satellite index | null

  // scroll-linked slow rotation of the whole piece
  const { scrollY } = useScroll()
  const scrollRot = useTransform(scrollY, [0, 800], [0, 48])

  // mouse parallax — 3D tilt toward cursor
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const tiltX = useSpring(useTransform(mvY, [-0.5, 0.5], [12, -12]), { stiffness: 70, damping: 16 })
  const tiltY = useSpring(useTransform(mvX, [-0.5, 0.5], [-12, 12]), { stiffness: 70, damping: 16 })

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mvX.set((e.clientX - r.left) / r.width - 0.5)
    mvY.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    mvX.set(0)
    mvY.set(0)
  }

  // satellite positions (hexagonal vertices)
  const sats = SATS.map((s, i) => {
    const a = -Math.PI / 2 + (Math.PI / 3) * i
    return { ...s, x: C + ORBIT * Math.cos(a), y: C + ORBIT * Math.sin(a) }
  })

  const coreHover = hover === 'core'

  return (
    <div
      ref={ref}
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={reduced ? undefined : onLeave}
      className="relative select-none"
      style={{ width: size, height: size, perspective: 1200 }}
    >
      {/* 3D-tilt wrapper */}
      <motion.div
        className="relative w-full h-full"
        style={{ rotateX: reduced ? 0 : tiltX, rotateY: reduced ? 0 : tiltY, transformStyle: 'preserve-3d' }}
      >
        {/* scroll-rotation wrapper */}
        <motion.div className="relative w-full h-full" style={{ rotate: reduced ? 0 : scrollRot }}>

          {/* ---- Layer 1: ambient conic sweep, hex-clipped, blurred ---- */}
          <div className="absolute inset-[14%] hex overflow-hidden">
            <motion.div
              className="absolute inset-[-35%] spin-slow"
              style={{
                background:
                  'conic-gradient(from 0deg, #3B82F6, #22D3EE, #E9C063, #A855F7, #22C55E, #3B82F6)',
                filter: 'blur(54px) saturate(1.3)',
                willChange: 'transform',
              }}
              animate={{ opacity: hover !== null ? 0.95 : 0.8 }}
              transition={{ duration: 0.5 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(6,13,32,0.62) 0%, transparent 62%)',
              }}
            />
          </div>

          {/* ---- Layer 2: soft outer halo ---- */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 62% 62% at 50% 50%, rgba(59,130,246,0.30), transparent 72%)',
              filter: 'blur(36px)',
            }}
            animate={{ opacity: coreHover ? 1.5 : 1, scale: coreHover ? 1.08 : 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* ---- Layer 3: SVG composition ---- */}
          <svg
            viewBox={`0 0 ${VB} ${VB}`}
            className="absolute inset-0 w-full h-full"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="hcc-core" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#E9C063" />
              </linearGradient>
              {sats.map((s, i) => (
                <radialGradient id={`hcc-sat-${i}`} key={i} cx="50%" cy="42%" r="62%">
                  <stop offset="0%" stopColor={s.color} />
                  <stop offset="100%" stopColor="#0B1733" />
                </radialGradient>
              ))}
              <filter id="hcc-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="hcc-glow-soft" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="9" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* counter-rotating dashed rings */}
            <motion.circle
              cx={C} cy={C} r={ORBIT + 28}
              fill="none" stroke="rgba(233,192,99,0.22)" strokeWidth="1" strokeDasharray="1.5 7"
              style={{ transformOrigin: `${C}px ${C}px` }}
              animate={reduced ? undefined : { rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              cx={C} cy={C} r={ORBIT - 4}
              fill="none" stroke="rgba(96,165,250,0.20)" strokeWidth="1" strokeDasharray="3 6"
              style={{ transformOrigin: `${C}px ${C}px` }}
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
            />

            {/* settlement pulses — hex outlines expanding from the core */}
            {!reduced && [0, 1].map((k) => (
              <motion.polygon
                key={`pulse-${k}`}
                points={hex(C, C, 1)}
                fill="none"
                stroke="#22D3EE"
                strokeWidth="1.2"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                animate={{
                  scale: [CORE_R, ORBIT + 10],
                  opacity: [0.55, 0],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  delay: k * 2.4,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* orbiting constellation — lines + nodes + inbound packets */}
            <motion.g
              style={{ transformOrigin: `${C}px ${C}px` }}
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
            >
              {sats.map((s, i) => {
                const isHover = hover === i
                return (
                  <g key={i}>
                    {/* connection line — full colour on hover */}
                    <line
                      x1={C} y1={C} x2={s.x} y2={s.y}
                      stroke={isHover ? s.color : `${s.color}55`}
                      strokeWidth={isHover ? 1.8 : 1}
                      strokeDasharray="2 4"
                      style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                    />
                    {/* inbound data packet — satellite → core (settlement) */}
                    {!reduced && (
                      <motion.circle
                        r={isHover ? 4.2 : 3}
                        fill={isHover ? '#FFFFFF' : s.color}
                        filter="url(#hcc-glow)"
                        initial={{ cx: s.x, cy: s.y, opacity: 0 }}
                        animate={{
                          cx: [s.x, C],
                          cy: [s.y, C],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: isHover ? 1.4 : 2.6,
                          times: [0, 0.12, 0.82, 1],
                          repeat: Infinity,
                          delay: i * 0.42,
                          ease: 'easeIn',
                        }}
                      />
                    )}
                    {/* satellite node — hoverable, breathing hex, pillar logo */}
                    <g
                      style={{ cursor: 'pointer', touchAction: 'manipulation' }}
                      onPointerEnter={() => setHover(i)}
                      onPointerLeave={() => setHover(null)}
                      onPointerDown={() => setHover(i)}
                    >
                      {/* wide invisible hit zone */}
                      <circle cx={s.x} cy={s.y} r={SAT_R + 16} fill="transparent" />
                      <motion.g
                        style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                        animate={
                          reduced
                            ? { scale: isHover ? 1.28 : 1 }
                            : { scale: isHover ? 1.32 : [1, 1.12, 1] }
                        }
                        transition={
                          isHover
                            ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                            : { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }
                        }
                      >
                        <circle
                          cx={s.x} cy={s.y} r={SAT_R + 8}
                          fill={s.color}
                          opacity={isHover ? 0.5 : 0.14}
                          filter="url(#hcc-glow-soft)"
                          style={{ transition: 'opacity 0.3s ease' }}
                        />
                        <polygon
                          points={hex(s.x, s.y, SAT_R)}
                          fill={`url(#hcc-sat-${i})`}
                          stroke={s.color}
                          strokeWidth={isHover ? 2 : 1.1}
                          style={{ transition: 'stroke-width 0.3s ease' }}
                        />
                        {/* dark inner disc so the logo always reads */}
                        <circle cx={s.x} cy={s.y} r={SAT_R - 2.5} fill="rgba(6,13,32,0.72)" />
                        {/* pillar logo — counter-rotates so it stays upright
                            while the constellation orbits */}
                        <motion.g
                          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                          animate={reduced ? undefined : { rotate: -360 }}
                          transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
                        >
                          <image
                            href={s.icon}
                            x={s.x - ICON_SIZE / 2}
                            y={s.y - ICON_SIZE / 2}
                            width={ICON_SIZE}
                            height={ICON_SIZE}
                            style={{ pointerEvents: 'none' }}
                          />
                        </motion.g>
                      </motion.g>
                    </g>
                  </g>
                )
              })}
            </motion.g>

            {/* ---- core hex — hoverable ---- */}
            <motion.g
              style={{ transformOrigin: `${C}px ${C}px`, cursor: 'pointer', touchAction: 'manipulation' }}
              onPointerEnter={() => setHover('core')}
              onPointerLeave={() => setHover(null)}
              onPointerDown={() => setHover('core')}
              animate={
                reduced
                  ? { scale: coreHover ? 1.12 : 1 }
                  : { scale: coreHover ? 1.14 : [1, 1.045, 1] }
              }
              transition={
                coreHover
                  ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              {/* wide hit zone */}
              <circle cx={C} cy={C} r={CORE_R + 14} fill="transparent" />
              {/* core glow */}
              <circle
                cx={C} cy={C} r={CORE_R + 22}
                fill="#22D3EE"
                opacity={coreHover ? 0.34 : 0.16}
                filter="url(#hcc-glow-soft)"
                style={{ transition: 'opacity 0.35s ease' }}
              />
              {/* filled core */}
              <polygon
                points={hex(C, C, CORE_R)}
                fill="url(#hcc-core)"
                filter="url(#hcc-glow)"
              />
              {/* inner echo */}
              <polygon
                points={hex(C, C, CORE_R - 11)}
                fill="none"
                stroke="rgba(6,13,32,0.55)"
                strokeWidth="1.4"
              />
              {/* brand mark — stylised hex-M */}
              <g transform={`translate(${C - 26}, ${C - 24})`}>
                <path
                  d="M 2 34 L 2 16 L 16 8 L 26 16 L 36 8 L 50 16 L 50 34"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="26" y="50"
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="7"
                  letterSpacing="2.4"
                  fill="rgba(255,255,255,0.92)"
                >
                  MEICO
                </text>
              </g>
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
