import { useState } from 'react'
import { motion } from 'framer-motion'
import { MaskWord } from '../MaskReveal.jsx'

/**
 * RoadmapHero — THE PATH.
 *
 * The hero IS the start of the journey: a winding SVG path sweeps from
 * the title down into the page, threaded with six phase nodes. Phase 1
 * pulses (active), a light packet travels the whole route, and the path
 * fades out at the bottom edge — pulling the eye into the page.
 *
 * Every phase node is hoverable: it scales up, its hex fills with the
 * route gradient, and its label brightens (pointer events → tap too).
 */
const NODES = [
  { x: 90,  y: 70,  label: 'PRE-SALE',     active: true },
  { x: 290, y: 130, label: 'INFRA' },
  { x: 470, y: 90,  label: 'B2B + CEX' },
  { x: 640, y: 160, label: 'DAO' },
  { x: 830, y: 110, label: 'INSTITUTE' },
  { x: 1010, y: 180, label: 'GLOBAL' },
]

export default function RoadmapHero({ kicker, intro }) {
  const [hover, setHover] = useState(null)
  const W = 1100, H = 240
  const path = NODES.reduce((d, n, i) => {
    if (i === 0) return `M ${n.x} ${n.y}`
    const p = NODES[i - 1]
    const mx = (p.x + n.x) / 2
    return `${d} C ${mx} ${p.y}, ${mx} ${n.y}, ${n.x} ${n.y}`
  }, '')

  return (
    <section className="page-hero-fit relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(34,211,238,0.16), transparent 65%)' }}
      />

      <div className="container-edge relative py-8">
        <motion.p
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mono text-cyan-400 text-[0.62rem] inline-flex items-center gap-2.5"
        >
          <span className="block w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 8px #22D3EE' }} />
          — {kicker}
        </motion.p>
        <h1 className="display-xl text-paper mt-5 max-w-3xl">
          <MaskWord delay={0.05}>Six phases,</MaskWord>{' '}
          <MaskWord delay={0.25}><span className="italic-accent">one continent.</span></MaskWord>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-7 text-paper-dim text-[16px] leading-[1.8] max-w-xl"
        >
          {intro}
        </motion.p>

        {/* Mobile — a compact row of phase hex-chips (the wide path
            would shrink to illegibility on a phone). */}
        <div className="md:hidden mt-8 flex flex-wrap gap-2.5">
          {NODES.map((n, i) => (
            <motion.span
              key={n.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 glass clip-corner px-3 py-2"
              style={{ borderColor: n.active ? 'rgba(34,211,238,0.5)' : undefined }}
            >
              <span
                className="font-display text-[12px] flex items-center justify-center w-6 h-6"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'rgba(11,23,51,0.95)',
                  border: `1.4px solid ${n.active ? '#22D3EE' : 'rgba(96,165,250,0.45)'}`,
                  color: '#fff',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="mono text-[0.52rem] tracking-[0.14em]"
                style={{ color: n.active ? '#22D3EE' : 'rgba(200,207,224,0.7)' }}
              >
                {n.label}
              </span>
            </motion.span>
          ))}
        </div>

        {/* Desktop — the weaving path */}
        <div className="hidden md:block mt-10 md:mt-14 relative">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            style={{
              overflow: 'visible',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 65%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, #000 65%, transparent 100%)',
            }}
          >
            <defs>
              <linearGradient id="rm-path" x1="0" x2="1">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="55%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
              <filter id="rm-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* base path */}
            <motion.path
              d={path} fill="none" stroke="url(#rm-path)" strokeWidth="2" strokeDasharray="4 7"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            />

            {/* travelling packet */}
            <motion.circle
              r="4.5" fill="#FFFFFF" filter="url(#rm-glow)"
              animate={{ offsetDistance: ['0%', '100%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ offsetPath: `path("${path}")` }}
            />

            {/* phase nodes — glass hexes, each hoverable */}
            {NODES.map((n, i) => {
              const r = 22
              const isHover = hover === i
              const pts = []
              for (let k = 0; k < 6; k++) {
                const a = (Math.PI / 3) * k - Math.PI / 2
                pts.push(`${(n.x + r * Math.cos(a)).toFixed(1)},${(n.y + r * Math.sin(a)).toFixed(1)}`)
              }
              return (
                <motion.g
                  key={n.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: isHover ? 1.22 : 1 }}
                  transition={{ duration: 0.5, delay: isHover ? 0 : 0.4 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: 'pointer', touchAction: 'manipulation' }}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  onPointerDown={() => setHover(i)}
                >
                  {/* wide hit zone */}
                  <circle cx={n.x} cy={n.y} r={r + 14} fill="transparent" />
                  {(n.active || isHover) && (
                    <motion.circle
                      cx={n.x} cy={n.y} r={r + 6}
                      fill="#22D3EE"
                      animate={
                        isHover
                          ? { opacity: 0.4, r: r + 14 }
                          : { opacity: [0.10, 0.30, 0.10], r: [r + 4, r + 12, r + 4] }
                      }
                      transition={isHover ? { duration: 0.3 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <polygon
                    points={pts.join(' ')}
                    fill={isHover ? 'url(#rm-path)' : 'rgba(15,31,66,0.85)'}
                    stroke={isHover ? '#FFFFFF' : n.active ? '#22D3EE' : 'rgba(96,165,250,0.45)'}
                    strokeWidth={isHover ? 2 : n.active ? 1.8 : 1.2}
                    style={{ transition: 'stroke 0.3s ease' }}
                  />
                  <text
                    x={n.x} y={n.y + 4} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize="13" fontWeight="500" fill="#FFFFFF"
                    pointerEvents="none"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </text>
                  <text
                    x={n.x} y={n.y + r + 16} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.16em"
                    fill={isHover ? '#FFFFFF' : n.active ? '#22D3EE' : 'rgba(200,207,224,0.6)'}
                    pointerEvents="none"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {n.label}
                  </text>
                  {n.active && (
                    <text
                      x={n.x} y={n.y - r - 10} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="0.22em" fill="#22D3EE"
                      pointerEvents="none"
                    >
                      ● ACTIVE
                    </text>
                  )}
                </motion.g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
