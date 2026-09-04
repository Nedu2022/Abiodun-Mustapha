import { motion } from 'framer-motion'
import Button from './ui/Button'
import Media from './ui/Media'
import Particles from './ui/Particles'
import { hero, credentials } from '../data/content'
import { useBooking } from '../context/BookingContext'

const D = 0.95
const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: D + 0.1 * i },
  }),
}

function Marquee() {
  const items = [...credentials, ...credentials]
  return (
    <div className="relative flex overflow-hidden border-y border-line bg-cream py-4">
      <motion.div
        className="flex flex-none items-center gap-10 pr-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((c, i) => (
          <span key={i} className="flex flex-none items-center gap-10">
            <span className="font-display text-lg italic text-ink/70">{c}</span>
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const { openBookingModal } = useBooking()

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      <Particles count={16} tone="gold" />

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-14 lg:pt-36">
        <div>
          <motion.p custom={0} variants={fade} initial="hidden" animate="show" className="eyebrow text-gold">
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-[4.4rem]"
          >
            {hero.name}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-5 text-[13px] font-medium uppercase tracking-[0.18em] text-green"
          >
            {hero.roles}
          </motion.p>

          <motion.p
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-xl border-l-2 border-gold pl-5 font-display text-xl italic leading-snug text-ink/85 sm:text-2xl"
          >
            {hero.mission}
          </motion.p>

          <motion.p
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft"
          >
            {hero.blurb}
          </motion.p>

          <motion.div
            custom={5}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button onClick={() => openBookingModal()} variant="primary">
              {hero.primary.label}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: D + 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -right-3 -top-3 hidden h-full w-full border border-gold/50 sm:block" />
          <div className="absolute -bottom-3 -left-3 hidden h-2/3 w-2/3 bg-green/10 sm:block" />
          <Media
            src={hero.image}
            alt="Dr. Abiodun Mustapha, personal development professional, educator and speaker, in a portrait suit"
            label="Add photo"
            width={1728}
            height={2160}
            priority
            className="relative aspect-[4/5]"
          />
        </motion.div>
      </div>

      <Marquee />
    </section>
  )
}
