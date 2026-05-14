import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotionPreference } from '../hooks/useReducedMotion.js'

/**
 * RotatingLine — a vertical-slide carousel for a set of short lines.
 *
 * Used in the homepage hero to cycle the three flagship capabilities
 * (freight DePINs, energy DePINs, tokenization) one at a time. An
 * animated hex marker pulses alongside; each line slides up and out as
 * the next slides up and in. Fixed height — no layout shift inside the
 * one-screen hero. Reduced-motion: cross-fades instead of sliding.
 */
export default function RotatingLine({ items = [], interval = 2900, className = '' }) {
  const reduced = useReducedMotionPreference()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const t = setInterval(() => setI((p) => (p + 1) % items.length), interval)
    return () => clearInterval(t)
  }, [items.length, interval])

  if (items.length === 0) return null

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* pulsing hex marker */}
      <span className="relative flex items-center justify-center shrink-0" style={{ width: 24, height: 24 }}>
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.55), transparent 70%)' }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.15, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <svg width="15" height="15" viewBox="0 0 15 15" className="relative">
          <polygon
            points="7.5,1 13.5,4.75 13.5,10.25 7.5,14 1.5,10.25 1.5,4.75"
            fill="none" stroke="#22D3EE" strokeWidth="1.5"
          />
          <circle cx="7.5" cy="7.5" r="1.8" fill="#22D3EE" />
        </svg>
      </span>

      {/* rotating text — fixed-height clip, vertical slide */}
      <div className="relative overflow-hidden" style={{ height: 30 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            initial={reduced ? { opacity: 0 } : { y: '115%', opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { y: '0%', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: '-115%', opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="block whitespace-nowrap font-display leading-[30px]"
            style={{
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              background: 'linear-gradient(100deg, #FFFFFF 0%, #93C5FD 55%, #22D3EE 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {items[i]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
