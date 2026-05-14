import { motion } from 'framer-motion'
import { MaskWord } from '../MaskReveal.jsx'
import EcosystemArtifact from '../artifacts/EcosystemArtifact.jsx'

/**
 * EcosystemHero — ARTIFACT CENTREPIECE.
 *
 * The interactive EcosystemArtifact IS the hero. A glass copy panel
 * sits left; the artifact sits right, height-capped (its square box is
 * bounded by `min(px, vh)` so it can never overflow the first screen).
 * The whole hero is locked to one viewport via `.page-hero-fit`.
 */
export default function EcosystemHero({ kicker, intro }) {
  return (
    <section className="page-hero-fit relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 65% 55%, rgba(59,130,246,0.16), transparent 70%), radial-gradient(ellipse 50% 50% at 90% 20%, rgba(168,85,247,0.12), transparent 65%)',
        }}
      />

      <div className="container-edge relative py-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-center">
        {/* Copy — glass panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 glass clip-corner p-6 md:p-8"
        >
          <p className="mono text-cyan-400 text-[0.62rem] inline-flex items-center gap-2.5">
            <span className="block w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 8px #22D3EE' }} />
            — {kicker}
          </p>
          <h1 className="display-lg text-paper mt-4">
            <MaskWord delay={0.1}>Seven products,</MaskWord>{' '}
            <MaskWord delay={0.3}><span className="italic-accent">one chain.</span></MaskWord>
          </h1>
          <p className="mt-5 text-paper-dim text-[15.5px] leading-[1.75]">{intro}</p>
          <p className="mt-5 mono text-paper-mid text-[0.55rem] tracking-[0.2em]">
            → HOVER ANY HEX TO INSPECT A PILLAR
          </p>
        </motion.div>

        {/* The artifact — height-capped so it always fits one screen,
            no background overlay so it sits cleanly on the page. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full"
          style={{ maxWidth: 'min(460px, 60vh)' }}
        >
          <EcosystemArtifact />
        </motion.div>
      </div>
    </section>
  )
}
