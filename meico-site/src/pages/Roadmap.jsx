import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import SectionSeam from '../components/SectionSeam.jsx'
import RoadmapHero from '../components/page-heroes/RoadmapHero.jsx'
import { roadmap } from '../data/siteData.js'

const STATUS_COLOR = {
  'Active':       '#22D3EE',
  'Upcoming':     '#60A5FA',
  'Planned':      '#8B9DBF',
  'Long-horizon': '#C7A352',
}

/**
 * Roadmap — a serpentine "S" trail.
 *
 * Six phases thread down the page on a weaving spine: phase cards
 * alternate left / right, a hex node sits at each crossing, and the
 * spine itself snakes 25→50→75→50… between them. Each row draws its
 * own continuous spine segment so the trail stays unbroken regardless
 * of card height.
 */
export default function Roadmap() {
  return (
    <PageTransition>
      <RoadmapHero
        kicker="The Path"
        intro="From pre-sale through DAO governance to global scaling — every milestone, plainly stated."
      />

      <SectionSeam palette={['#22D3EE', '#60A5FA', '#E9C063', '#A855F7']} variant="wave-fold" height={140} />

      <section className="container-edge pb-24 md:pb-32">
        {/* Mobile rail spine */}
        <div className="relative">
          <div
            aria-hidden
            className="md:hidden absolute left-[23px] top-3 bottom-3 w-px"
            style={{
              background:
                'linear-gradient(180deg, transparent, #22D3EE 8%, #60A5FA 40%, #A855F7 70%, #E9C063 92%, transparent)',
            }}
          />

          <ol className="relative space-y-6 md:space-y-0">
            {roadmap.map((r, i) => (
              <PhaseRow key={r.phase} r={r} i={i} last={i === roadmap.length - 1} />
            ))}
          </ol>
        </div>
      </section>
    </PageTransition>
  )
}

function PhaseRow({ r, i, last }) {
  const color = STATUS_COLOR[r.status] || '#60A5FA'
  const cardLeft = i % 2 === 0
  const num = String(i + 1).padStart(2, '0')

  // serpentine spine geometry (viewBox 0..100). The spine weaves so
  // that each segment exits on the side the *next* card sits.
  const enterX = i === 0 ? 50 : (i % 2 === 1 ? 78 : 22)
  const exitX  = last ? 50 : (i % 2 === 0 ? 78 : 22)
  const spinePath = `M ${enterX} 0 C ${enterX} 30, 50 25, 50 50 C 50 75, ${exitX} 70, ${exitX} 100`

  return (
    <li className="relative md:grid md:grid-cols-[1fr_300px_1fr] md:items-center md:py-6">
      {/* ---- desktop serpentine spine segment ---- */}
      <svg
        aria-hidden
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
        style={{ width: 300 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`rm-seg-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={STATUS_COLOR[roadmap[Math.max(0, i - 1)].status]} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <path
          d={spinePath}
          fill="none"
          stroke={`url(#rm-seg-${i})`}
          strokeWidth="0.7"
          strokeDasharray="1.6 2.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* ---- node hex — desktop centred on spine / mobile on rail ---- */}
      <div className="md:col-start-2 md:row-start-1 flex md:justify-center">
        <div
          className="absolute md:static left-0 top-1"
          style={{ width: 48, height: 48 }}
        >
          <NodeHex num={num} color={color} active={r.status === 'Active'} />
        </div>
      </div>

      {/* ---- phase card — direct grid child so col-start applies ---- */}
      <div
        className={[
          'pl-16 md:pl-0 md:row-start-1',
          cardLeft ? 'md:col-start-1 md:pr-10 md:text-right' : 'md:col-start-3 md:pl-10',
        ].join(' ')}
      >
        <SectionReveal delay={0.05}>
          <PhaseCard r={r} num={num} color={color} alignRight={cardLeft} />
        </SectionReveal>
      </div>
    </li>
  )
}

function NodeHex({ num, color, active }) {
  return (
    <div className="relative w-full h-full">
      {active && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
          animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <svg viewBox="0 0 48 48" className="relative w-full h-full">
        <polygon
          points="24,2 44,13 44,35 24,46 4,35 4,13"
          fill="rgba(11,23,51,0.95)"
          stroke={color}
          strokeWidth={active ? 2 : 1.4}
        />
        <polygon
          points="24,8 38,16 38,32 24,40 10,32 10,16"
          fill="none"
          stroke={`${color}55`}
          strokeWidth="1"
        />
        <text
          x="24" y="29" textAnchor="middle"
          fontFamily="var(--font-display)" fontSize="14" fontWeight="500"
          letterSpacing="-0.03em" fill="#FFFFFF"
        >
          {num}
        </text>
      </svg>
    </div>
  )
}

function PhaseCard({ r, num, color, alignRight }) {
  return (
    <div
      className="group glass glass-hover clip-corner p-6 md:p-7 relative overflow-hidden"
      style={{ borderColor: `${color}33` }}
    >
      {/* corner accent glow */}
      <span
        aria-hidden
        className={`absolute -top-14 w-40 h-40 rounded-full pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity duration-700 ${
          alignRight ? '-right-14' : '-left-14'
        }`}
        style={{ background: `radial-gradient(circle, ${color}55, transparent 70%)`, filter: 'blur(22px)' }}
      />
      {/* edge rail */}
      <span
        aria-hidden
        className={`absolute top-0 bottom-0 w-[3px] ${alignRight ? 'right-0' : 'left-0'}`}
        style={{ background: `linear-gradient(180deg, ${color}, transparent)` }}
      />

      <div className={`relative flex items-baseline gap-3 flex-wrap ${alignRight ? 'md:justify-end' : ''}`}>
        <span
          className="font-display leading-none"
          style={{
            fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500, letterSpacing: '-0.04em',
            background: `linear-gradient(135deg, #FFFFFF, ${color})`,
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
          }}
        >
          {num}
        </span>
        <span className="mono text-[0.6rem] tracking-[0.2em]" style={{ color }}>{r.phase}</span>
        <span
          className="mono text-[0.52rem] tracking-[0.16em] px-2 py-1 rounded-full"
          style={{ color, background: `${color}14`, border: `1px solid ${color}40` }}
        >
          {r.status}
        </span>
      </div>

      <h2 className="relative font-display text-paper text-xl md:text-2xl mt-3 leading-tight tracking-[-0.02em]">
        {r.title}
      </h2>
      {r.summary && (
        <p className="relative text-paper-mid text-[13.5px] mt-2 leading-relaxed">{r.summary}</p>
      )}

      <span
        aria-hidden
        className={`relative block w-10 h-px mt-5 mb-4 ${alignRight ? 'md:ml-auto' : ''}`}
        style={{ background: `${color}66` }}
      />

      <ul className={`relative grid sm:grid-cols-2 gap-x-6 gap-y-2 ${alignRight ? 'md:text-left' : ''}`}>
        {r.items.map((it, j) => (
          <li key={j} className="flex items-start gap-2.5 text-paper-dim text-[13.5px] leading-relaxed">
            <span
              aria-hidden
              className="mt-[7px] w-1.5 h-1.5 rotate-45 shrink-0"
              style={{ background: color, boxShadow: `0 0 7px ${color}88` }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
