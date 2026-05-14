import { useState } from 'react'
import { motion } from 'framer-motion'
import { MaskWord } from '../MaskReveal.jsx'

/**
 * FaqHero — FLOATING QUERIES.
 *
 * A huge translucent "?" anchors the right, while glass topic-chips
 * drift slowly on independent loops behind/around the title — the page
 * literally surrounded by the questions it is about to answer.
 *
 * Interactive: hover any chip and it stops drifting, lifts, brightens
 * to cyan and gains a leading "?" marker (pointer events → tap too).
 */
const CHIPS = [
  { t: 'The token cap',    x: '4%',  y: '8%',  d: 0.0, dur: 7 },
  { t: 'Sale timing',      x: '60%', y: '4%',  d: 0.4, dur: 8 },
  { t: 'Two-token model',  x: '74%', y: '64%', d: 0.8, dur: 9 },
  { t: 'Open-source?',     x: '2%',  y: '72%', d: 1.2, dur: 7.5 },
  { t: 'Distribution',     x: '34%', y: '84%', d: 0.6, dur: 8.5 },
  { t: 'Referral bonus',   x: '50%', y: '46%', d: 1.0, dur: 9.5 },
]

export default function FaqHero({ kicker, intro, count = 11 }) {
  const [hover, setHover] = useState(null)
  return (
    <section className="page-hero-fit relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 60% 45%, rgba(34,211,238,0.16), transparent 68%)' }}
      />

      {/* Giant translucent ? */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[-2%] md:right-[4%] top-1/2 -translate-y-1/2 font-display select-none pointer-events-none hidden sm:block"
        style={{
          fontSize: 'clamp(220px, 30vw, 420px)', lineHeight: 0.8, fontWeight: 500,
          background: 'linear-gradient(160deg, rgba(34,211,238,0.30), rgba(59,130,246,0.10) 60%, transparent)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
        }}
      >
        ?
      </motion.span>

      {/* Drifting glass topic chips — each hoverable */}
      {CHIPS.map((c) => {
        const isHover = hover === c.t
        return (
          <motion.span
            key={c.t}
            className="absolute glass clip-corner px-3.5 py-2 mono text-[0.55rem] hidden md:inline-flex items-center gap-1.5 cursor-pointer"
            style={{
              left: c.x, top: c.y,
              touchAction: 'manipulation',
              color: isHover ? '#22D3EE' : 'rgba(200,207,224,0.78)',
              borderColor: isHover ? 'rgba(34,211,238,0.55)' : undefined,
              boxShadow: isHover ? '0 16px 40px -18px rgba(34,211,238,0.5)' : 'none',
              transition: 'color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              zIndex: isHover ? 5 : 1,
            }}
            initial={{ opacity: 0 }}
            animate={
              isHover
                ? { opacity: 1, y: -14, scale: 1.12 }
                : { opacity: 0.9, y: [0, -10, 0], scale: 1 }
            }
            transition={
              isHover
                ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                : {
                    opacity: { duration: 0.8, delay: 0.4 + c.d },
                    y: { duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.d },
                  }
            }
            onPointerEnter={() => setHover(c.t)}
            onPointerLeave={() => setHover(null)}
            onPointerDown={() => setHover(c.t)}
          >
            {isHover && <span className="text-cyan-400">?</span>}
            {c.t}
          </motion.span>
        )
      })}

      <div className="container-edge relative py-8">
        <motion.p
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mono text-cyan-400 text-[0.62rem] inline-flex items-center gap-2.5"
        >
          <span className="block w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 8px #22D3EE' }} />
          — {kicker} · {String(count).padStart(2, '0')} answered
        </motion.p>
        <h1 className="display-xl text-paper mt-5 max-w-2xl">
          <MaskWord delay={0.05}>Frequently asked</MaskWord>{' '}
          <MaskWord delay={0.25}><span className="italic-accent">questions.</span></MaskWord>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-7 text-paper-dim text-[16px] leading-[1.8] max-w-lg"
        >
          {intro}
        </motion.p>
      </div>
    </section>
  )
}
