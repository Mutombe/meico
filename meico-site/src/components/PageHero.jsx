import { motion } from 'framer-motion'
import HexConic from './HexConic.jsx'
import SectionReveal from './SectionReveal.jsx'
import { MaskWord } from './MaskReveal.jsx'

/**
 * PageHero — the shared hero for every non-home page.
 *
 * Carries the same visual DNA as the homepage hero:
 *   · a brass meridian (vertical hairline) at the content's left edge
 *   · a HexConic signature visual, tinted in the page's own palette,
 *     floating right and bleeding off the edge
 *   · a palette-tinted radial backdrop
 *   · an optional foot rail of stats with a brass hairline divider
 *
 * The asymmetric grid + meridian + stat-rail mean no page hero ever
 * reads as "centred text on emptiness" again.
 *
 * PROPS
 *   kicker       — short mono label, e.g. "The Token"
 *   kickerColor  — accent hex for the kicker + meridian glow
 *   titleLead    — first part of the H1 (plain words)
 *   titleAccent  — the accent word(s), rendered in the Fira Code accent
 *   intro        — paragraph under the title
 *   palette      — 3-5 hex colours; drives HexConic + backdrop
 *   stats        — [{ value, label }] foot rail; omit to hide the rail
 *   children     — optional extra content rendered under the intro
 *                  (CTAs, chips, etc.)
 *   align        — 'split' (default, visual right) | 'center'
 */
export default function PageHero({
  kicker,
  kickerColor = '#60A5FA',
  titleLead,
  titleAccent,
  intro,
  palette = ['#3B82F6', '#22D3EE', '#E9C063', '#8B5CF6', '#3B82F6'],
  stats = [],
  children,
  align = 'split',
}) {
  const [c1, c2 = c1] = palette
  const isCenter = align === 'center'

  return (
    <section className="relative overflow-hidden">
      {/* Palette-tinted radial backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 1100px 620px at ${
            isCenter ? '50%' : '38%'
          } 32%, ${c1}26 0%, ${c2}12 40%, transparent 78%)`,
        }}
      />

      {/* Brass meridian — only in split mode, mirrors the homepage */}
      {!isCenter && (
        <div
          aria-hidden
          className="absolute top-0 bottom-0 hidden md:block"
          style={{
            left: 'var(--spacing-edge)',
            width: 1,
            background:
              'linear-gradient(180deg, transparent 0%, rgba(233, 192, 99, 0.35) 16%, rgba(233, 192, 99, 0.35) 84%, transparent 100%)',
          }}
        />
      )}

      {/* HexConic signature visual — split mode only */}
      {!isCenter && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[-16%] sm:right-[-10%] lg:right-[-4%] top-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
        >
          <HexConic size={540} palette={[...palette, palette[0]]} />
        </motion.div>
      )}

      <div
        className={`container-edge relative pt-16 md:pt-24 pb-12 md:pb-16 ${
          !isCenter
            ? 'md:pl-[calc(var(--spacing-edge)+2.25rem)] lg:pl-[calc(var(--spacing-edge)+3rem)]'
            : ''
        }`}
      >
        <div className={isCenter ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'}>
          <SectionReveal>
            <p
              className="mono text-[0.62rem] inline-flex items-center gap-2.5"
              style={{ color: kickerColor }}
            >
              <span
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: kickerColor, boxShadow: `0 0 8px ${kickerColor}` }}
              />
              {kicker}
            </p>
          </SectionReveal>

          <h1 className="display-xl text-paper mt-5">
            <MaskWord delay={0.05} duration={1.1}>{titleLead}</MaskWord>{' '}
            {titleAccent && (
              <MaskWord delay={0.25} duration={1.1}>
                <span className="italic-accent">{titleAccent}</span>
              </MaskWord>
            )}
          </h1>

          {intro && (
            <SectionReveal delay={0.4}>
              <p className="mt-7 text-paper-dim text-[16px] md:text-[16.5px] leading-[1.8]">
                {intro}
              </p>
            </SectionReveal>
          )}

          {children && (
            <SectionReveal delay={0.55}>
              <div className="mt-8">{children}</div>
            </SectionReveal>
          )}
        </div>

        {/* Foot stat-rail — brass hairline + evenly-spaced stat cells */}
        {stats.length > 0 && (
          <SectionReveal delay={0.6}>
            <div className={`mt-12 md:mt-16 ${isCenter ? 'max-w-3xl mx-auto' : ''}`}>
              <div
                aria-hidden
                className="h-px w-full mb-6"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(233,192,99,0.55) 0%, rgba(233,192,99,0.18) 55%, transparent 100%)',
                }}
              />
              <dl
                className={`grid gap-x-8 gap-y-6 ${
                  stats.length >= 4
                    ? 'grid-cols-2 md:grid-cols-4'
                    : 'grid-cols-3'
                }`}
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <dd
                      className="font-display leading-none"
                      style={{
                        fontSize: 'clamp(26px, 3vw, 38px)',
                        fontWeight: 500,
                        letterSpacing: '-0.03em',
                        background: `linear-gradient(135deg, #FFFFFF, ${c1})`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {s.value}
                    </dd>
                    <dt className="mono text-paper-mid text-[0.58rem] mt-2 tracking-[0.16em]">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
