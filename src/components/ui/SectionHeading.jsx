import Reveal from './Reveal'

// Consistent section header: gold eyebrow + Playfair heading with italic accent.
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = 'left',
  light = false,
  className = '',
}) {
  const alignment =
    align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <Reveal className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow mb-5 ${light ? 'text-gold' : 'text-gold'}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-[2rem] leading-[1.12] sm:text-4xl md:text-[2.9rem] ${
          light ? 'text-cream' : 'text-ink'
        }`}
      >
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
      {intro && (
        <p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed ${
            light ? 'text-cream/70' : 'text-ink-soft'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}
