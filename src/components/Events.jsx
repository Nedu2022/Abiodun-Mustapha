import { ArrowRight, Mic } from 'lucide-react'
import Reveal from './ui/Reveal'
import Media from './ui/Media'
import SectionHeading from './ui/SectionHeading'
import { events } from '../data/content'

// The TED-style wordmark: "TED" in cream, the "x" in the signature TED red.
function TedxMark() {
  return (
    <span className="inline-flex items-baseline font-sans font-bold uppercase leading-none tracking-tight">
      <span className="text-cream text-3xl sm:text-4xl">TED</span>
      <span className="text-[#e62b1e] text-3xl sm:text-4xl">x</span>
    </span>
  )
}

export default function Events() {
  return (
    <section
      id="events"
      className="scroll-mt-24 relative overflow-hidden bg-charcoal py-20 text-cream sm:py-28"
    >
      {/* Soft green glow to give the dark section depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-green/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={events.eyebrow}
          title={events.title}
          accent={events.accent}
          intro={events.intro}
          light
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Featured: TEDx */}
          <Reveal className="lg:col-span-2">
            <div className="group relative h-full min-h-[22rem] overflow-hidden rounded-2xl">
              <Media
                src={events.featured.image}
                alt="Dr. Abiodun Mustapha speaking on the TEDx stage about purpose"
                label="TEDx"
                width={1000}
                height={609}
                className="absolute inset-0 h-full w-full"
                imgClassName="object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/10" />

              <div className="relative flex h-full flex-col justify-end gap-4 p-6 sm:p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cream/25 bg-charcoal/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
                  <Mic className="h-3.5 w-3.5 text-gold" />
                  {events.featured.tag}
                </span>
                <TedxMark />
                <p className="max-w-md text-[15px] leading-relaxed text-cream/80">
                  {events.featured.desc}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Credibility panel */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-cream/10 bg-charcoal-800 p-6 sm:p-8">
              <div className="flex flex-col gap-6">
                {events.stats.map((s) => (
                  <div key={s.label} className="border-b border-cream/10 pb-5 last:border-0 last:pb-0">
                    <div className="font-display text-3xl text-gold sm:text-4xl">{s.value}</div>
                    <div className="mt-1 text-[13px] uppercase tracking-[0.12em] text-cream/60">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={events.cta.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-gold-bright"
              >
                {events.cta.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Other engagements */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {events.list.map((e, i) => (
            <Reveal key={e.title} delay={0.05 * i}>
              <div className="group h-full overflow-hidden rounded-2xl border border-cream/10 bg-charcoal-800">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Media
                    src={e.image}
                    alt={`Dr. Abiodun Mustapha as ${e.role} at ${e.title.trim()}`}
                    label={e.title}
                    className="absolute inset-0 h-full w-full"
                    imgClassName="object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                    {e.role}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg leading-snug text-cream">{e.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-cream/55">{e.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
