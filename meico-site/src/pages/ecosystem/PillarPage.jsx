import { Link, useParams, Navigate } from 'react-router-dom'
import { useRef } from 'react'
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react'
import PageTransition from '../../components/PageTransition.jsx'
import SectionReveal from '../../components/SectionReveal.jsx'
import { MaskWord } from '../../components/MaskReveal.jsx'
import SectionSeam from '../../components/SectionSeam.jsx'
import PillarArtifact from '../../components/artifacts/PillarArtifact.jsx'
import { pillars } from '../../data/siteData.js'

/**
 * PillarPage — typographic poster hero.
 *
 *  · The pillar name sits left in display-xl, with the verb-word in
 *    Fira Code accent + gradient text (no italics anywhere).
 *  · A 1px brass-gold rule runs under the title, full-bleed left.
 *  · The interactive PillarArtifact is the hero centrepiece, framed by
 *    mono rail labels; the summary sits below it as commentary.
 */
export default function PillarPage() {
  const { slug } = useParams()
  const idx = pillars.findIndex((p) => p.slug === slug)
  if (idx === -1) return <Navigate to="/ecosystem" replace />

  const pillar = pillars[idx]
  const prev = pillars[(idx - 1 + pillars.length) % pillars.length]
  const next = pillars[(idx + 1) % pillars.length]
  const c1 = pillar.accentHex
  const c2 = pillar.accentHex2 || c1
  const num = String(idx + 1).padStart(2, '0')

  const ref = useRef(null)

  return (
    <PageTransition>
      {/* Breadcrumb */}
      <section className="container-edge pt-14 md:pt-16 relative">
        <Link
          to="/ecosystem"
          className="mono text-[0.6rem] inline-flex items-center gap-2 transition-colors"
          style={{ color: c1 }}
        >
          <ArrowLeft size={11} /> ALL PILLARS · {String(pillars.length).padStart(2, '0')}
        </Link>
      </section>

      {/* HERO */}
      <section ref={ref} className="relative overflow-hidden pt-10 pb-24 md:pb-32">
        {/* Soft accent backdrop in pillar gradient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 1200px 800px at 50% 30%, ${c1}30 0%, ${c2}11 40%, transparent 75%)`,
          }}
        />

        <div className="container-edge relative">
          {/* Kicker rail — icon + ordinal + label, sits as ONE composed unit */}
          <SectionReveal>
            <div className="flex items-center gap-4">
              {pillar.iconImage && (
                <div
                  className="relative flex items-center justify-center shrink-0"
                  style={{ width: 44, height: 44 }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full opacity-80"
                    style={{
                      background: `radial-gradient(circle, ${c1}55 0%, transparent 70%)`,
                      filter: 'blur(10px)',
                    }}
                  />
                  <img
                    src={pillar.iconImage}
                    alt=""
                    className="relative w-9 h-9 object-contain"
                    style={{ filter: `drop-shadow(0 2px 6px ${c1}66)` }}
                  />
                </div>
              )}
              <span
                className="block w-7 h-px"
                style={{ background: `linear-gradient(90deg, ${c1}, transparent)` }}
              />
              <p className="mono text-[0.62rem]" style={{ color: c1 }}>
                Pillar {num} · of MEICO
              </p>
            </div>
          </SectionReveal>

          {/* TITLE — verb in Fira Code gradient accent, then the rest */}
          <h1 className="display-xl mt-7 max-w-5xl">
            <MaskWord delay={0.05} duration={1.1}>
              <span
                className="grad-text"
                style={{
                  '--g-from': c1,
                  '--g-via':  c2,
                  '--g-to':   '#E9C063',
                  fontFamily: 'var(--font-accent)',
                  fontWeight: 500,
                  fontSize: '0.86em',
                  letterSpacing: '-0.01em',
                  fontFeatureSettings: '"calt" 1, "liga" 1, "ss01" 1, "ss02" 1',
                }}
              >
                {pillar.verb || pillar.name.split(' ')[0]}
              </span>
            </MaskWord>{' '}
            <MaskWord delay={0.25} duration={1.1}>
              <span
                className="grad-text"
                style={{ '--g-from': '#FFFFFF', '--g-via': '#F2F4FA', '--g-to': '#93C5FD' }}
              >
                {pillar.name}.
              </span>
            </MaskWord>
          </h1>

          <SectionReveal delay={0.4}>
            <p
              className="mt-7 max-w-2xl text-[17px] md:text-[19px] leading-[1.7] text-paper-dim"
              style={{ fontWeight: 400 }}
            >
              {pillar.short}
            </p>
          </SectionReveal>

          {/* BRASS SPINE RULE — full bleed left through artifact */}
          <div className="mt-14 relative">
            <div
              aria-hidden
              className="absolute left-[calc(var(--spacing-edge)*-1)] right-0 top-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(233, 192, 99, 0.65) 8%, rgba(233, 192, 99, 0.65) 60%, transparent 100%)',
              }}
            />

            {/* The artifact is the centrepiece — full width, deliberately
                framed by mono rail labels on both sides to read as a
                schematic, not a floating image. */}
            <div className="pt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="mono text-[0.55rem] text-paper-mid">
                  FIG. {num} — {(pillar.verb || pillar.name.split(' ')[0]).toUpperCase()} · WORKING SURFACE
                </p>
                <p className="mono text-[0.55rem] tracking-[0.28em]" style={{ color: c1 }}>
                  LIVE · HOVER TO INSPECT
                </p>
              </div>
              <SectionReveal delay={0.15}>
                <div
                  className="relative"
                  style={{
                    /* Wider, softer wash that organically fades to nothing —
                       no visible boundary line at any edge */
                    background:
                      `radial-gradient(ellipse 110% 85% at 50% 50%, ${c1}26 0%, ${c2}14 30%, ${c1}08 55%, transparent 80%)`,
                  }}
                >
                  <div className="px-4 md:px-10 py-8 md:py-12">
                    <PillarArtifact slug={pillar.slug} c1={c1} c2={c2} />
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Summary — sits BELOW the artifact, reads as caption / commentary */}
            <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-3">
                <p className="mono text-[0.6rem]" style={{ color: c1 }}>
                  — Summary
                </p>
              </div>
              <div className="lg:col-span-9">
                <p className="text-paper-dim text-[16.5px] leading-[1.85]">
                  {pillar.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionSeam palette={[c1, c2, '#E9C063', '#22D3EE']} variant="wave-soft" height={140} />

      {/* IN-DEPTH BODY */}
      {pillar.body && (
        <section className="container-edge py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3">
              <p className="mono text-[0.6rem]" style={{ color: c1 }}>— In depth</p>
            </div>
            <div className="lg:col-span-9 space-y-5">
              {pillar.body.map((p, i) => (
                <SectionReveal key={i} delay={i * 0.04}>
                  <p className="text-paper-dim text-[16px] leading-[1.85]">{p}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <SectionSeam palette={[c2, c1, '#E9C063']} variant="prism" height={130} />

      {/* Features grid */}
      {pillar.features && pillar.features.length > 0 && (
        <section className="container-edge py-14 md:py-20">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="mono text-[0.6rem]" style={{ color: c1 }}>— Capabilities</p>
              <h2 className="display-md mt-4">
                <span
                  className="grad-text"
                  style={{ '--g-from': '#FFFFFF', '--g-via': c1, '--g-to': c2 }}
                >
                  What this pillar delivers.
                </span>
              </h2>
            </div>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillar.features.map((f, i) => (
              <SectionReveal key={f.label} delay={i * 0.04}>
                <div className="group glass glass-hover clip-corner p-6 h-full relative overflow-hidden">
                  <span
                    aria-hidden
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${c1}55, transparent 70%)`, filter: 'blur(20px)' }}
                  />
                  <span
                    aria-hidden
                    className="block w-10 h-px mb-5"
                    style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }}
                  />
                  <h3 className="font-display text-paper text-lg leading-tight tracking-[-0.02em]">{f.label}</h3>
                  <p className="mt-3 text-paper-dim text-[14px] leading-relaxed">{f.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {pillar.industries && (
        <SectionSeam palette={[c1, '#E9C063', c2]} variant="wave-fold" height={130} />
      )}

      {/* Industries (Research only) */}
      {pillar.industries && (
        <section className="container-edge py-14 md:py-20">
          <SectionReveal>
            <div className="max-w-2xl mb-10">
              <p className="mono text-[0.6rem]" style={{ color: c1 }}>— New African industries</p>
              <h2 className="display-md mt-4 text-paper">Eight verticals, one Institute.</h2>
            </div>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pillar.industries.map((ind, i) => (
              <SectionReveal key={ind} delay={i * 0.03}>
                <div className="glass clip-corner p-5 h-full">
                  <span
                    className="font-display text-3xl leading-none grad-text"
                    style={{ '--g-from': c1, '--g-via': c2, '--g-to': '#E9C063' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-display text-paper text-[15px] mt-3 leading-tight tracking-[-0.02em]">{ind}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {pillar.sectors && (
        <SectionSeam palette={[c1, c2, '#E9C063']} variant="wave-fold" height={130} />
      )}

      {/* Sectors (Tokenization only) */}
      {pillar.sectors && (
        <section className="container-edge py-14 md:py-20">
          <SectionReveal>
            <div className="max-w-2xl mb-10">
              <p className="mono text-[0.6rem]" style={{ color: c1 }}>— Sectors tokenized</p>
              <h2 className="display-md mt-4 text-paper">Eight pillars of an African economy, on-chain.</h2>
            </div>
          </SectionReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {pillar.sectors.map((s, i) => (
              <SectionReveal key={s.name} delay={i * 0.04}>
                <div className="glass glass-hover clip-corner p-6">
                  <span
                    className="font-display text-3xl leading-none grad-text"
                    style={{ '--g-from': c1, '--g-via': c2, '--g-to': '#E9C063' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-paper text-xl mt-3 tracking-[-0.02em]">{s.name}</h3>
                  <p className="mt-3 text-paper-dim text-[14px] leading-relaxed">{s.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>
      )}

      {/* Outcomes strip */}
      {pillar.outcomes && (
        <>
          <SectionSeam palette={[c2, '#E9C063', c1]} variant="bloom" height={130} />
          <section className="container-edge py-12 md:py-14">
            <p className="mono text-paper-mid text-[0.6rem] text-center mb-6">— Outcomes</p>
            <div className="flex flex-wrap justify-center gap-3">
              {pillar.outcomes.map((o) => (
                <span
                  key={o}
                  className="px-4 py-2 rounded-full mono text-[0.6rem]"
                  style={{
                    border: `1px solid ${c1}55`,
                    color: c1,
                    background: `${c1}10`,
                  }}
                >
                  {o}
                </span>
              ))}
            </div>
          </section>
        </>
      )}

      <SectionSeam palette={[c1, c2, '#3B82F6', '#A855F7']} variant="wave-soft" height={130} />

      {/* Prev / Next */}
      <section className="container-edge py-12 md:py-16">
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to={`/ecosystem/${prev.slug}`}
            className="group glass glass-hover clip-corner p-6 flex items-center gap-4"
          >
            <ArrowLeft size={18} className="text-paper-mid group-hover:text-electric-300 transition-colors" />
            <PrevNextIcon pillar={prev} />
            <div className="flex-1">
              <p className="mono text-paper-mid text-[0.55rem]">Previous pillar</p>
              <p className="font-display text-paper text-lg mt-0.5">{prev.name}</p>
            </div>
            <span
              className="font-display text-2xl leading-none grad-text"
              style={{ '--g-from': prev.accentHex, '--g-via': prev.accentHex2, '--g-to': '#E9C063' }}
            >
              {String(pillars.indexOf(prev) + 1).padStart(2, '0')}
            </span>
          </Link>
          <Link
            to={`/ecosystem/${next.slug}`}
            className="group glass glass-hover clip-corner p-6 flex items-center gap-4 sm:text-right"
          >
            <span
              className="font-display text-2xl leading-none grad-text"
              style={{ '--g-from': next.accentHex, '--g-via': next.accentHex2, '--g-to': '#E9C063' }}
            >
              {String(pillars.indexOf(next) + 1).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <p className="mono text-paper-mid text-[0.55rem]">Next pillar</p>
              <p className="font-display text-paper text-lg mt-0.5">{next.name}</p>
            </div>
            <PrevNextIcon pillar={next} />
            <ArrowUpRight size={18} className="text-paper-mid group-hover:text-electric-300 transition-colors" />
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

function PrevNextIcon({ pillar }) {
  if (!pillar.iconImage) return null
  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{ width: 36, height: 36 }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background: `radial-gradient(circle, ${pillar.accentHex}66 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />
      <img
        src={pillar.iconImage}
        alt=""
        loading="lazy"
        className="relative w-7 h-7 object-contain"
      />
    </div>
  )
}
