import { ArrowUpRight } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import ReferralsHero from '../components/page-heroes/ReferralsHero.jsx'
import HexFrame from '../components/HexFrame.jsx'
import { referrals } from '../data/siteData.js'

export default function Referrals() {
  return (
    <PageTransition>
      <ReferralsHero kicker={referrals.kicker} intro={referrals.body} />

      <SectionSeam palette={['#3B82F6', '#22D3EE', '#E9C063']} variant="wave-soft" height={120} />

      {/* Three-step process */}
      <section className="container-edge py-12">
        <div className="grid md:grid-cols-3 gap-5">
          {referrals.steps.map((s, i) => (
            <SectionReveal key={s.n} delay={i * 0.05}>
              <div className="glass clip-corner p-6 md:p-7 h-full">
                <HexFrame size={56} accent="#3B82F6" filled>
                  <span className="font-display text-electric-300 text-base">{String(s.n).padStart(2, '0')}</span>
                </HexFrame>
                <h3 className="font-display text-paper text-xl mt-5">{s.title}</h3>
                {s.detail && (
                  <p className="mt-3 text-paper-dim text-[14.5px] leading-relaxed">{s.detail}</p>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* PDF download */}
      <section className="container-edge pb-24 text-center">
        <a href="/docs/meico-referral-program.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
          Full Referral Program PDF <ArrowUpRight size={12} weight="bold" />
        </a>
      </section>
    </PageTransition>
  )
}
