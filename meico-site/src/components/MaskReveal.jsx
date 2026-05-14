import { motion } from 'framer-motion'

/**
 * MaskReveal — splits a string into words and reveals each word from
 * behind a horizontal mask. The mask itself is the parent's overflow:hidden;
 * the inner span slides up from below.
 *
 * Pass a JSX child to wrap with the reveal — useful for italic-accent
 * inserts inside a title.
 */
export function MaskWord({ children, delay = 0, duration = 1.0, className = '' }) {
  return (
    <span className={`mask-line ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function MaskReveal({
  text,
  staggerDelay = 0.06,
  baseDelay = 0,
  className = '',
}) {
  const words = String(text).split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <MaskWord delay={baseDelay + i * staggerDelay}>{w}</MaskWord>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
