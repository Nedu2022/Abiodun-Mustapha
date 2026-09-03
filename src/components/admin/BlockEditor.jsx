import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { Label, areaClass, inputClass } from './Field'
import CloudinaryUpload from './CloudinaryUpload'

const TYPES = [
  { id: 'paragraph', label: 'Text' },
  { id: 'heading', label: 'Heading' },
  { id: 'image', label: 'Image' },
  { id: 'quote', label: 'Quote' },
  { id: 'list', label: 'List' },
  { id: 'divider', label: 'Divider' },
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
    <div className="flex flex-col gap-4">
      <Label hint={`${body.length} blocks`}>Body</Label>

      {body.map((block, index) => (
        <div key={index} className="border border-line bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
            <select
              value={block.type}
              onChange={(e) => update(index, blankBlock(e.target.value))}
              className="bg-transparent text-[11px] font-medium uppercase tracking-[0.14em] text-green outline-none"
              aria-label="Block type"
            >
              {TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                aria-label="Move block up"
                className="p-1.5 text-ink-faint transition-colors hover:text-ink"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                aria-label="Move block down"
                className="p-1.5 text-ink-faint transition-colors hover:text-ink"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Delete block"
                className="p-1.5 text-ink-faint transition-colors hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-3">
            {(block.type === 'paragraph' || block.type === 'heading') && (
              <textarea
                value={block.text || ''}
                onChange={(e) => update(index, { ...block, text: e.target.value })}
                rows={block.type === 'heading' ? 1 : 5}
                placeholder={block.type === 'heading' ? 'Section heading' : 'Write here'}
                className={areaClass}
              />
            )}

            {block.type === 'quote' && (
              <>
                <textarea
                  value={block.text || ''}
                  onChange={(e) => update(index, { ...block, text: e.target.value })}
                  rows={3}
                  placeholder="The line worth pulling out"
                  className={areaClass}
                />
                <input
                  value={block.cite || ''}
                  onChange={(e) => update(index, { ...block, cite: e.target.value })}
                  placeholder="Attribution (optional)"
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
                  placeholder="Describe the image for search engines and screen readers"
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
                    className="max-h-40 w-full border border-line object-cover"
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
                      placeholder="List item"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        update(index, { ...block, items: block.items.filter((_, i) => i !== itemIndex) })
                      }
                      aria-label="Remove list item"
                      className="px-2 text-ink-faint transition-colors hover:text-red-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => update(index, { ...block, items: [...(block.items || []), ''] })}
                  className="w-fit text-[12px] font-medium uppercase tracking-[0.12em] text-green"
                >
                  Add item
                </button>
              </div>
            )}

            {block.type === 'divider' && (
              <p className="text-[13px] italic text-ink-faint">A horizontal rule.</p>
            )}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => add(t.id)}
            className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-[12px] font-medium uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-green hover:text-green"
          >
            <Plus className="h-3 w-3" />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
