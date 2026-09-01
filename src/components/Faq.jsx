import { Plus } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { faq } from '../data/content'

// Built on native <details>/<summary> on purpose: the answers sit in the HTML
// whether or not JavaScript runs, so crawlers (and screen readers) get the full
// text while visitors get a quiet accordion.
export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow={faq.eyebrow}
          title={faq.title}
          accent={faq.accent}
          intro={faq.intro}
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <Reveal className="border-t border-line">
          {faq.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg leading-snug text-ink transition-colors group-open:text-green sm:text-xl">
                  {item.q}
                </h3>
                <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line text-gold transition-transform duration-300 group-open:rotate-45">
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-10 text-[15px] leading-relaxed text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
