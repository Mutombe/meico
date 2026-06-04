import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'

/**
 * Counter — animated number that counts up to `value` when scrolled into
 * view. `format(n)` lets the caller stamp suffixes (M, B, %, $).
 *
 * It starts on scroll-in, but ALSO has a short mount fallback so a tile
 * that never crosses the in-view threshold (e.g. sitting low on a short
 * viewport) can never stay frozen at 0.
 *
 * Example:
 *   <Counter value={360} format={(n) => `${Math.round(n)}M`} />
 */
export default function Counter({
  value,
  format = (n) => Math.round(n).toString(),
  duration = 1.8,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const mv = useMotionValue(0)
  const formatted = useTransform(mv, (latest) => format(latest))
  const started = useRef(false)

  useEffect(() => {
    let controls
    const start = () => {
      if (started.current) return
      started.current = true
      controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] })
    }
    if (inView) start()
    // Fallback: guarantee the number resolves even if never scrolled into view.
    const t = setTimeout(start, 1200)
    return () => {
      clearTimeout(t)
      if (controls) controls.stop()
    }
  }, [inView, mv, value, duration])

  return (
    <motion.span ref={ref} className={className}>
      {formatted}
    </motion.span>
  )
}
