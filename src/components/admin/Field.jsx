export function Label({ children, hint }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
        {children}
      </span>
      {hint && <span className="text-[11px] text-ink-faint">{hint}</span>}
    </div>
  )
}

export function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-2">
      <Label hint={hint}>{label}</Label>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-green'

export const areaClass = `${inputClass} resize-y leading-relaxed`
