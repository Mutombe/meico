import { useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticButton — wraps any clickable content. When the cursor enters,
 * the visual content drifts toward it (subtle, spring-eased).
 *
 * `as` may be either:
 *   · a string  (e.g. 'a', 'button') → uses motion.<tag>
 *   · a component (e.g. Link)        → wrapped via motion.create()/motion()
 *
 * The bare `motion[as]` access is invalid for component values — the
 * underlying Proxy coerces non-string keys to strings, yielding a motion
 * component for a "tag name" like `"function Link()…"` which React then
 * tries to render as a real HTML element. We avoid that here with an
 * explicit type branch + memo.
 */
export default function MagneticButton({
  as = 'button',
  children,
  strength = 0.25,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  const Cmp = useMemo(() => {
    if (typeof as === 'string') {
      return motion[as] || motion.button
    }
    // Component (e.g. <Link>) — wrap with create() if it exists (v11+),
    // fall back to the legacy motion() factory.
    return typeof motion.create === 'function' ? motion.create(as) : motion(as)
  }, [as])

  function onMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <Cmp
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </Cmp>
  )
}
