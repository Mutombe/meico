import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, FileText, Coins, ChartLineUp } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import PillarCard from '../components/PillarCard.jsx'
import HeroChainCore from '../components/HeroChainCore.jsx'
import RotatingLine from '../components/RotatingLine.jsx'
import DocCard from '../components/DocCard.jsx'
import Counter from '../components/Counter.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import { MaskWord } from '../components/MaskReveal.jsx'
import {
  hero, about, pillars, tokenomics, roadmap, documents, brand,
} from '../data/siteData.js'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <SectionSeam palette={['#3B82F6', '#22D3EE', '#E9C063']} variant="wave-soft" height={140} />
      <AboutPreview />
      <SectionSeam palette={['#22D3EE', '#A855F7', '#60A5FA', '#3B82F6']} variant="wave-fold" height={150} />
      <EcosystemPillars />
      <SectionSeam palette={['#A855F7', '#E9C063', '#22D3EE']} variant="prism" height={140} />
      <TokenomicsTeaser />
      <SectionSeam palette={['#E9C063', '#22C55E', '#3B82F6']} variant="bloom" height={150} />
      <RoadmapTeaser />
      <SectionSeam palette={['#3B82F6', '#A855F7']} variant="wave-soft" height={130} />
      <DocumentsVault />
      <SectionSeam palette={['#22D3EE', '#3B82F6', '#A855F7', '#E9C063']} variant="flame" height={170} />
      <ClosingCta />
    </PageTransition>
  )
}

/* ============= HERO ============================================
   One signature visual — the HexConic, partially overlapped by
   the H1's right edge. A brass meridian (vertical hairline) sits
   at the H1's left margin running floor-to-ceiling.
   ============================================================= */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative hero-fit overflow-hidden">
      {/* SIGNATURE ARTIFACT — desktop: the living chain core floats
          right and overlaps the H1's right edge, mouse-reactive +
          scroll-linked. */}
      <motion.div
        style={{ y }}
        className="absolute right-[-12%] lg:right-[-3%] top-1/2 -translate-y-1/2 hidden md:block"
      >
        <HeroChainCore size={680} />
      </motion.div>

      {/* SIGNATURE ARTIFACT — mobile: a softer bleed accent in the
          top-right corner, behind the copy, so text stays the focus. */}
      <div
        aria-hidden
        className="md:hidden absolute right-[-32%] top-[-8%] pointer-events-none"
        style={{ opacity: 0.55 }}
      >
        <HeroChainCore size={320} />
      </div>

      {/* Brass meridian — vertical hairline at H1's left edge */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 hidden md:block"
        style={{
          left: 'var(--spacing-edge)',
          width: 1,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(233, 192, 99, 0.35) 18%, rgba(233, 192, 99, 0.35) 82%, transparent 100%)',
        }}
      />

      {/* Top row — pre-sale tag. Same left padding past the meridian
          as the title block, so nothing sits jammed on the line. */}
      <motion.div
        style={{ opacity }}
        className="container-edge pt-5 md:pt-7 relative flex items-center justify-between gap-6 md:pl-[calc(var(--spacing-edge)+2.25rem)] lg:pl-[calc(var(--spacing-edge)+3rem)]"
      >
        <span className="presale-tag">
          <span className="dot" />
          {hero.edition}
        </span>
        <span className="hidden md:inline mono text-paper-low text-[0.6rem]">
          {hero.ticker}
        </span>
      </motion.div>

      {/* Title — left-aligned, monumental, gradient text. Generous
          left padding past the brass meridian so content never feels
          jammed against the vertical line. */}
      <motion.div
        style={{ opacity }}
        className="container-edge self-center relative w-full py-4 md:pl-[calc(var(--spacing-edge)+2.25rem)] lg:pl-[calc(var(--spacing-edge)+3rem)]"
      >
        <div className="max-w-4xl relative">
          <h1
            className="hero-title"
            style={{
              color: 'transparent',
              backgroundImage:
                'linear-gradient(110deg, #FFFFFF 0%, #F2F4FA 35%, #93C5FD 65%, #22D3EE 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            <MaskWord delay={0.05} duration={1.1}>{hero.titleParts[0].text}</MaskWord>{' '}
            <MaskWord delay={0.25} duration={1.1}>
              <span className="italic-accent" style={{ fontSize: '1em' }}>{hero.titleParts[1].text}</span>
            </MaskWord>{' '}
            <MaskWord delay={0.45} duration={1.1}>{hero.titleParts[2].text}</MaskWord>
          </h1>

          {/* Rotating capability line — cycles the three flagship builds */}
          <SectionReveal delay={0.65}>
            <RotatingLine items={hero.rotators} className="mt-5 md:mt-6" />
          </SectionReveal>

          <SectionReveal delay={0.78}>
            <p className="mt-4 text-paper-dim text-[15px] sm:text-[16px] leading-[1.65] max-w-[52ch]">
              {hero.subline}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.85}>
            <div className="mt-6 md:mt-7 flex flex-wrap items-center gap-3">
              <MagneticButton
                as="a"
                href={hero.primary.to}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric"
              >
                <FileText size={14} weight="regular" /> {hero.primary.label}
              </MagneticButton>
              <MagneticButton as={Link} to={hero.secondary.to} className="btn-ghost">
                {hero.secondary.label} <ArrowUpRight size={12} weight="bold" />
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </motion.div>

      {/* Foot strip — credentials. Padded past the meridian to match. */}
      <motion.div
        style={{ opacity }}
        className="container-edge pb-5 md:pb-7 relative md:pl-[calc(var(--spacing-edge)+2.25rem)] lg:pl-[calc(var(--spacing-edge)+3rem)]"
      >
        <div className="hairline-brass mb-4" />
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 mono text-paper-mid text-[0.6rem]">
          {hero.credentials.map((c, i) => (
            <span key={c} className="inline-flex items-center gap-7">
              <span>{c}</span>
              {i < hero.credentials.length - 1 && (
                <span aria-hidden className="text-electric-500/50">·</span>
              )}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* ============= ABOUT PREVIEW ================================== */
function AboutPreview() {
  return (
    <section className="container-edge py-20 md:py-28 relative">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionReveal>
            <p className="mono text-electric-300 text-[0.62rem]">— {about.kicker}</p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <h2 className="display-lg mt-5">
              <span
                className="grad-text"
                style={{ '--g-from': '#FFFFFF', '--g-via': '#93C5FD', '--g-to': '#22D3EE' }}
              >
                Institutional-grade infrastructure for an
              </span>{' '}
              <span className="italic-accent">African economic step-change.</span>
            </h2>
          </SectionReveal>
        </div>
        <div className="lg:col-span-7 lg:pl-6 space-y-5">
          {about.body.map((p, i) => (
            <SectionReveal key={i} delay={0.1 + i * 0.04}>
              <p className="text-paper-dim leading-[1.78] text-[15.5px]">{p}</p>
            </SectionReveal>
          ))}
          <SectionReveal delay={0.3}>
            <Link to="/about" className="inline-flex items-center gap-2 text-electric-300 ink-underline mono text-[0.65rem] mt-4">
              Read the full About page <ArrowUpRight size={12} weight="bold" />
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

/* ============= ECOSYSTEM PILLARS =============================== */
function EcosystemPillars() {
  return (
    <section className="container-edge py-20 md:py-28 relative">
      <SectionReveal>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="mono text-electric-300 text-[0.62rem]">— The Ecosystem</p>
          <h2 className="display-lg mt-5">
            <span className="grad-text">Seven pillars,</span>{' '}
            <span className="italic-accent">one chain.</span>
          </h2>
          <p className="mt-5 text-paper-dim text-[15.5px] leading-relaxed">
            Each pillar carries its own colour, its own number, its own page. Built on a single Layer-0 chain.
          </p>
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
  )
}

/* ============= TOKENOMICS TEASER =============================== */
function TokenomicsTeaser() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 1100px 700px at 20% 50%, rgba(233, 192, 99, 0.10), transparent 70%), radial-gradient(ellipse 900px 600px at 80% 50%, rgba(34, 211, 238, 0.10), transparent 70%)',
        }}
      />
      <div className="container-edge relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-6">
            <SectionReveal>
              <p className="mono text-brass-400 text-[0.62rem]">— {tokenomics.kicker}</p>
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <h2 className="display-lg mt-5">
                <span className="grad-text">A capped supply,</span>{' '}
                <span className="italic-accent">a transparent allocation.</span>
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="mt-5 text-paper-dim leading-relaxed max-w-xl">
                {tokenomics.intro}
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <MagneticButton as={Link} to="/tokenomics" className="btn-electric mt-7 inline-flex">
                <Coins size={14} /> Full Tokenomics
              </MagneticButton>
            </SectionReveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              {tokenomics.numbers.map((n, i) => (
                <SectionReveal key={n.label} delay={0.1 + i * 0.05}>
                  <NumberTile n={n} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
      <p
        className="mt-3 font-display text-4xl md:text-5xl leading-none tabular-nums grad-text"
        style={{
          '--g-from': '#E9C063',
          '--g-via':  '#F1D58A',
          '--g-to':   '#C7A352',
        }}
      >
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

/* ============= ROADMAP TEASER ================================== */
const RM_STATUS_COLOR = {
  'Active': '#22D3EE', 'Upcoming': '#60A5FA', 'Planned': '#8B9DBF', 'Long-horizon': '#C7A352',
}

function RoadmapTeaser() {
  return (
    <section className="container-edge py-20 md:py-28">
      <SectionReveal>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="mono text-cyan-400 text-[0.62rem]">— The Path</p>
            <h2 className="display-lg mt-5">
              <span className="grad-text" style={{ '--g-from': '#FFFFFF', '--g-via': '#67E8F9', '--g-to': '#22D3EE' }}>
                Six phases,
              </span>{' '}
              <span className="italic-accent">one continent.</span>
            </h2>
          </div>
          <Link to="/roadmap" className="btn-ghost">
            Full Roadmap <ChartLineUp size={14} />
          </Link>
        </div>
      </SectionReveal>

      {/* Desktop — a weaving serpentine trail of 6 nodes */}
      <SectionReveal delay={0.1}>
        <div className="hidden md:block relative">
          <RoadmapTrailSvg />
        </div>
      </SectionReveal>

      {/* Mobile — a compact vertical rail */}
      <div className="md:hidden relative mt-2">
        <div
          aria-hidden
          className="absolute left-[19px] top-2 bottom-2 w-px"
          style={{ background: 'linear-gradient(180deg, transparent, #22D3EE, #60A5FA, #A855F7, #E9C063, transparent)' }}
        />
        <ol className="space-y-3">
          {roadmap.map((r, i) => {
            const c = RM_STATUS_COLOR[r.status] || '#60A5FA'
            return (
              <SectionReveal key={r.phase} delay={i * 0.05}>
                <li className="relative pl-12">
                  <span
                    className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center"
                  >
                    {r.status === 'Active' && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: `${c}55` }}
                      />
                    )}
                    <span
                      className="relative font-display text-[13px] flex items-center justify-center w-9 h-9"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        background: 'rgba(11,23,51,0.95)',
                        border: `1.4px solid ${c}`,
                        color: '#fff',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <div className="glass clip-corner p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="mono text-[0.55rem]" style={{ color: c }}>{r.phase}</p>
                      <p className="mono text-paper-mid text-[0.5rem]">{r.items.length} milestones</p>
                    </div>
                    <h3 className="font-display text-paper text-[14.5px] mt-1.5 leading-snug">{r.title}</h3>
                  </div>
                </li>
              </SectionReveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* A weaving 6-node serpentine — the homepage's compact roadmap trail. */
function RoadmapTrailSvg() {
  const W = 1200, H = 300
  const nodes = roadmap.map((r, i) => ({
    x: 100 + i * 200,
    y: i % 2 === 0 ? 96 : 204,
    r,
    color: RM_STATUS_COLOR[r.status] || '#60A5FA',
  }))
  const path = nodes.reduce((d, n, i) => {
    if (i === 0) return `M ${n.x} ${n.y}`
    const p = nodes[i - 1]
    const mx = (p.x + n.x) / 2
    return `${d} C ${mx} ${p.y}, ${mx} ${n.y}, ${n.x} ${n.y}`
  }, '')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="rmt-path" x1="0" x2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="45%" stopColor="#60A5FA" />
          <stop offset="78%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#E9C063" />
        </linearGradient>
        <filter id="rmt-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <motion.path
        d={path} fill="none" stroke="url(#rmt-path)" strokeWidth="2" strokeDasharray="4 7"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />
      <motion.circle
        r="4.5" fill="#FFFFFF" filter="url(#rmt-glow)"
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ offsetPath: `path("${path}")` }}
      />

      {nodes.map((n, i) => {
        const labelAbove = i % 2 === 0
        const r = 26
        const pts = []
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 3) * k - Math.PI / 2
          pts.push(`${(n.x + r * Math.cos(a)).toFixed(1)},${(n.y + r * Math.sin(a)).toFixed(1)}`)
        }
        return (
          <motion.g
            key={n.r.phase}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {n.r.status === 'Active' && (
              <motion.circle
                cx={n.x} cy={n.y} r={r + 6} fill={n.color}
                animate={{ opacity: [0.12, 0.32, 0.12], r: [r + 4, r + 14, r + 4] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <polygon points={pts.join(' ')} fill="rgba(11,23,51,0.95)" stroke={n.color} strokeWidth={n.r.status === 'Active' ? 2 : 1.4} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fontWeight="500" fill="#FFFFFF">
              {String(i + 1).padStart(2, '0')}
            </text>
            {/* phase label */}
            <text
              x={n.x} y={labelAbove ? n.y - r - 28 : n.y + r + 20}
              textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.18em"
              fill={n.color}
            >
              {n.r.phase.toUpperCase()}
            </text>
            <text
              x={n.x} y={labelAbove ? n.y - r - 14 : n.y + r + 36}
              textAnchor="middle" fontFamily="var(--font-display)" fontSize="12" fill="rgba(226,232,240,0.9)"
            >
              {n.r.title.length > 30 ? n.r.title.slice(0, 28) + '…' : n.r.title}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}

/* ============= DOCUMENTS VAULT ================================ */
function DocumentsVault() {
  return (
    <section className="container-edge py-20 md:py-28">
      <SectionReveal>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="mono text-brass-400 text-[0.62rem]">— The Documents</p>
          <h2 className="display-lg mt-5">
            <span className="grad-text" style={{ '--g-from': '#FFFFFF', '--g-via': '#F1D58A', '--g-to': '#C7A352' }}>
              The case,
            </span>{' '}
            <span className="italic-accent">written in full.</span>
          </h2>
          <p className="mt-5 text-paper-dim text-[15.5px] leading-relaxed">
            Six PDFs covering the technical architecture, tokenomics, statistical data, referral programme and legal terms.
          </p>
        </div>
      </SectionReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.map((d, i) => (
          <SectionReveal key={d.name} delay={i * 0.04}>
            <DocCard d={d} index={i} />
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}

/* ============= CLOSING CTA ===================================== */
function ClosingCta() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 1100px 700px at 50% 50%, rgba(59, 130, 246, 0.22), transparent 70%), radial-gradient(ellipse 800px 500px at 70% 60%, rgba(139, 92, 246, 0.15), transparent 70%)',
        }}
      />
      <div className="container-edge relative max-w-3xl mx-auto text-center">
        <SectionReveal>
          <p className="mono text-electric-300 text-[0.62rem]">— Join the pre-sale</p>
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <h2 className="display-lg mt-5">
            <span className="grad-text">Be on the chain when the chain</span>{' '}
            <span className="italic-accent">goes live.</span>
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <p className="mt-5 text-paper-dim leading-relaxed max-w-2xl mx-auto">
            Pre-sale is opening soon. Read the Whitepaper, join the referral program, and follow @Meicolabs for the start-date announcement.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton as={Link} to="/referrals" className="btn-electric inline-flex">
              Get a Referral Code <ArrowUpRight size={12} weight="bold" />
            </MagneticButton>
            <MagneticButton as={Link} to="/contact" className="btn-ghost inline-flex">
              Talk to the Team
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
