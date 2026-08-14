import Reveal from './ui/Reveal'
import Media from './ui/Media'
import SectionHeading from './ui/SectionHeading'
import { about } from '../data/content'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-1 mx-auto w-full max-w-md lg:order-none lg:sticky lg:top-28 lg:max-w-none">
          <div className="absolute -left-3 -top-3 hidden h-2/3 w-2/3 border border-gold/50 sm:block" />
          <Media
            src={about.image}
            alt="Dr. Abiodun Mustapha"
            label="Add photo"
            className="relative aspect-[4/5]"
          />
        </Reveal>

        <div>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} accent={about.accent} />

          <div className="mt-7 space-y-5">
            {about.body.map((p, i) => (
              <Reveal as="p" key={i} delay={0.05 * i} className="text-[15px] leading-[1.75] text-ink-soft">
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <span className="eyebrow text-gold">Memberships & Certifications</span>
            <ul className="mt-5 grid gap-x-6 gap-y-3 border-t border-line pt-5 sm:grid-cols-2">
              {about.credentials.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
