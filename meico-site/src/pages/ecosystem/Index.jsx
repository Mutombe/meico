import PageTransition from '../../components/PageTransition.jsx'
import SectionReveal from '../../components/SectionReveal.jsx'
import SectionSeam from '../../components/SectionSeam.jsx'
import EcosystemHero from '../../components/page-heroes/EcosystemHero.jsx'
import PillarCard from '../../components/PillarCard.jsx'
import { pillars } from '../../data/siteData.js'

export default function EcosystemIndex() {
  return (
    <PageTransition>
      <EcosystemHero
        kicker="The Ecosystem"
        intro="From the Research Institute that creates new African industries, through to the freight DePINs that move their goods — every MEICO product is a working surface of one connected ecosystem."
      />

      <SectionSeam palette={['#3B82F6', '#22D3EE', '#A855F7']} variant="wave-soft" height={130} />

      <section className="container-edge pb-12">
        <SectionReveal>
          <div className="max-w-2xl mb-10">
            <p className="mono text-electric-300 text-[0.62rem]">— Explore each pillar</p>
            <h2 className="display-md text-paper mt-4">
              Seven working surfaces,{' '}
              <span className="italic-accent">one Layer-0.</span>
            </h2>
          </div>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <SectionReveal key={p.slug} delay={i * 0.04}>
              <PillarCard pillar={p} index={i} />
            </SectionReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
