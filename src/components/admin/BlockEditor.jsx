import { ArrowDown, ArrowUp, Plus, Trash2, Heading, AlignLeft, Image as ImageIcon, Quote, List, Minus } from 'lucide-react'
import { Label, areaClass, inputClass } from './Field'
import CloudinaryUpload from './CloudinaryUpload'

const TYPES = [
  { id: 'paragraph', label: 'Text', icon: AlignLeft },
  { id: 'heading', label: 'Heading', icon: Heading },
  { id: 'image', label: 'Image', icon: ImageIcon },
  { id: 'quote', label: 'Quote', icon: Quote },
  { id: 'list', label: 'List', icon: List },
  { id: 'divider', label: 'Divider', icon: Minus },
]

function blankBlock(type) {
  if (type === 'image') return { type, src: '', alt: '', caption: '' }
  if (type === 'list') return { type, items: [''] }
  if (type === 'quote') return { type, text: '', cite: '' }
  if (type === 'divider') return { type }
  return { type, text: '' }
}

export default function BlockEditor({ body, onChange }) {
  const update = (index, next) => {
    const copy = [...body]
    copy[index] = next
    onChange(copy)
  }

  const move = (index, delta) => {
    const target = index + delta
    if (target < 0 || target >= body.length) return
    const copy = [...body]
    const [item] = copy.splice(index, 1)
    copy.splice(target, 0, item)
    onChange(copy)
  }

  const remove = (index) => onChange(body.filter((_, i) => i !== index))

  const add = (type) => onChange([...body, blankBlock(type)])

  return (
    <div className="flex flex-col gap-5">
      <Label hint={`${body.length} blocks`}>Article Content (Medium Style Blocks)</Label>

      {body.map((block, index) => (
        <div key={index} className="rounded-xl border border-slate-300 bg-white shadow-xs transition-all hover:border-gold/50">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-2.5 rounded-t-xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-800 bg-gold/15 px-2.5 py-0.5 rounded-md">
                {TYPES.find((t) => t.id === block.type)?.label || block.type}
              </span>
              <select
                value={block.type}
                onChange={(e) => update(index, blankBlock(e.target.value))}
                className="bg-transparent text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700 outline-none cursor-pointer hover:text-gold"
                aria-label="Change block type"
              >
                {TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    Change to {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => move(index, -1)}
                aria-label="Move block up"
                className="rounded p-1.5 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                title="Move Up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                aria-label="Move block down"
                className="rounded p-1.5 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
                title="Move Down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Delete block"
                className="rounded p-1.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Delete Block"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4">
            {(block.type === 'paragraph' || block.type === 'heading') && (
              <textarea
                value={block.text || ''}
                onChange={(e) => update(index, { ...block, text: e.target.value })}
                rows={block.type === 'heading' ? 2 : 5}
                placeholder={block.type === 'heading' ? 'Section Heading (e.g., The Power of Purpose)' : 'Write your narrative here...'}
                className={areaClass}
              />
            )}

            {block.type === 'quote' && (
              <>
                <textarea
                  value={block.text || ''}
                  onChange={(e) => update(index, { ...block, text: e.target.value })}
                  rows={3}
                  placeholder="Insert a key quote or pull-out statement..."
                  className={`${areaClass} font-serif italic border-l-4 border-l-gold bg-cream-50`}
                />
                <input
                  value={block.cite || ''}
                  onChange={(e) => update(index, { ...block, cite: e.target.value })}
                  placeholder="Attribution (e.g. — Dr. Abiodun Mustapha)"
                  className={inputClass}
                />
              </>
            )}

            {block.type === 'image' && (
              <>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    value={block.src || ''}
                    onChange={(e) => update(index, { ...block, src: e.target.value })}
                    placeholder="/images/speaking-white.jpg or Cloudinary URL"
                    className={`${inputClass} flex-1`}
                  />
                  <CloudinaryUpload
                    label="Upload Image"
                    onUploadSuccess={(url) => update(index, { ...block, src: url })}
                  />
                </div>
                <input
                  value={block.alt || ''}
                  onChange={(e) => update(index, { ...block, alt: e.target.value })}
                  placeholder="Describe image for SEO (Alt text)"
                  className={inputClass}
                />
                <input
                  value={block.caption || ''}
                  onChange={(e) => update(index, { ...block, caption: e.target.value })}
                  placeholder="Caption (optional)"
                  className={inputClass}
                />
                {block.src && (
                  <img
                    src={block.src}
                    alt=""
                    className="max-h-48 rounded-lg border border-slate-200 object-cover mt-1"
                  />
                )}
              </>
            )}

            {block.type === 'list' && (
              <div className="flex flex-col gap-2">
                {(block.items || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <input
                      value={item}
                      onChange={(e) => {
                        const items = [...block.items]
                        items[itemIndex] = e.target.value
                        update(index, { ...block, items })
                      }}
                      placeholder={`List item #${itemIndex + 1}`}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        update(index, { ...block, items: block.items.filter((_, i) => i !== itemIndex) })
                      }
                      aria-label="Remove item"
                      className="px-2 text-slate-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => update(index, { ...block, items: [...(block.items || []), ''] })}
                  className="w-fit rounded-md bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer mt-1"
                >
                  + Add List Item
                </button>
              </div>
            )}

            {block.type === 'divider' && (
              <p className="text-[13px] font-medium text-slate-600 italic">Horizontal divider line.</p>
            )}
          </div>
        </div>
      ))}

      {/* Medium-style Add Content Toolbar */}
      <div className="mt-2 rounded-xl border border-slate-300 bg-slate-50 p-4">
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700 mb-3">
          Add Content Block
        </span>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => add(t.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-[12px] font-semibold text-slate-800 hover:border-gold hover:text-gold hover:shadow-xs transition-all cursor-pointer"
              >
                <Icon className="h-4 w-4 text-gold" />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
