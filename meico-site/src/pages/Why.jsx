import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import WhyHero from '../components/page-heroes/WhyHero.jsx'
import HexFrame from '../components/HexFrame.jsx'
import { why } from '../data/siteData.js'

export default function Why() {
  return (
    <PageTransition>
      <WhyHero kicker={why.kicker} intro={why.intro} />

      <SectionSeam palette={['#3B82F6', '#22D3EE', '#A855F7']} variant="wave-soft" height={130} />

      <section className="container-edge py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {why.reasons.map((r, i) => (
            <SectionReveal key={r.title} delay={i * 0.05}>
              <div className="glass glass-hover clip-corner p-6 md:p-7 h-full">
                <div className="flex items-start gap-4">
                  <HexFrame size={48} accent="#3B82F6" filled>
                    <span className="font-display text-electric-300 text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </HexFrame>
                  <div className="flex-1">
                    <h3 className="font-display text-paper text-xl md:text-2xl leading-tight">{r.title}</h3>
                  </div>
                </div>
                <p className="mt-5 text-paper-dim text-[15px] leading-relaxed">{r.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <SectionSeam palette={['#A855F7', '#E9C063', '#22D3EE']} variant="bloom" height={130} />

      <section className="container-edge py-16 text-center">
        <Link to="/ecosystem" className="btn-electric">
          See it in the ecosystem
        </Link>
      </section>
    </PageTransition>
  )
}
