import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText } from '@phosphor-icons/react'
import { MaskWord } from '../MaskReveal.jsx'

/**
 * DocumentsHero — a FANNED ARCHIVE.
 *
 * Right side: a stack of glassmorphic document cards fanned at angles,
 * each gently floating on its own loop — the literal "case, written in
 * full". Left: kicker + title + intro.
 *
 * Interactive: hover any card and it pulls forward — straightens,
 * lifts, brightens its brass tint and jumps to the top of the stack.
 */
const FAN = [
  { name: 'Genesis Whitepaper', tag: 'TECHNICAL', rot: -10, x: -36, y: 18, z: 1 },
  { name: 'Tokenomics',         tag: 'ECONOMIC',  rot:  -2, x:  -8, y:  0, z: 3 },
  { name: 'Annexure',           tag: 'DATA',      rot:   7, x:  22, y: 14, z: 2 },
  { name: 'Terms · Privacy',    tag: 'LEGAL',     rot:  16, x:  52, y: 36, z: 1 },
]

export default function DocumentsHero({ kicker, intro, count = 6 }) {
  const [hover, setHover] = useState(null)
  return (
    <section className="page-hero-fit relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 78% 45%, rgba(233,192,99,0.16), transparent 65%)' }}
      />

      <div className="container-edge relative py-8 grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
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
            <MaskWord delay={0.05}>The case,</MaskWord>{' '}
            <MaskWord delay={0.25}><span className="italic-accent">written in full.</span></MaskWord>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 text-paper-dim text-[16px] leading-[1.8] max-w-xl"
          >
            {intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 inline-flex items-baseline gap-3"
          >
            <span
              className="font-display leading-none"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #FFFFFF, #E9C063)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
              }}
            >
              {String(count).padStart(2, '0')}
            </span>
            <span className="mono text-paper-mid text-[0.6rem] tracking-[0.18em]">PUBLISHED · ALL OPEN</span>
          </motion.div>
        </div>

        {/* RIGHT — fanned glass cards, each hoverable */}
        <div className="relative h-[300px] md:h-[340px] flex items-center justify-center">
          {FAN.map((d, i) => {
            const isHover = hover === i
            return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 40, rotate: d.rot * 1.6 }}
              animate={{
                opacity: 1,
                y: isHover ? d.y - 22 : d.y,
                rotate: isHover ? 0 : d.rot,
                scale: isHover ? 1.06 : 1,
              }}
              transition={{ duration: isHover ? 0.4 : 0.9, delay: isHover ? 0 : 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onPointerDown={() => setHover(i)}
              className="absolute glass clip-corner p-5 w-[180px] md:w-[210px] cursor-pointer"
              style={{
                zIndex: isHover ? 10 : d.z,
                translateX: d.x,
                transformOrigin: 'bottom center',
                touchAction: 'manipulation',
                background: isHover
                  ? 'linear-gradient(170deg, rgba(233,192,99,0.22), rgba(6,13,32,0.94))'
                  : 'linear-gradient(170deg, rgba(233,192,99,0.10), rgba(6,13,32,0.92))',
                borderColor: isHover ? 'rgba(233,192,99,0.55)' : undefined,
                boxShadow: isHover ? '0 24px 60px -22px rgba(233,192,99,0.45)' : 'none',
              }}
            >
              <motion.div
                animate={isHover ? { y: 0 } : { y: [0, -6, 0] }}
                transition={isHover ? { duration: 0.3 } : { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              >
                <span className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-brass-500/40 text-brass-400">
                  <FileText size={16} weight="duotone" />
                </span>
                <p className="mono text-paper-mid text-[0.5rem] mt-4 tracking-[0.18em]">{d.tag} · PDF</p>
                <p className="font-display text-paper text-[15px] mt-1.5 leading-tight">{d.name}</p>
                <span aria-hidden className="block w-7 h-px mt-4" style={{ background: 'rgba(233,192,99,0.45)' }} />
              </motion.div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
