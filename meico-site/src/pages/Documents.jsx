import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import DocumentsHero from '../components/page-heroes/DocumentsHero.jsx'
import DocCard from '../components/DocCard.jsx'
import { documents } from '../data/siteData.js'

export default function Documents() {
  return (
    <PageTransition>
      <DocumentsHero
        kicker="The Documents"
        intro="Every document MEICO has published — from the technical Genesis Whitepaper through to the Terms of Coin Sale and Privacy Policy. All PDFs, all open."
        count={documents.length}
      />

      <SectionSeam palette={['#E9C063', '#3B82F6', '#A855F7']} variant="wave-soft" height={130} />

      <section className="container-edge py-12 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((d, i) => (
            <SectionReveal key={d.name} delay={i * 0.05}>
              <DocCard d={d} index={i} />
            </SectionReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
