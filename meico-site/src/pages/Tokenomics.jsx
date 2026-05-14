import { ArrowUpRight, Coins } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import TokenomicsHero from '../components/page-heroes/TokenomicsHero.jsx'
import Counter from '../components/Counter.jsx'
import DonutChart from '../components/DonutChart.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import { tokenomics } from '../data/siteData.js'

export default function Tokenomics() {
  return (
    <PageTransition>
      <TokenomicsHero kicker={tokenomics.kicker} intro={tokenomics.intro} />

      <SectionSeam palette={['#E9C063', '#3B82F6', '#A855F7']} variant="wave-soft" height={120} />

      {/* Numbers band — count-up tiles */}
      <section className="container-edge py-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {tokenomics.numbers.map((n, i) => (
            <SectionReveal key={n.label} delay={i * 0.05}>
              <NumberTile n={n} />
            </SectionReveal>
          ))}
        </div>
      </section>

      <SectionSeam palette={['#3B82F6', '#22D3EE', '#E9C063', '#A855F7']} variant="wave-fold" height={140} />

      {/* Donut grid — two cinematic charts */}
      <section className="container-edge py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          <SectionReveal>
            <DonutChart
              data={tokenomics.allocation}
              kicker="Token allocation"
              kickerColor="#60A5FA"
              title="Allocation of MEICO tokens."
              center={{ label: 'MAX SUPPLY', value: '1B' }}
            />
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <DonutChart
              data={tokenomics.useOfFunds}
              kicker="Use of funds"
              kickerColor="#22D3EE"
              title="Where the raise goes."
              center={{ label: 'OF EACH $', value: '100%' }}
            />
          </SectionReveal>
        </div>
      </section>

      <SectionSeam palette={['#A855F7', '#E9C063', '#22D3EE']} variant="prism" height={130} />

      {/* PDF download CTA */}
      <section className="container-edge py-12 text-center">
        <MagneticButton as="a" href="/docs/meico-tokenomics.pdf" target="_blank" rel="noopener noreferrer" className="btn-electric inline-flex">
          <Coins size={14} /> Download Tokenomics PDF <ArrowUpRight size={12} weight="bold" />
        </MagneticButton>
      </section>
    </PageTransition>
  )
}

/** Count-up tile — parses "$4.5M", "360M", "1B" style values and animates. */
function NumberTile({ n }) {
  const m = n.value.match(/^(\$?)(\d+(?:\.\d+)?)\s*([MBmb%]?)(.*)$/)
  if (!m) {
    return (
      <div className="glass clip-corner p-5 sm:p-6 h-full">
        <p className="mono text-paper-mid text-[0.55rem]">{n.label}</p>
        <p className="mt-3 font-display text-2xl md:text-3xl text-brass-400 leading-tight">{n.value}</p>
        {n.note && <p className="mt-2 mono text-paper-mid text-[0.55rem]">{n.note}</p>}
      </div>
    )
  }
  const [, prefix, num, suffix] = m
  const hasDecimal = num.includes('.')
  return (
    <div className="glass clip-corner p-5 sm:p-6 h-full">
      <p className="mono text-paper-mid text-[0.55rem]">{n.label}</p>
      <p className="mt-3 font-display text-3xl md:text-4xl text-brass-400 leading-none tabular-nums">
        {prefix}
        <Counter
          value={parseFloat(num)}
          format={(x) => hasDecimal ? x.toFixed(1) : Math.round(x).toString()}
        />
        {suffix}
      </p>
      {n.note && <p className="mt-2 mono text-paper-mid text-[0.55rem]">{n.note}</p>}
    </div>
  )
}
