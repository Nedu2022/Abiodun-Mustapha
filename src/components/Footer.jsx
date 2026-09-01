import { ArrowRight } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import SocialIcons from './SocialIcons'
import Logo from './ui/Logo'
import TopLink from './ui/TopLink'
import { site, nav, socials } from '../data/content'

export default function Footer({ hideCta = false }) {
  const year = new Date().getFullYear()
  const onHome = useLocation().pathname === '/'

  return (
    <footer id="contact" className="scroll-mt-24 bg-charcoal text-cream">
      {!hideCta && (
        <div className="border-b border-cream/12">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 sm:py-20 md:flex-row md:items-center">
            <div>
              <h2 className="max-w-xl font-display text-3xl leading-tight sm:text-[2.6rem]">
                Let us build something that <span className="accent text-gold">lasts</span>
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-cream/70">
                Whether it is a booking, a question, or just a hello, I would love to hear from you.
              </p>
            </div>
            <a
              href={site.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex flex-none items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-gold-bright"
            >
              {site.ctaLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo light />
          <p className="mt-3 text-[13px] uppercase tracking-[0.18em] text-cream/50">
            Purpose · Growth · Becoming
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {nav.map((item) =>
            item.href.startsWith('/') && !item.href.includes('#') ? (
              <TopLink
                key={item.href}
                to={item.href}
                className="text-[13px] font-medium uppercase tracking-[0.1em] text-cream/70 transition-colors hover:text-gold"
              >
                {item.label}
              </TopLink>
            ) : (
              <a
                key={item.href}
                href={onHome ? item.href : `/${item.href}`}
                className="text-[13px] font-medium uppercase tracking-[0.1em] text-cream/70 transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <SocialIcons items={socials} />
      </div>

      <div className="border-t border-cream/12 py-6 text-center text-[12px] uppercase tracking-[0.14em] text-cream/40">
        {site.name} © {year} · All rights reserved
      </div>
    </footer>
  )
}
