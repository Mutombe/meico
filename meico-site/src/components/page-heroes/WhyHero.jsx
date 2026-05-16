import { useState } from 'react'
import { motion } from 'framer-motion'
import { MaskWord } from '../MaskReveal.jsx'

/**
 * WhyHero — FOUNDATION BLOCKS.
 *
 * The four economic drivers rendered as a literal foundation: four
 * glass blocks stacked into a base, each block a tier, mortar-lines of
 * brass between them. The title sits above, the blocks "support" it.
 *
 * Interactive: hover any block and it widens slightly, lifts, brightens
 * its tint + edge rail and its numeral pops (pointer events → tap too).
 */
const BLOCKS = [
  { t: 'Human Capital',    w: '100%', tint: 'rgba(59,130,246,0.16)',  edge: '#3B82F6' },
  { t: 'Physical Capital', w: '88%',  tint: 'rgba(34,211,238,0.14)',  edge: '#22D3EE' },
  { t: 'Natural Resources',w: '76%',  tint: 'rgba(168,85,247,0.14)',  edge: '#A855F7' },
  { t: 'New Technology',   w: '64%',  tint: 'rgba(233,192,99,0.14)',  edge: '#E9C063' },
]

export default function WhyHero({ kicker, intro, coinImage }) {
  const [hover, setHover] = useState(null)
  return (
    <section className="page-hero-fit relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 20%, rgba(59,130,246,0.16), transparent 65%)' }}
      />

      <div className="container-edge relative py-8 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center lg:items-stretch">
        {/* LEFT — copy */}
        <div>
          {/* MEICO silver coin — sits on top of the column, anchoring the
              copy that follows. Decorative — aria-hidden. */}
          {coinImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 flex items-center justify-start"
              aria-hidden
            >
              {/* Soft halo behind the coin */}
              <span
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 280,
                  height: 280,
                  left: -30,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background:
                    'radial-gradient(circle, rgba(147,197,253,0.22) 0%, rgba(59,130,246,0.10) 35%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <img
                src={coinImage}
                alt=""
                loading="lazy"
                className="relative float-y"
                style={{
                  width: 'clamp(140px, 16vw, 200px)',
                  height: 'auto',
                  objectFit: 'contain',
                  filter:
                    'drop-shadow(0 18px 36px rgba(59,130,246,0.35)) drop-shadow(0 6px 12px rgba(0,0,0,0.45))',
                }}
              />
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mono text-electric-300 text-[0.62rem] inline-flex items-center gap-2.5"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-electric-400" style={{ boxShadow: '0 0 8px #60A5FA' }} />
            — {kicker}
          </motion.p>
          <h1 className="display-xl text-paper mt-5">
            <MaskWord delay={0.05}>Blockchain meets the major</MaskWord>{' '}
            <MaskWord delay={0.25}><span className="italic-accent">economic drivers.</span></MaskWord>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 text-paper-dim text-[16px] leading-[1.8] max-w-xl"
          >
            {intro}
          </motion.p>
        </div>

        {/* RIGHT — stacked foundation blocks */}
        <div className="relative flex flex-col items-center gap-2.5">
          {/* The thing they support — a small capstone */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mono text-brass-400 text-[0.55rem] tracking-[0.24em] mb-1"
          >
            ▲ SUSTAINABLE LONG-TERM GROWTH
          </motion.div>

          {BLOCKS.map((b, i) => {
            const isHover = hover === i
            return (
            <motion.div
              key={b.t}
              initial={{ opacity: 0, y: 30, scaleX: 0.85 }}
              animate={{ opacity: 1, y: isHover ? -4 : 0, scaleX: 1 }}
              transition={{ duration: isHover ? 0.3 : 0.7, delay: isHover ? 0 : 0.35 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onPointerDown={() => setHover(i)}
              className="glass clip-corner px-6 py-5 flex items-center justify-between relative overflow-hidden cursor-pointer"
              style={{
                width: isHover ? `calc(${b.w} + 8%)` : b.w,
                maxWidth: '100%',
                background: isHover
                  ? `linear-gradient(135deg, ${b.tint.replace(/[\d.]+\)$/, '0.32)')}, rgba(6,13,32,0.9))`
                  : `linear-gradient(135deg, ${b.tint}, rgba(6,13,32,0.9))`,
                borderColor: isHover ? `${b.edge}AA` : `${b.edge}55`,
                boxShadow: isHover ? `0 18px 50px -22px ${b.edge}88` : 'none',
                touchAction: 'manipulation',
                transition: 'width 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0"
                style={{ background: b.edge, width: isHover ? 3 : 4, transition: 'width 0.3s ease' }}
              />
              <span className="font-display text-paper text-[15px] md:text-base tracking-[-0.01em]">{b.t}</span>
              <motion.span
                className="font-display leading-none"
                animate={{ scale: isHover ? 1.25 : 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: '22px', fontWeight: 500, letterSpacing: '-0.03em',
                  background: `linear-gradient(135deg, #FFFFFF, ${b.edge})`,
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>
            </motion.div>
            )
          })}

          {/* Spacer — desktop only. Pushes the mortar + mainspring label
              to the bottom of the stretched column so the right artifact
              spans the full hero row, mirroring the intro at the bottom
              of the left column. Mobile keeps its tight stack. */}
          <div className="hidden lg:block lg:flex-1" aria-hidden />

          {/* mortar base line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="h-px w-full mt-1"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(233,192,99,0.6), transparent)' }}
          />
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mono text-paper-mid text-[0.55rem] tracking-[0.22em]"
          >
            BLOCKCHAIN AS THE MAINSPRING
          </motion.p>
        </div>
      </div>
    </section>
  )
}
