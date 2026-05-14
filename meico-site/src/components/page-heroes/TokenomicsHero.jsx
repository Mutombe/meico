import { useState } from 'react'
import { motion } from 'framer-motion'
import { MaskWord } from '../MaskReveal.jsx'
import { tokenomics } from '../../data/siteData.js'

/**
 * TokenomicsHero — a VAULT READOUT.
 *
 * Left: kicker + title + intro. Right: a glass "terminal panel" that
 * reads like a live financial instrument — the token allocation drawn
 * as animated horizontal bars, a scan-line sweeping over them, and the
 * four cap numbers stacked beneath in mono.
 *
 * Interactive: every allocation row and every cap cell is hoverable —
 * the row nudges + glows in its own colour, the cap cell lifts + tints.
 */
export default function TokenomicsHero({ kicker, intro }) {
  const [barHover, setBarHover] = useState(null)
  const [capHover, setCapHover] = useState(null)
  const caps = [
    { v: '1B',    l: 'MAX SUPPLY' },
    { v: '360M',  l: 'OFFERED' },
    { v: '$4.5M', l: 'SOFT CAP' },
    { v: '$18M',  l: 'HARD CAP' },
  ]

  return (
    <section className="page-hero-fit relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 80% 40%, rgba(233,192,99,0.16), transparent 65%), radial-gradient(ellipse 60% 60% at 10% 80%, rgba(59,130,246,0.12), transparent 65%)',
        }}
      />

      <div className="container-edge relative py-8 grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-14 items-center">
        {/* LEFT — copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mono text-brass-400 text-[0.62rem] inline-flex items-center gap-2.5"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-brass-400" style={{ boxShadow: '0 0 8px #E9C063' }} />
            — {kicker}
          </motion.p>
          <h1 className="display-xl text-paper mt-5">
            <MaskWord delay={0.05}>A two-token model,</MaskWord>{' '}
            <MaskWord delay={0.25}><span className="italic-accent">capped &amp; transparent.</span></MaskWord>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 text-paper-dim text-[16px] leading-[1.8] max-w-xl"
          >
            {intro}
          </motion.p>
        </div>

        {/* RIGHT — vault terminal panel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass clip-corner p-6 md:p-8 relative overflow-hidden"
        >
          {/* scan line */}
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(233,192,99,0.14), transparent)' }}
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="flex items-center justify-between relative">
            <p className="mono text-paper-mid text-[0.55rem] tracking-[0.22em]">TOKEN ALLOCATION</p>
            <p className="mono text-brass-400 text-[0.55rem] tracking-[0.22em]">$MEICO · LIVE</p>
          </div>

          {/* allocation bars — each row hoverable */}
          <div className="mt-6 space-y-3.5 relative">
            {tokenomics.allocation.map((a, i) => (
              <motion.div
                key={a.label}
                whileHover={{ x: 4 }}
                onPointerEnter={() => setBarHover(i)}
                onPointerLeave={() => setBarHover(null)}
                onPointerDown={() => setBarHover(i)}
                style={{ cursor: 'pointer', touchAction: 'manipulation' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="mono text-[0.58rem]"
                    style={{ color: barHover === i ? a.hex : 'rgba(200,207,224,0.78)', transition: 'color 0.25s ease' }}
                  >
                    {a.label}
                  </span>
                  <span className="mono text-paper text-[0.62rem] tabular-nums">{a.pct}%</span>
                </div>
                <div
                  className="rounded-full overflow-hidden"
                  style={{
                    background: 'rgba(96,165,250,0.10)',
                    height: barHover === i ? 6 : 8,
                    transition: 'height 0.25s ease',
                  }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${a.hex}, ${a.hex}AA)`,
                      boxShadow: barHover === i ? `0 0 12px ${a.hex}` : 'none',
                      transition: 'box-shadow 0.25s ease',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${a.pct}%` }}
                    transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* cap numbers — each cell hoverable */}
          <div className="mt-7 grid grid-cols-4 gap-3 relative">
            {caps.map((c, i) => (
              <motion.div
                key={c.l}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.08 }}
                whileHover={{ y: -3 }}
                onPointerEnter={() => setCapHover(i)}
                onPointerLeave={() => setCapHover(null)}
                onPointerDown={() => setCapHover(i)}
                className="text-center py-3 rounded-md"
                style={{
                  background: capHover === i ? 'rgba(233,192,99,0.12)' : 'rgba(15,31,66,0.55)',
                  border: `1px solid ${capHover === i ? 'rgba(233,192,99,0.55)' : 'rgba(233,192,99,0.18)'}`,
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                  transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
              >
                <p className="font-display text-paper text-base md:text-lg leading-none">{c.v}</p>
                <p className="mono text-paper-mid text-[0.5rem] mt-1.5 tracking-[0.12em]">{c.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
