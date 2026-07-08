import Reveal from './ui/Reveal'
import Button from './ui/Button'
import Particles from './ui/Particles'
import { community } from '../data/content'

export default function Community() {
  return (
    <section className="relative overflow-hidden bg-green-deep py-20 text-cream sm:py-28">
      <Particles count={14} tone="gold" />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="eyebrow text-gold">{community.eyebrow}</span>
          <h2 className="mt-5 font-display text-[2rem] leading-tight text-cream sm:text-4xl md:text-[2.9rem]">
            {community.title} <span className="accent">{community.accent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-cream/75">{community.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex justify-center">
          <Button href={community.cta.href} variant="gold">
            {community.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
