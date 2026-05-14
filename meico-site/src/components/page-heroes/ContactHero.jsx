import { useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeSimple, TwitterLogo, TelegramLogo, FacebookLogo } from '@phosphor-icons/react'
import { MaskWord } from '../MaskReveal.jsx'

/**
 * ContactHero — SIGNAL RINGS.
 *
 * Right: a MEICO node emitting concentric sonar rings outward, with the
 * four channel glyphs sitting on the rings like satellites. Left:
 * kicker + title + intro.
 *
 * Interactive: hover the core to bloom its glow; hover any channel
 * satellite to scale it, light up its connection line, and reveal its
 * label (pointer events → tap on touch).
 */
const SATS = [
  { Icon: EnvelopeSimple, angle: -90,  r: 95,  color: '#60A5FA', label: 'EMAIL' },
  { Icon: TwitterLogo,    angle: -10,  r: 130, color: '#22D3EE', label: 'TWITTER' },
  { Icon: TelegramLogo,   angle: 110,  r: 110, color: '#3B82F6', label: 'TELEGRAM' },
  { Icon: FacebookLogo,   angle: 190,  r: 150, color: '#A855F7', label: 'FACEBOOK' },
]

export default function ContactHero({ kicker, intro, channels = 4 }) {
  const C = 180 // svg centre
  const [hover, setHover] = useState(null) // 'core' | satellite index

  return (
    <section className="page-hero-fit relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 82% 50%, rgba(59,130,246,0.18), transparent 65%)' }}
      />

      <div className="container-edge relative py-8 grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-14 items-center">
        {/* LEFT — copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mono text-electric-300 text-[0.62rem] inline-flex items-center gap-2.5"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-electric-400" style={{ boxShadow: '0 0 8px #60A5FA' }} />
            — {kicker}
          </motion.p>
          <h1 className="display-xl text-paper mt-5">
            <MaskWord delay={0.05}>Let&apos;s</MaskWord>{' '}
            <MaskWord delay={0.25}><span className="italic-accent">talk.</span></MaskWord>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 text-paper-dim text-[16px] leading-[1.8] max-w-lg"
          >
            {intro}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-7 mono text-paper-mid text-[0.6rem] tracking-[0.18em]"
          >
            {String(channels).padStart(2, '0')} DIRECT CHANNELS · RESPONSE WITHIN THE WORKING WEEK
          </motion.p>
        </div>

        {/* RIGHT — signal rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
        >
          <svg viewBox="0 0 360 360" className="w-full max-w-[360px] h-auto" style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id="ct-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#3B82F6" />
              </radialGradient>
              <filter id="ct-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* expanding sonar rings */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={C} cy={C} r="40"
                fill="none" stroke="#60A5FA" strokeWidth="1.2"
                animate={{ r: [40, 168], opacity: [0.55, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 1.33, ease: 'easeOut' }}
              />
            ))}

            {/* static orbit guides */}
            {[95, 130, 150].map((r) => (
              <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="rgba(96,165,250,0.16)" strokeWidth="1" strokeDasharray="2 5" />
            ))}

            {/* centre MEICO node — hoverable */}
            <g
              style={{ cursor: 'pointer', touchAction: 'manipulation' }}
              onPointerEnter={() => setHover('core')}
              onPointerLeave={() => setHover(null)}
              onPointerDown={() => setHover('core')}
            >
              <circle cx={C} cy={C} r="46" fill="transparent" />
              <motion.circle
                cx={C} cy={C} fill="url(#ct-core)" filter="url(#ct-glow)"
                animate={{ r: hover === 'core' ? 40 : 34 }}
                transition={{ duration: 0.3 }}
              />
              <text x={C} y={C + 4} textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="500" fill="#FFFFFF" letterSpacing="-0.02em" pointerEvents="none">MEICO</text>
            </g>

            {/* channel satellites — rendered via foreignObject for crisp icons */}
            {SATS.map(({ Icon, angle, r, color, label }, i) => {
              const rad = (angle * Math.PI) / 180
              const x = C + r * Math.cos(rad)
              const y = C + r * Math.sin(rad)
              const isHover = hover === i
              return (
                <g key={i}>
                  <line
                    x1={C} y1={C} x2={x} y2={y}
                    stroke={isHover ? color : `${color}55`}
                    strokeWidth={isHover ? 1.8 : 1}
                    strokeDasharray="2 4"
                    style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                  />
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: isHover ? 1.25 : 1 }}
                    transition={{ duration: 0.5, delay: isHover ? 0 : 0.6 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: `${x}px ${y}px`, cursor: 'pointer', touchAction: 'manipulation' }}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(null)}
                    onPointerDown={() => setHover(i)}
                  >
                    <circle cx={x} cy={y} r="28" fill="transparent" />
                    {isHover && (
                      <circle cx={x} cy={y} r="28" fill={color} opacity="0.22" filter="url(#ct-glow)" />
                    )}
                    <circle cx={x} cy={y} r="20" fill="rgba(15,31,66,0.92)" stroke={color} strokeWidth={isHover ? 2 : 1.4} />
                    <foreignObject x={x - 11} y={y - 11} width="22" height="22" style={{ pointerEvents: 'none' }}>
                      <div className="w-full h-full flex items-center justify-center" style={{ color }}>
                        <Icon size={16} weight="regular" />
                      </div>
                    </foreignObject>
                    {isHover && (
                      <text
                        x={x} y={y + 34} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.18em" fill={color}
                        pointerEvents="none"
                      >
                        {label}
                      </text>
                    )}
                  </motion.g>
                </g>
              )
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
