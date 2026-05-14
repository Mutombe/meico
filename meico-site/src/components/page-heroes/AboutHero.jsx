import { useState } from 'react'
import { motion } from 'framer-motion'
import { MaskWord } from '../MaskReveal.jsx'

/**
 * AboutHero — a glassmorphic BENTO GRID.
 *
 * A clean, balanced rectangle: a monumental title cell (2×2), a
 * spinning-hex cell, a mission cell, and a three-up stat strip along
 * the bottom. Every block is its own glass tint and is individually
 * hoverable — lift, glow, and the hex spins faster on hover.
 *
 *   ┌───────────────┬─────────┐
 *   │               │  HEX    │
 *   │   TITLE 2×2   ├─────────┤
 *   │               │ MISSION │
 *   ├────────┬──────┴──┬──────┤
 *   │ STAT0  │ STAT1   │STAT2 │
 *   └────────┴─────────┴──────┘
 */
const STATS = [
  { v: 'Layer-0',   l: 'Hybrid blockchain',  tint: 'rgba(59,130,246,0.14)', edge: '#3B82F6' },
  { v: 'Stellar',   l: 'Consensus protocol', tint: 'rgba(34,211,238,0.13)', edge: '#22D3EE' },
  { v: 'Two-token', l: 'Coin + stablecoin',  tint: 'rgba(168,85,247,0.13)', edge: '#A855F7' },
]

export default function AboutHero({ kicker, mission }) {
  const [hexHover, setHexHover] = useState(false)

  return (
    <section className="page-hero-fit relative overflow-hidden">
      {/* Ambient wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 20% 25%, rgba(59,130,246,0.18), transparent 65%), radial-gradient(ellipse 60% 70% at 90% 80%, rgba(168,85,247,0.14), transparent 65%)',
        }}
      />

      <div className="container-edge relative py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

          {/* TITLE CELL — 2×2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="col-span-2 md:row-span-2 glass glass-hover clip-corner p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ minHeight: 220 }}
          >
            <span
              aria-hidden
              className="absolute -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.40), transparent 70%)', filter: 'blur(28px)' }}
            />
            <p className="mono text-electric-300 text-[0.62rem] relative">— {kicker}</p>
            <h1 className="hero-title text-paper mt-5 relative">
              <MaskWord delay={0.1}>Institutional-grade</MaskWord>{' '}
              <MaskWord delay={0.28}>infrastructure for an</MaskWord>{' '}
              <MaskWord delay={0.46}>
                <span className="italic-accent">African step-change.</span>
              </MaskWord>
            </h1>
          </motion.div>

          {/* SPINNING HEX CELL — spins faster on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            onPointerEnter={() => setHexHover(true)}
            onPointerLeave={() => setHexHover(false)}
            onPointerDown={() => setHexHover(true)}
            className="glass glass-hover clip-corner p-5 flex items-center justify-center relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(180deg, rgba(233,192,99,0.10), rgba(6,13,32,0.85))', touchAction: 'manipulation', minHeight: 104 }}
          >
            <span
              aria-hidden
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(233,192,99,0.28), transparent 65%)',
                opacity: hexHover ? 1 : 0,
              }}
            />
            <motion.svg
              viewBox="0 0 100 100" width="74" height="74" className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: hexHover ? 8 : 38, repeat: Infinity, ease: 'linear' }}
            >
              <polygon points="50,4 92,27 92,73 50,96 8,73 8,27" fill="none" stroke="rgba(233,192,99,0.55)" strokeWidth="1.2" />
              <polygon points="50,20 78,36 78,64 50,80 22,64 22,36" fill="none" stroke="rgba(59,130,246,0.45)" strokeWidth="1" />
              <motion.circle cx="50" cy="50" r="6" fill="#E9C063" animate={{ scale: hexHover ? 1.5 : 1 }} style={{ transformOrigin: '50px 50px' }} />
            </motion.svg>
          </motion.div>

          {/* MISSION CELL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="col-span-2 md:col-span-1 glass glass-hover clip-corner p-6 relative overflow-hidden flex flex-col justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.13), rgba(6,13,32,0.88))', minHeight: 104 }}
          >
            <p className="mono text-brass-400 text-[0.55rem] mb-2.5">— Our mission</p>
            <p className="font-display text-paper text-[14px] md:text-[15px] leading-[1.5]">{mission}</p>
          </motion.div>

          {/* STAT STRIP — three-up, spans full width on every breakpoint */}
          <div className="col-span-2 md:col-span-3 grid grid-cols-3 gap-3 md:gap-4">
            {STATS.map((s, i) => (
              <StatCell key={s.v} {...s} delay={0.36 + i * 0.06} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCell({ v, l, tint, edge, delay }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onPointerDown={() => setHover(true)}
      className="glass glass-hover clip-corner p-4 md:p-5 flex flex-col justify-center relative overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(160deg, ${tint}, rgba(6,13,32,0.88))`,
        borderColor: hover ? `${edge}99` : `${edge}59`,
        touchAction: 'manipulation',
        minHeight: 88,
      }}
    >
      <span
        aria-hidden
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${edge}66, transparent 70%)`, filter: 'blur(18px)', opacity: hover ? 1 : 0 }}
      />
      <span
        className="font-display leading-none relative"
        style={{
          fontSize: 'clamp(19px, 2.4vw, 27px)', fontWeight: 500, letterSpacing: '-0.03em',
          background: `linear-gradient(135deg, #FFFFFF, ${edge})`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
        }}
      >
        {v}
      </span>
      <span className="mono text-paper-mid text-[0.52rem] md:text-[0.55rem] mt-1.5 tracking-[0.12em] relative">{l}</span>
    </motion.div>
  )
}
