import { useState } from 'react'
import { Plus, Trash2, ArrowUp, ArrowDown, Video, ExternalLink, Save, Check } from 'lucide-react'
import { loadVideos, saveVideos, extractYouTubeId } from '../../lib/videos'

export default function VideoManager({ setToast }) {
  const [videos, setVideos] = useState(loadVideos)
  const [newUrl, setNewUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [dirty, setDirty] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    const id = extractYouTubeId(newUrl)
    if (!id) {
      alert('Please enter a valid YouTube URL or Video ID.')
      return
    }
    if (!newTitle.trim()) {
      alert('Please enter a video title.')
      return
    }

    const updated = [...videos, { id, title: newTitle.trim() }]
    setVideos(updated)
    setNewUrl('')
    setNewTitle('')
    setDirty(true)
  }

  const handleRemove = (index) => {
    if (!window.confirm(`Delete video "${videos[index].title}"?`)) return
    const updated = videos.filter((_, i) => i !== index)
    setVideos(updated)
    setDirty(true)
  }

  const handleMove = (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= videos.length) return
    const updated = [...videos]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setVideos(updated)
    setDirty(true)
  }

  const handleTitleChange = (index, title) => {
    const updated = [...videos]
    updated[index] = { ...updated[index], title }
    setVideos(updated)
    setDirty(true)
  }

  const handleIdChange = (index, raw) => {
    const id = extractYouTubeId(raw)
    const updated = [...videos]
    updated[index] = { ...updated[index], id }
    setVideos(updated)
    setDirty(true)
  }

  const handleSave = () => {
    saveVideos(videos)
    setDirty(false)
    setToast('YouTube videos updated and saved!')
  }

  return (
    <div className="mx-auto max-w-5xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
            In Motion Gallery
          </span>
          <h2 className="font-display text-3xl text-ink flex items-center gap-2 mt-1">
            <Video className="h-7 w-7 text-gold" />
            Manage YouTube Videos
          </h2>
          <p className="mt-1 text-[14px] text-ink-soft">
            Add, reorder, or edit the YouTube videos displayed on the homepage "In Motion" gallery.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-gold-bright disabled:opacity-50 cursor-pointer"
        >
          <Save className="h-4 w-4" />
          {dirty ? 'Save Video Changes' : 'Saved'}
        </button>
      </div>

      {/* Add New Video Box */}
      <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-green" /> Add New YouTube Video
        </h3>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft mb-1">
              YouTube Link or Video ID *
            </label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=9eHFbWvEtLY"
              className="w-full rounded-lg border border-line bg-cream-100 px-4 py-2.5 text-[14px] text-ink outline-none focus:border-green"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft mb-1">
              Video Title *
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Keynote on Purpose & Discipline"
              className="w-full rounded-lg border border-line bg-cream-100 px-4 py-2.5 text-[14px] text-ink outline-none focus:border-green"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-green px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-white hover:bg-green-deep transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
        </form>
      </div>

      {/* Video List */}
      <div className="mt-8 flex flex-col gap-4">
        <h3 className="font-display text-xl text-ink">Active Videos ({videos.length})</h3>

        {videos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line bg-white p-12 text-center text-ink-soft">
            No videos added yet. Use the form above to add your first YouTube video.
          </div>
        ) : (
          videos.map((v, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Video Thumbnail Preview */}
              <div className="relative aspect-video w-full max-w-[180px] flex-none overflow-hidden rounded-lg bg-charcoal">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  className="h-full w-full object-cover"
                />
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 transition-opacity hover:opacity-100 text-white"
                  title="Watch on YouTube"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              {/* Title & Link inputs */}
              <div className="flex flex-1 flex-col gap-2">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft">
                    Title
                  </label>
                  <input
                    type="text"
                    value={v.title}
                    onChange={(e) => handleTitleChange(i, e.target.value)}
                    className="w-full rounded-md border border-line bg-cream-50 px-3 py-1.5 text-[14px] font-medium text-ink outline-none focus:border-green"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft">
                    Video ID / Link
                  </label>
                  <input
                    type="text"
                    value={v.id}
                    onChange={(e) => handleIdChange(i, e.target.value)}
                    className="w-full rounded-md border border-line bg-cream-50 px-3 py-1.5 text-[12px] font-mono text-ink-soft outline-none focus:border-green"
                  />
                </div>
              </div>

              {/* Actions: Move Up / Down / Remove */}
              <div className="flex items-center gap-1 sm:flex-col sm:items-end sm:gap-2">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => handleMove(i, -1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-ink-soft hover:border-gold hover:text-gold disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={i === videos.length - 1}
                    onClick={() => handleMove(i, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-ink-soft hover:border-gold hover:text-gold disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="flex h-8 items-center gap-1 rounded-md border border-red-200 bg-red-50 px-3 text-[12px] font-medium text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
