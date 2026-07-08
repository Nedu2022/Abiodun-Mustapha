import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './ui/Logo'
import { site, nav, socials } from '../data/content'
import SocialIcons from './SocialIcons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 1.4 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-line bg-cream/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" aria-label={site.name}>
            <Logo />
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-green"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-green px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-green-deep"
            >
              {site.ctaLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </motion.header>

      {/* Side drawer (mobile) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-charcoal/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col overflow-hidden bg-charcoal text-cream md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              {/* Full name as a large backdrop watermark */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex flex-col justify-center px-6"
              >
                <span className="font-display text-[3.75rem] italic leading-[0.82] text-cream/[0.09]">
                  {site.first}
                </span>
                <span className="font-display text-[3.75rem] leading-[0.82] text-gold/[0.14]">
                  {site.last}
                </span>
              </div>

              <div className="relative flex items-center justify-between px-6 py-5">
                <Logo light />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="relative mt-6 flex flex-1 flex-col justify-center gap-1 px-6">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07 }}
                    className="group flex items-baseline gap-3 border-b border-cream/10 py-4"
                  >
                    <span className="font-display text-xs italic text-gold">0{i + 1}</span>
                    <span className="font-display text-3xl text-cream transition-colors group-hover:text-gold">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="relative flex flex-col gap-5 px-6 py-8">
                <a
                  href={site.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white"
                >
                  {site.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <SocialIcons items={socials} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
