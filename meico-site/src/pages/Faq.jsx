import { useState } from 'react'
import { Plus, Minus } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import FaqHero from '../components/page-heroes/FaqHero.jsx'
import { faq } from '../data/siteData.js'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <PageTransition>
      <FaqHero
        kicker="FAQ"
        intro="The token cap, the sale timing, the two-token model, open-source scope — the answers MEICO gets asked for most, in plain language."
        count={faq.length}
      />

      <SectionSeam palette={['#22D3EE', '#3B82F6', '#A855F7']} variant="wave-soft" height={120} />

      <section className="container-edge pb-24">
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-3">
            {faq.map((item, i) => {
              const isOpen = open === i
              return (
                <SectionReveal key={i} delay={Math.min(i * 0.03, 0.3)}>
                  <li className="glass clip-corner overflow-hidden">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 hover:bg-electric-500/5 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-paper text-[17px] md:text-lg pr-3">{item.q}</span>
                      <span className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-electric-500/30 text-electric-300 shrink-0">
                        {isOpen ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-paper-dim text-[15px] leading-[1.75]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </SectionReveal>
              )
            })}
          </ul>
        </div>
      </section>
    </PageTransition>
  )
}
