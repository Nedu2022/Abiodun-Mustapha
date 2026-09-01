import Reveal from './ui/Reveal'
import Button from './ui/Button'
import Media from './ui/Media'
import SectionHeading from './ui/SectionHeading'
import { book } from '../data/content'

export default function Book() {
  return (
    <section id="book" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-[280px]">
          <div className="absolute -inset-3 -z-10 bg-green/10" />
          <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full border border-gold/50" />
          <Media
            src={book.cover}
            alt={`Cover of ${book.title} ${book.accent}, a book by Dr. Abiodun Mustapha`}
            label="Book cover"
            width={354}
            height={500}
            className="aspect-[354/500] shadow-2xl"
          />
        </Reveal>

        <div>
          <SectionHeading eyebrow={book.eyebrow} title={book.title} accent={book.accent} />
          <Reveal delay={0.05}>
            <p className="mt-5 font-display text-xl italic text-green">{book.subtitle}</p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">{book.description}</p>
            <p className="mt-4 text-[13px] uppercase tracking-[0.12em] text-ink-soft/80">{book.foreword}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
            <Button href={book.primary.href} variant="primary">
              {book.primary.label}
            </Button>
            <Button href={book.secondary.href} variant="outline" arrow={false}>
              {book.secondary.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
