import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import AboutSection from '../components/About'
import Button from '../components/ui/Button'
import Particles from '../components/ui/Particles'
import Footer from '../components/Footer'
import { site, hero } from '../data/content'

// A standalone, shareable page: this is the link the team hands out whenever
// someone asks "send me your bio" — no scrolling through the full site required.
export default function About() {
  useEffect(() => {
    document.title = `About — ${site.name}`
  }, [])

  return (
    <>
      <Navbar dark />
      <main>
        <header className="bg-charcoal pb-14 pt-36 text-cream sm:pt-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <span className="eyebrow text-gold">About</span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] sm:text-5xl md:text-[3.4rem]">
              {site.name}
            </h1>
            <p className="mt-4 max-w-xl text-[13px] font-medium uppercase tracking-[0.16em] text-cream/60">
              {hero.roles}
            </p>
          </div>
        </header>

        <AboutSection />

        <section className="relative overflow-hidden bg-green-deep py-20 text-cream sm:py-28">
          <Particles count={16} tone="gold" />

          {/* Oversized initials watermark, echoing the mobile-nav treatment */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="font-display text-[13rem] italic leading-none text-cream/[0.04] sm:text-[18rem]">
              {site.first[0]}
              {site.last[0]}
            </span>
          </div>

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-5 text-center sm:px-8">
            <span className="eyebrow text-gold">Get In Touch</span>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Let&rsquo;s start a <span className="accent text-gold">conversation</span>
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-cream/70">
              For speaking, coaching, or media enquiries, reach out directly and I&rsquo;ll respond
              personally.
            </p>
            <Button href={site.ctaHref} variant="gold" className="mt-2">
              {site.ctaLabel}
            </Button>
          </div>
        </section>
      </main>
      <Footer hideCta />
    </>
  )
}
