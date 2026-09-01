import { site } from '../../data/content'

export default function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`text-[10px] font-medium uppercase tracking-[0.4em] ${
          light ? 'text-gold' : 'text-gold'
        }`}
      >
        {site.first}
      </span>
      <span
        className={`font-display text-[1.35rem] leading-none ${light ? 'text-cream' : 'text-ink'}`}
      >
        {site.last}
        <span className="text-gold">.</span>
      </span>
    </span>
  )
}
