import Reveal from './ui/Reveal'
import Button from './ui/Button'
import SectionHeading from './ui/SectionHeading'
import { speaking } from '../data/content'

export default function Speaking() {
  return (
    <section id="speaking" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow={speaking.eyebrow} title={speaking.title} accent={speaking.accent} intro={speaking.body} />
          <Reveal delay={0.1} className="mt-8">
            <Button href={speaking.cta.href} variant="primary">
              {speaking.cta.label}
            </Button>
          </Reveal>
        </div>

        <Reveal className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2">
          {speaking.topics.map((t) => (
            <div key={t} className="flex items-center gap-3 border-b border-r border-line px-5 py-5">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />
              <span className="text-[14px] font-medium text-ink">{t}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
