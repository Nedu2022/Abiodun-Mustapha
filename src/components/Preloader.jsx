import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../data/content'

// Elegant intro: a rotating gold ring around the monogram, then a curtain lift.
// Held to 900ms on purpose. The curtain sits over the hero, so however long it
// stays up is added directly to Largest Contentful Paint, the Core Web Vital
// Google grades the page on. Anyone who has asked their system for reduced
// motion skips it entirely.
const HOLD_MS = 900

export default function Preloader() {
  const [done, setDone] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (done) return undefined
    const t = setTimeout(() => setDone(true), HOLD_MS)
    return () => clearTimeout(t)
  }, [done])

  // lock scroll while it's up
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  const initials = (site.first[0] + site.last[0]).toUpperCase()

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex h-28 w-28 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/25 border-t-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl italic uppercase tracking-[0.1em] text-cream"
            >
              {initials}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
