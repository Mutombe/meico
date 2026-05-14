import { useEffect, useState } from 'react'

/**
 * Respect prefers-reduced-motion. Use to disable showy loops on artifacts.
 */
export function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(m.matches)
    const fn = (e) => setReduced(e.matches)
    m.addEventListener?.('change', fn)
    return () => m.removeEventListener?.('change', fn)
  }, [])
  return reduced
}
