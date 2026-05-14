import { motion } from 'framer-motion'

/**
 * Aurora — four large radial gradient blobs that drift slowly across
 * the page, blurred to a mesh-gradient feel. Sits behind content.
 *
 * Props:
 *   palette : array of hex strings (one per blob)
 *   density : 0..1, how visible the mesh is (default 0.55)
 *   className: extra positioning classes (defaults absolute inset-0)
 */
const DEFAULT_PALETTE = ['#3B82F6', '#22D3EE', '#8B5CF6', '#06B6D4']

const Blob = ({ color, x, y, scale, delay = 0, density = 0.55 }) => (
  <motion.div
    aria-hidden
    initial={{ opacity: 0 }}
    animate={{ opacity: density }}
    transition={{ duration: 2, delay }}
    style={{
      position: 'absolute',
      width: 720,
      height: 720,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, ${color}88 35%, transparent 70%)`,
      filter: 'blur(80px)',
      pointerEvents: 'none',
      mixBlendMode: 'screen',
      willChange: 'transform',
    }}
    initial2={{ x: `${x}%`, y: `${y}%` }}
  >
    <motion.div
      style={{ width: '100%', height: '100%' }}
      animate={{
        x: [`${x}%`,    `${x + 8}%`,  `${x - 6}%`, `${x}%`],
        y: [`${y}%`,    `${y - 6}%`,  `${y + 8}%`, `${y}%`],
        scale: [scale,   scale * 1.05, scale * 0.95, scale],
      }}
      transition={{
        duration: 28 + delay * 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  </motion.div>
)

export default function Aurora({
  palette = DEFAULT_PALETTE,
  density = 0.55,
  className = 'absolute inset-0 overflow-hidden pointer-events-none',
}) {
  // 4 blob positions — top-left, top-right, bottom-left, bottom-right offsets
  const positions = [
    { x: 8,  y: 6,  scale: 1.0 },
    { x: 62, y: 12, scale: 0.85 },
    { x: 10, y: 58, scale: 0.95 },
    { x: 58, y: 60, scale: 1.05 },
  ]
  return (
    <div className={className}>
      {palette.slice(0, 4).map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <Blob color={c} {...positions[i]} delay={i * 0.6} density={density} />
        </div>
      ))}
      {/* Subtle dark vignette to keep edges contained */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(3,7,19,0.45) 100%)',
        }}
      />
    </div>
  )
}
