/**
 * TopTicker — thin mono data band that sits below the nav. Scrolls
 * horizontally on a long infinite loop, sized so a single screen of
 * content tells the institutional story (token caps, supply, focus)
 * without ever feeling like a CoinMarketCap ticker.
 */

const ITEMS = [
  '$MEICO',
  '360M offered',
  '$4.5M soft cap',
  '$18M hard cap',
  '1B max supply · permanently capped',
  'Pre-sale · Coming soon',
  'Layer-0 · Hybrid · Stellar consensus',
  'Two-token model · MEICO + Stable',
  'Africa · RWA · DePIN',
  '10% referral bonus',
]

function Track() {
  return (
    <div className="flex items-center gap-10 px-5 whitespace-nowrap">
      {ITEMS.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-10">
          <span className="mono text-paper-mid text-[0.66rem]">{it}</span>
          <span aria-hidden className="text-electric-400/50">◆</span>
        </span>
      ))}
    </div>
  )
}

export default function TopTicker() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-electric-500/15 bg-midnight-700/60 backdrop-blur-md"
      style={{ height: 32 }}
    >
      <div
        className="flex h-full items-center"
        style={{
          animation: 'ticker-scroll 60s linear infinite',
          width: 'max-content',
        }}
      >
        <Track />
        <Track />
      </div>
      {/* Edge fades */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-16 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgb(3,7,19) 0%, transparent 100%)' }}
      />
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 w-16 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, rgb(3,7,19) 0%, transparent 100%)' }}
      />
    </div>
  )
}
