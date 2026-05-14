import { ArrowUpRight, DownloadSimple } from '@phosphor-icons/react'

/**
 * DocCard — a richly decorated document card, shared by the Documents
 * page and the homepage Documents vault.
 *
 *   · a drawn SVG "page" glyph (folded corner + text lines) top-left
 *   · the index numeral, oversized + faded, top-right
 *   · a brass hairline, the kind tag, the document name
 *   · faux text-line decoration suggesting a page of prose
 *   · Open + Download actions on a footer rail
 *   · hover: a brass bloom in the corner + the page glyph lifts
 */
export default function DocCard({ d, index }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      className="group relative glass glass-hover clip-corner p-7 h-full flex flex-col overflow-hidden"
      style={{ borderColor: 'rgba(233,192,99,0.20)' }}
    >
      {/* corner bloom on hover */}
      <span
        aria-hidden
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-90 transition-opacity duration-700"
        style={{ background: 'radial-gradient(circle, rgba(233,192,99,0.45), transparent 70%)', filter: 'blur(24px)' }}
      />
      {/* brass accent line, top */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(233,192,99,0.7), transparent)' }}
      />

      {/* HEADER — page glyph + faded index numeral */}
      <div className="relative flex items-start justify-between">
        <div className="transition-transform duration-500 group-hover:-translate-y-1">
          <PageGlyph />
        </div>
        <span
          className="font-display leading-none select-none"
          style={{
            fontSize: '56px', fontWeight: 500, letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, rgba(233,192,99,0.55), rgba(233,192,99,0.05))',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
          }}
        >
          {num}
        </span>
      </div>

      {/* brass hairline */}
      <span aria-hidden className="relative block w-9 h-px mt-6" style={{ background: 'rgba(233,192,99,0.55)' }} />

      {/* kind + name */}
      <p className="relative mono text-paper-mid text-[0.55rem] mt-5 tracking-[0.14em]">{d.kind}</p>
      <h3 className="relative font-display text-paper text-xl md:text-2xl mt-2 leading-tight tracking-[-0.02em]">
        {d.name}
      </h3>

      {/* faux text-line decoration — suggests a page of prose */}
      <div className="relative mt-5 space-y-1.5 flex-1" aria-hidden>
        {[100, 92, 96, 70].map((w, k) => (
          <span
            key={k}
            className="block h-[3px] rounded-full"
            style={{
              width: `${w}%`,
              background: 'linear-gradient(90deg, rgba(96,165,250,0.20), rgba(96,165,250,0.04))',
            }}
          />
        ))}
      </div>

      {/* footer rail — Open + Download */}
      <div
        className="relative mt-7 pt-5 flex items-center justify-between gap-3"
        style={{ borderTop: '1px solid rgba(96,165,250,0.12)' }}
      >
        <a
          href={d.file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mono text-electric-300 text-[0.6rem] tracking-[0.12em] ink-underline"
        >
          OPEN PDF <ArrowUpRight size={11} weight="bold" />
        </a>
        <a
          href={d.file}
          download
          className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-brass-500/40 text-brass-400 hover:bg-brass-500 hover:text-midnight-900 transition-colors"
          aria-label={`Download ${d.name}`}
        >
          <DownloadSimple size={14} weight="bold" />
        </a>
      </div>
    </div>
  )
}

/* A small drawn document — page with a folded corner + text lines. */
function PageGlyph() {
  return (
    <svg width="46" height="56" viewBox="0 0 46 56" fill="none">
      {/* back page (offset, for depth) */}
      <rect x="6" y="4" width="34" height="44" rx="2.5" fill="rgba(233,192,99,0.10)" stroke="rgba(233,192,99,0.25)" strokeWidth="1" />
      {/* front page */}
      <path
        d="M 4 10 L 4 52 L 36 52 L 36 18 L 28 10 Z"
        fill="rgba(11,23,51,0.95)"
        stroke="rgba(233,192,99,0.6)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* folded corner */}
      <path d="M 28 10 L 28 18 L 36 18 Z" fill="rgba(233,192,99,0.30)" stroke="rgba(233,192,99,0.6)" strokeWidth="1" strokeLinejoin="round" />
      {/* text lines */}
      <line x1="10" y1="26" x2="30" y2="26" stroke="rgba(96,165,250,0.5)" strokeWidth="1.4" />
      <line x1="10" y1="32" x2="30" y2="32" stroke="rgba(96,165,250,0.35)" strokeWidth="1.4" />
      <line x1="10" y1="38" x2="24" y2="38" stroke="rgba(96,165,250,0.35)" strokeWidth="1.4" />
      <line x1="10" y1="44" x2="28" y2="44" stroke="rgba(96,165,250,0.25)" strokeWidth="1.4" />
    </svg>
  )
}
