import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import AboutHero from '../components/page-heroes/AboutHero.jsx'
import EcosystemArtifact from '../components/artifacts/EcosystemArtifact.jsx'
import { about, pillars } from '../data/siteData.js'

export default function About() {
  return (
    <PageTransition>
      <AboutHero kicker={about.kicker} mission={about.mission} />

      <SectionSeam palette={['#3B82F6', '#22D3EE', '#A855F7']} variant="wave-soft" height={120} />

      {/* What we are building — body paras as a structured two-column read */}
      <section className="container-edge py-14 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionReveal>
              <p className="mono text-electric-300 text-[0.62rem]">— What we are building</p>
              <h2 className="display-md text-paper mt-5">
                One chain.{' '}
                <span className="italic-accent">Every surface.</span>
              </h2>
            </SectionReveal>
          </div>
          <div className="lg:col-span-8 space-y-6">
            {about.body.slice(1).map((p, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="flex gap-5">
                  <span
                    className="font-display shrink-0 leading-none pt-1"
                    style={{
                      fontSize: '28px',
                      fontWeight: 500,
                      letterSpacing: '-0.03em',
                      background: 'linear-gradient(135deg, #FFFFFF, #60A5FA)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-paper-dim text-[16.5px] leading-[1.85]">{p}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam palette={['#22D3EE', '#3B82F6', '#A855F7']} variant="wave-soft" height={120} />

      {/* Core attributes — 4-card band */}
      <section className="container-edge py-14 md:py-20">
        <SectionReveal>
          <div className="max-w-2xl mb-10">
            <p className="mono text-cyan-400 text-[0.62rem]">— The chain, in four properties</p>
            <h2 className="display-md text-paper mt-4">
              Why builders choose{' '}
              <span className="italic-accent">the Meico chain.</span>
            </h2>
          </div>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {about.attributes.map((a, i) => (
            <SectionReveal key={a.label} delay={i * 0.05}>
              <div className="group glass glass-hover clip-corner p-6 h-full relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.45), transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
                <span
                  className="font-display block leading-none"
                  style={{
                    fontSize: '32px',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, #FFFFFF, #22D3EE)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden
                  className="block w-8 h-px my-4"
                  style={{ background: 'rgba(233, 192, 99, 0.45)' }}
                />
                <h3 className="font-display text-paper text-lg leading-tight tracking-[-0.02em]">
                  {a.label}
                </h3>
                <p className="mt-3 text-paper-dim text-[14px] leading-relaxed">{a.detail}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <SectionSeam palette={['#22D3EE', '#A855F7', '#3B82F6', '#E9C063']} variant="wave-fold" height={150} />

      {/* Ecosystem diagram — the canonical diagram, now interactive */}
      <section className="container-edge py-16 md:py-24">
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="mono text-cyan-400 text-[0.62rem]">— {about.ecosystem.title}</p>
            <h2 className="display-lg text-paper mt-5">
              How the
              <span className="italic-accent"> pieces connect.</span>
            </h2>
          </div>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <div className="relative mx-auto" style={{ maxWidth: 'min(540px, 64vh)' }}>
            <div className="flex items-center justify-between mb-2">
              <p className="mono text-[0.55rem] text-paper-mid">
                FIG. 01 — CONNECTION DIAGRAM
              </p>
              <p className="mono text-[0.55rem] tracking-[0.24em] text-cyan-400">
                LIVE · INTERACTIVE
              </p>
            </div>
            <EcosystemArtifact />
          </div>
        </SectionReveal>
        <div className="max-w-3xl mx-auto mt-10 space-y-5">
          {about.ecosystem.body.map((p, i) => (
            <SectionReveal key={i} delay={i * 0.04}>
              <p className="text-paper-dim text-[15.5px] leading-[1.75]">{p}</p>
            </SectionReveal>
          ))}
        </div>
      </section>

      <SectionSeam palette={['#A855F7', '#E9C063', '#22D3EE']} variant="prism" height={140} />

      {/* Pillars index */}
      <section className="container-edge py-16">
        <SectionReveal>
          <p className="mono text-electric-300 text-[0.62rem] mb-3">— Explore each pillar</p>
          <h2 className="display-md text-paper">
            Seven products,{' '}
            <span className="italic-accent">one chain.</span>
          </h2>
        </SectionReveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <Link
              key={p.slug}
              to={`/ecosystem/${p.slug}`}
              className="group glass glass-hover clip-corner p-5 flex items-center gap-4"
            >
              <div
                className="relative flex items-center justify-center shrink-0"
                style={{ width: 48, height: 48 }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle, ${p.accentHex}55 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                  }}
                />
                {p.iconImage ? (
                  <img
                    src={p.iconImage}
                    alt=""
                    loading="lazy"
                    className="relative w-10 h-10 object-contain"
                  />
                ) : (
                  <span
                    className="relative font-display text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${p.accentHex}, ${p.accentHex2})`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {p.letter}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-paper text-lg">{p.name}</p>
                <p className="text-paper-mid text-xs mt-0.5 line-clamp-1">{p.short}</p>
              </div>
              <ArrowUpRight size={16} weight="bold" className="text-paper-mid group-hover:text-electric-300 transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
