import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import Media from './ui/Media'
import SectionHeading from './ui/SectionHeading'
import { gallery } from '../data/content'

// Split the photos into two rows so each moves as its own batch.
const half = Math.ceil(gallery.images.length / 2)
const rowA = gallery.images.slice(0, half)
const rowB = gallery.images.slice(half)

function Row({ images, direction = 'left', duration = 42 }) {
  // Duplicate the batch so the loop is seamless.
  const loop = [...images, ...images]
  const from = direction === 'left' ? '0%' : '-50%'
  const to = direction === 'left' ? '-50%' : '0%'

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex w-max gap-4 pr-4"
        animate={{ x: [from, to] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((src, i) => (
          <div key={i} className="h-56 w-44 flex-none sm:h-72 sm:w-60">
            <Media src={src} alt="Abiodun Mustapha" label="Photo" className="h-full w-full" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Gallery() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto mb-12 max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} accent={gallery.accent} />
      </div>

      <div className="flex flex-col gap-4">
        <Row images={rowA} direction="left" duration={46} />
        <Row images={rowB} direction="right" duration={54} />
      </div>

      <Reveal className="mx-auto mt-12 max-w-6xl px-5 text-center sm:px-8">
        <p className="text-[13px] uppercase tracking-[0.16em] text-ink-soft">
          On stage, on the mic, and in the room
        </p>
      </Reveal>
    </section>
  )
}
