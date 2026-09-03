export function Label({ children, hint }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-800">
        {children}
      </span>
      {hint && <span className="text-[11px] font-medium text-slate-600">{hint}</span>}
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
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[15px] font-medium text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-gold focus:ring-1 focus:ring-gold'

export const areaClass = `${inputClass} resize-y leading-relaxed`
