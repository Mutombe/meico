import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'

/**
 * PillarCard — icon-led card.
 *
 *   [icon 96px]                          01
 *                                        — R
 *
 *   ────────────────────                       ← thin brass underline (full width)
 *
 *   Pillar Name                          ← display-md
 *   short text                           ← 14px description
 *
 *   EXPLORE THE PILLAR                   →     ← gradient mono link + arrow node
 *
 * The pillar's transparent-BG PNG icon is the visual anchor, with the
 * ordinal as a small mono ledger mark in the top-right corner.
 * If `iconImage` is null (B2B has no PNG yet), an SVG monogram tile is
 * drawn from the pillar's gradient instead, keeping the system uniform.
 *
 * Hover state:
 *   · border picks up the pillar's primary accent at 50% opacity
 *   · a 2px gradient bar slides in from the left along the card's bottom
 *   · the icon lifts 4px and a soft glow blooms behind it
 *   · the bottom-right arrow node fills with the pillar gradient
 */
export default function PillarCard({ pillar, index = 0 }) {
  const { accentHex: c1, accentHex2: c2, slug, name, short, letter, iconImage } = pillar
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link
      to={`/ecosystem/${slug}`}
      className="group relative block clip-corner overflow-hidden h-full"
      style={{
        background:
          'linear-gradient(180deg, rgba(15, 31, 66, 0.50) 0%, rgba(6, 13, 32, 0.92) 100%)',
        border: '1px solid rgba(96, 165, 250, 0.10)',
        transition:
          'border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${c1}55`
        e.currentTarget.style.boxShadow = `0 24px 60px -22px ${c1}55, 0 0 0 1px ${c1}22 inset`
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.10)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Bottom gradient bar — slides in left-to-right on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
        style={{
          background: `linear-gradient(90deg, ${c1}, ${c2}, ${c1})`,
          backgroundSize: '200% 100%',
        }}
      />

      {/* Soft radial accent — bottom-right corner, gently visible, lifts on hover */}
      <span
        aria-hidden
        className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${c1}44 0%, ${c2}11 50%, transparent 70%)`,
          filter: 'blur(16px)',
        }}
      />

      <div className="relative flex flex-col h-full p-7 md:p-8">
        {/* Header row — icon (left) + ordinal/letter ledger (right) */}
        <div className="flex items-start justify-between gap-4">
          {/* Icon tile — 96px, with hover bloom */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: 96, height: 96 }}
          >
            {/* Glow behind icon — grows on hover */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full transition-all duration-700 opacity-40 group-hover:opacity-90"
              style={{
                background: `radial-gradient(circle, ${c1}66 0%, ${c2}22 45%, transparent 75%)`,
                filter: 'blur(18px)',
                transform: 'scale(0.9)',
              }}
            />

            {iconImage ? (
              <img
                src={iconImage}
                alt={`${name} icon`}
                loading="lazy"
                className="relative w-[78px] h-[78px] object-contain transition-transform duration-500 group-hover:-translate-y-1"
                style={{ filter: `drop-shadow(0 4px 12px ${c1}66)` }}
              />
            ) : (
              <MonogramTile letter={letter} c1={c1} c2={c2} />
            )}
          </div>

          {/* Ordinal ledger — small mono in the corner */}
          <div className="flex flex-col items-end gap-1.5 pt-1">
            <span
              className="font-display leading-none"
              style={{
                fontSize: '22px',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                background: `linear-gradient(135deg, ${c1}, ${c2})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {num}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="block w-1 h-1 rounded-full bg-brass-400"
                style={{ boxShadow: '0 0 6px #E9C063' }}
              />
              <span className="mono text-paper-mid text-[0.6rem] tracking-[0.22em]">
                {letter || 'M'}
              </span>
            </span>
          </div>
        </div>

        {/* Brass underline — full width, sits below header */}
        <span
          aria-hidden
          className="mt-7 block h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(233, 192, 99, 0.55) 0%, rgba(233, 192, 99, 0.18) 70%, transparent 100%)',
          }}
        />

        {/* Name + description */}
        <h3
          className="font-display text-paper mt-6 leading-[1.05]"
          style={{
            fontSize: 'clamp(22px, 2.2vw, 26px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          {name}
        </h3>
        <p className="mt-3 text-paper-dim text-[14px] leading-[1.65] flex-1">
          {short}
        </p>

        {/* Foot — gradient EXPLORE + arrow node */}
        <div className="mt-8 flex items-center justify-between">
          <span
            className="mono text-[0.6rem] tracking-[0.22em] inline-flex items-center gap-2 transition-transform duration-500 group-hover:gap-3"
            style={{
              background: `linear-gradient(110deg, ${c1}, ${c2})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Explore the pillar
          </span>
          <span
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-500"
            style={{
              borderColor: `${c1}55`,
              background: 'transparent',
            }}
            data-arrow="true"
          >
            <span
              className="absolute inset-0 inline-flex items-center justify-center rounded-full transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${c1}, ${c2})`,
                opacity: 0,
              }}
            />
            <ArrowUpRight
              size={14}
              weight="bold"
              className="relative"
              style={{ color: c1, transition: 'color 0.4s ease' }}
            />
          </span>
        </div>
      </div>

      {/* CSS for color-flood on arrow hover — keep simple */}
      <style>{`
        a.group:hover [data-arrow="true"] > span:first-of-type { opacity: 1 !important; }
        a.group:hover [data-arrow="true"] svg { color: #FFFFFF !important; }
      `}</style>
    </Link>
  )
}

/**
 * MonogramTile — fallback when no iconImage is available (B2B).
 * Renders a clipped hex with the pillar's gradient and the pillar
 * letter centred. Same visual weight as the 78px PNG icons.
 */
function MonogramTile({ letter, c1, c2 }) {
  return (
    <svg viewBox="0 0 78 78" width="78" height="78" className="relative">
      <defs>
        <linearGradient id={`mg-${letter}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <filter id={`mg-blur-${letter}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <polygon
        points="39,4 70,21 70,57 39,74 8,57 8,21"
        fill={`url(#mg-${letter})`}
        opacity="0.18"
        filter={`url(#mg-blur-${letter})`}
      />
      <polygon
        points="39,8 66,22.5 66,55.5 39,70 12,55.5 12,22.5"
        fill="none"
        stroke={`url(#mg-${letter})`}
        strokeWidth="1.5"
      />
      <text
        x="39"
        y="49"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="32"
        fontWeight="500"
        letterSpacing="-0.03em"
        fill={`url(#mg-${letter})`}
      >
        {letter}
      </text>
    </svg>
  )
}
