import { ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import Media from './ui/Media'
import SectionHeading from './ui/SectionHeading'
import { story } from '../data/content'

export default function Story() {
  return (
    <section id="story" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-1 mx-auto w-full max-w-md lg:order-none lg:max-w-none">
          <div className="absolute -bottom-3 -right-3 hidden h-2/3 w-2/3 border border-gold/50 sm:block" />
          <Media
            src={story.image}
            alt="Black and white portrait of Dr. Abiodun Mustapha, who grew up in Oshodi, Lagos"
            label="Add photo"
            width={864}
            height={1080}
            className="relative aspect-[4/5]"
          />
        </Reveal>

        <div>
          <SectionHeading eyebrow={story.eyebrow} title={story.title} accent={story.accent} />
          <div className="mt-7 space-y-5">
            {story.body.map((p, i) => (
              <Reveal as="p" key={i} delay={0.05 * i} className="text-[15px] leading-[1.75] text-ink-soft">
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <a
              href={story.link.href}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-green transition-colors hover:text-gold"
            >
              {story.link.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
