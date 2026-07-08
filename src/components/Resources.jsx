import { ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { resources } from '../data/content'

export default function Resources() {
  return (
    <section id="resources" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={resources.eyebrow}
          title={resources.title}
          accent={resources.accent}
          intro={resources.intro}
          align="center"
          className="mb-14"
        />

        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {resources.items.map((r, i) => (
            <Reveal key={i} delay={0.05 * (i % 2)} className="h-full">
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-cream"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-gold">{r.tag}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink-soft transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-green" />
                </div>
                <h3 className="mt-4 font-display text-2xl leading-snug text-ink">{r.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-soft">{r.desc}</p>
                <span className="mt-6 text-[12px] font-medium uppercase tracking-[0.12em] text-green">
                  Get it free
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
