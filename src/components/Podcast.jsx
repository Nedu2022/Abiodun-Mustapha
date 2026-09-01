import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import Particles from './ui/Particles'
import SectionHeading from './ui/SectionHeading'
import { podcast } from '../data/content'

// Rotating "vinyl" made of concentric rings + a photo label in the middle.
function Vinyl() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <motion.div
        className="absolute inset-0 rounded-full bg-charcoal-800"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0 2px, transparent 2px 6px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-cream/10" />
        <div className="absolute inset-[18%] rounded-full border border-gold/30" />
        {/* label */}
        <div className="absolute inset-[34%] flex items-center justify-center overflow-hidden rounded-full bg-gold">
          <img
            src="/images/portrait-formal.jpg"
            alt="Dr. Abiodun Mustapha, host of the Growth Secrets podcast"
            width={1728}
            height={2160}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-charcoal" />
      </motion.div>
    </div>
  )
}

export default function Podcast() {
  return (
    <section id="podcast" className="relative scroll-mt-24 overflow-hidden bg-charcoal py-20 text-cream sm:py-28">
      <Particles count={12} tone="gold" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Vinyl />
        </Reveal>
        <div>
          <SectionHeading eyebrow={podcast.eyebrow} title={podcast.title} accent={podcast.accent} intro={podcast.body} light />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
            <Button href={podcast.primary.href} variant="gold">
              {podcast.primary.label}
            </Button>
            <Button href={podcast.secondary.href} variant="ghostLight">
              {podcast.secondary.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
