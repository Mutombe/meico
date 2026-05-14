import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * ParticleField — floating dust dots. Deterministic seed so SSR matches CSR
 * (every refresh shows the same field). Each particle pulses opacity and
 * drifts a few pixels on a long loop.
 */
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export default function ParticleField({ count = 50, seed = 42, color = '#93C5FD' }) {
  const particles = useMemo(() => {
    const r = seededRandom(seed)
    return Array.from({ length: count }, (_, i) => ({
      x: r() * 100,
      y: r() * 100,
      size: 0.6 + r() * 1.5,
      delay: r() * 5,
      duration: 4 + r() * 6,
      drift: r() * 30 - 15,
    }))
  }, [count, seed])

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {particles.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.size * 0.15}
            fill={color}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              cx: [p.x, p.x + p.drift * 0.3, p.x],
              cy: [p.y, p.y - 8, p.y],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  )
}
