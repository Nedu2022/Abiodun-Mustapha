import { ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import SectionHeading from './ui/SectionHeading'
import { services } from '../data/content'

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          accent={services.accent}
          intro={services.intro}
          align="center"
          className="mb-14"
        />

        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s, i) => (
            <Reveal key={i} delay={0.05 * (i % 3)} className="h-full">
              <a
                href={services.cta.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-cream"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-gold">{s.tag}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink-soft transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-green" />
                </div>
                <h3 className="mt-4 font-display text-2xl leading-snug text-ink">{s.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-soft">{s.desc}</p>
                <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
                  <span className="font-display text-xl text-green">{s.price}</span>
                  <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-soft">
                    {s.meta}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href={services.cta.href} variant="primary">
            {services.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
