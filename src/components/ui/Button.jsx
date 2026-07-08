import { ArrowRight } from 'lucide-react'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

const styles = {
  primary: 'bg-green text-cream hover:bg-green-deep',
  gold: 'bg-gold text-white hover:bg-gold-bright',
  outline:
    'border border-ink/25 text-ink hover:border-green hover:text-green',
  ghostLight: 'border border-cream/30 text-cream hover:border-gold hover:text-gold',
}

export default function Button({
  as = 'a',
  variant = 'primary',
  arrow = true,
  className = '',
  children,
  ...props
}) {
  const Tag = as
  const isExternal = props.href?.startsWith('http')
  const linkProps =
    Tag === 'a' && isExternal ? { target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag
      className={`${base} ${styles[variant]} ${className}`}
      {...linkProps}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Tag>
  )
}
