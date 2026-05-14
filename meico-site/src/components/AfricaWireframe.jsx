import { motion } from 'framer-motion'

/**
 * AfricaWireframe — glowing constellation map of Africa.
 *
 * Inspired by the reference design (Africa traced in light-blue dots over a
 * dark navy background). Pure SVG so it scales crisp. The dots gently
 * sparkle via staggered framer-motion opacity animation.
 */
const DOTS = [
  // Skeletal Africa silhouette — outline + key inland points
  // Coordinates are inside a 400×500 viewBox.
  // North (top)
  [180, 35], [205, 38], [228, 44], [250, 52], [268, 64], [285, 80],
  [298, 100], [305, 122], [302, 140],
  // East coast (right)
  [296, 165], [285, 185], [275, 205], [268, 225], [258, 250], [250, 275],
  [242, 300], [232, 325], [222, 348], [212, 370],
  // South cap
  [198, 392], [180, 405], [160, 415], [142, 420], [124, 415],
  // West coast (left)
  [112, 400], [100, 380], [92, 358], [84, 335], [78, 312], [72, 288],
  [70, 264], [66, 240], [60, 218], [55, 195],
  // Horn of Africa kicker
  [292, 138], [310, 132],
  // West bulge
  [50, 170], [55, 145], [70, 122], [88, 100], [110, 80], [132, 60], [155, 45],
  // Inland points (city dots — make it feel alive)
  [165, 100], [195, 130], [220, 165], [180, 195], [210, 230], [195, 270],
  [170, 300], [200, 335], [165, 360], [140, 200], [125, 260], [240, 110],
  [255, 195], [142, 145],
]

export default function AfricaWireframe({ className = '', accent = '#60A5FA' }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="Africa map outline"
    >
      <defs>
        <radialGradient id="africa-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor={accent} stopOpacity="0.35" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.08" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id="africa-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft halo behind the continent */}
      <ellipse cx="180" cy="225" rx="170" ry="220" fill="url(#africa-glow)" />

      {/* Connecting hairlines — slow rotation isn't necessary; static lines
          between selected dots add the "data network" feeling. */}
      <g stroke={accent} strokeWidth="0.4" opacity="0.25" fill="none">
        <line x1="180" y1="35"  x2="180" y2="405" />
        <line x1="55"  y1="195" x2="305" y2="122" />
        <line x1="142" y1="420" x2="305" y2="122" />
        <line x1="55"  y1="195" x2="298" y2="100" />
      </g>

      {/* Dots */}
      <g filter="url(#africa-dot-glow)">
        {DOTS.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={1.6}
            fill={accent}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 3 + (i % 5) * 0.6,
              delay: (i % 7) * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </g>
    </svg>
  )
}
