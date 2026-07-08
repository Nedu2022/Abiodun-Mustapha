import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Lightweight ambient particle field: a faint dot-grid for texture plus a few
// slow-drifting dots. Pure CSS + Framer Motion, no heavy canvas library.
// Deterministic pseudo-random so renders are stable (and lint stays happy).
const rand = (seed) => {
  const x = Math.sin(seed * 999.7) * 43758.5453
  return x - Math.floor(x)
}

export default function Particles({ count = 14, tone = 'gold', className = '' }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: rand(i + 1) * 100,
        top: rand(i + 2.3) * 100,
        size: 3 + rand(i + 3.7) * 5,
        delay: rand(i + 4.1) * 4,
        duration: 7 + rand(i + 5.9) * 7,
        drift: 14 + rand(i + 6.4) * 22,
      })),
    [count]
  )

  const color =
    tone === 'gold' ? 'var(--color-gold)' : tone === 'green' ? 'var(--color-green)' : '#ffffff'

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: '26px 26px',
        }}
      />
      {/* drifting particles */}
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: color,
            opacity: 0.35,
          }}
          animate={{ y: [0, -d.drift, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
