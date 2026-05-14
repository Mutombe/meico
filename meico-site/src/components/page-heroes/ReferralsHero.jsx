import { useState } from 'react'
import { motion } from 'framer-motion'
import { MaskWord } from '../MaskReveal.jsx'

/**
 * ReferralsHero — THE MULTIPLY TREE.
 *
 * A monumental gradient "10%" anchors the left. To the right a single
 * node branches outward into many — the referral tree — with reward
 * packets flowing back down the branches to the root.
 *
 * Every node is hoverable — root, tier-1 and tier-2 — scaling and
 * blooming on pointer enter / tap.
 */
export default function ReferralsHero({ kicker, intro }) {
  const [hover, setHover] = useState(null) // 'root' | 't1-i' | 't2-i'
  // tree geometry: root left-centre, branches fan right
  const root = { x: 60, y: 170 }
  const tier1 = [
    { x: 200, y: 80 },
    { x: 200, y: 170 },
    { x: 200, y: 260 },
  ]
  const tier2 = [
    { x: 360, y: 45 }, { x: 360, y: 110 },
    { x: 360, y: 150 }, { x: 360, y: 195 },
    { x: 360, y: 235 }, { x: 360, y: 295 },
  ]
  const edges1 = tier1.map((n) => ({ a: root, b: n }))
  const edges2 = tier2.map((n, i) => ({ a: tier1[Math.floor(i / 2)], b: n }))

  return (
    <section className="page-hero-fit relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(59,130,246,0.16), transparent 65%)' }}
      />

      <div className="container-edge relative py-8 grid lg:grid-cols-[0.85fr_1.1fr] gap-10 lg:gap-14 items-center">
        {/* LEFT — copy + monumental 10% */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mono text-electric-300 text-[0.62rem] inline-flex items-center gap-2.5"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-electric-400" style={{ boxShadow: '0 0 8px #60A5FA' }} />
            — {kicker}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex items-start gap-3"
          >
            <span
              className="font-display leading-[0.82]"
              style={{
                fontSize: 'clamp(96px, 13vw, 184px)', fontWeight: 500, letterSpacing: '-0.05em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 55%, #22D3EE 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
              }}
            >
              10%
            </span>
            <span className="mono text-brass-400 text-[0.6rem] tracking-[0.2em] pt-3">
              BONUS<br />IN MEICO
            </span>
          </motion.div>

          <h1 className="hero-title text-paper mt-2 max-w-md">
            <MaskWord delay={0.3}>Bring a friend,</MaskWord>{' '}
            <MaskWord delay={0.5}><span className="italic-accent">earn on every contribution.</span></MaskWord>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 text-paper-dim text-[15.5px] leading-[1.8] max-w-md"
          >
            {intro}
          </motion.p>
        </div>

        {/* RIGHT — multiply tree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 420 340" className="w-full h-auto" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="rf-edge" x1="0" x2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
              <filter id="rf-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* edges */}
            {[...edges1, ...edges2].map((e, i) => {
              const d = `M ${e.a.x} ${e.a.y} C ${(e.a.x + e.b.x) / 2} ${e.a.y}, ${(e.a.x + e.b.x) / 2} ${e.b.y}, ${e.b.x} ${e.b.y}`
              return (
                <g key={i}>
                  <motion.path
                    d={d} fill="none" stroke="url(#rf-edge)" strokeWidth="1.3" strokeDasharray="3 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.05 }}
                  />
                  {/* reward packet flowing back toward root */}
                  <motion.circle
                    r="2.6" fill="#E9C063" filter="url(#rf-glow)"
                    animate={{ offsetDistance: ['100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                    style={{ offsetPath: `path("${d}")` }}
                  />
                </g>
              )
            })}

            {/* tier-2 nodes — hoverable */}
            {tier2.map((n, i) => {
              const isHover = hover === `t2-${i}`
              return (
                <g
                  key={`t2-${i}`}
                  style={{ cursor: 'pointer', touchAction: 'manipulation' }}
                  onPointerEnter={() => setHover(`t2-${i}`)}
                  onPointerLeave={() => setHover(null)}
                  onPointerDown={() => setHover(`t2-${i}`)}
                >
                  <circle cx={n.x} cy={n.y} r="16" fill="transparent" />
                  {isHover && <circle cx={n.x} cy={n.y} r="14" fill="#22D3EE" opacity="0.3" filter="url(#rf-glow)" />}
                  <motion.circle
                    cx={n.x} cy={n.y}
                    fill={isHover ? '#22D3EE' : 'rgba(15,31,66,0.95)'} stroke="#22D3EE" strokeWidth="1.3"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: isHover ? 1.7 : 1, r: 6 }}
                    transition={{ duration: 0.4, delay: isHover ? 0 : 0.9 + i * 0.06 }}
                    style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                  />
                </g>
              )
            })}
            {/* tier-1 nodes — hoverable */}
            {tier1.map((n, i) => {
              const isHover = hover === `t1-${i}`
              return (
                <g
                  key={`t1-${i}`}
                  style={{ cursor: 'pointer', touchAction: 'manipulation' }}
                  onPointerEnter={() => setHover(`t1-${i}`)}
                  onPointerLeave={() => setHover(null)}
                  onPointerDown={() => setHover(`t1-${i}`)}
                >
                  <circle cx={n.x} cy={n.y} r="20" fill="transparent" />
                  {isHover && <circle cx={n.x} cy={n.y} r="20" fill="#60A5FA" opacity="0.28" filter="url(#rf-glow)" />}
                  <motion.circle
                    cx={n.x} cy={n.y}
                    fill={isHover ? 'url(#rf-edge)' : 'rgba(15,31,66,0.95)'} stroke="#60A5FA" strokeWidth="1.6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: isHover ? 1.4 : 1, r: 10 }}
                    transition={{ duration: 0.5, delay: isHover ? 0 : 0.6 + i * 0.1 }}
                    style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                  />
                </g>
              )
            })}
            {/* root node — hoverable */}
            <motion.g
              animate={{ scale: hover === 'root' ? 1.2 : [1, 1.08, 1] }}
              transition={hover === 'root' ? { duration: 0.3 } : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${root.x}px ${root.y}px`, cursor: 'pointer', touchAction: 'manipulation' }}
              onPointerEnter={() => setHover('root')}
              onPointerLeave={() => setHover(null)}
              onPointerDown={() => setHover('root')}
            >
              <circle cx={root.x} cy={root.y} r="34" fill="transparent" />
              <circle cx={root.x} cy={root.y} r="26" fill="#60A5FA" opacity={hover === 'root' ? 0.35 : 0.18} filter="url(#rf-glow)" />
              <circle cx={root.x} cy={root.y} r="17" fill="url(#rf-edge)" filter="url(#rf-glow)" />
              <text x={root.x} y={root.y + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.1em" fill="#FFFFFF" pointerEvents="none">YOU</text>
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
