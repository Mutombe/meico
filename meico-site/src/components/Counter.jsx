import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'

/**
 * Counter — animated number that counts up to `value` when scrolled into
 * view. `format(n)` lets the caller stamp suffixes (M, B, %, $).
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
  const inView = useInView(ref, { once: true, margin: '-30%' })
  const mv = useMotionValue(0)
  const formatted = useTransform(mv, (latest) => format(latest))

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [inView, mv, value, duration])

  return (
    <motion.span ref={ref} className={className}>
      {formatted}
    </motion.span>
  )
}
