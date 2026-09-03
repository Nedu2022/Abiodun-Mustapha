export function Label({ children, hint }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-700">
        {children}
      </span>
      {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
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
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[14px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-gold'

export const areaClass = `${inputClass} resize-y leading-relaxed`
