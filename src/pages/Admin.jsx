import { useEffect, useMemo, useState } from 'react'
import { Cloud, Download, Eye, FileUp, Plus, Save, Search, Settings, X, FileText, Video, ArrowLeft, Tag as TagIcon } from 'lucide-react'
import Seo from '../seo/Seo'
import { pages } from '../seo/config'
import { Field, Label, areaClass, inputClass } from '../components/admin/Field'
import BlockEditor from '../components/admin/BlockEditor'
import PostBody from '../components/blog/PostBody'
import CloudinaryUpload from '../components/admin/CloudinaryUpload'
import VideoManager from '../components/admin/VideoManager'
import { TAGS, allPosts, emptyPost, formatDate, readingTime, slugify, loadAllTags, saveAllTags } from '../lib/posts'
import { getCloudinaryConfig, setCloudinaryConfig } from '../lib/cloudinary'

const STORAGE_KEY = 'abiodun.posts.v1'

function load() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    return allPosts
  }
  return allPosts
}

function download(posts) {
  const blob = new Blob([`${JSON.stringify(posts, null, 2)}\n`], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'posts.json'
  a.click()
  URL.revokeObjectURL(url)
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('posts') // 'posts' | 'videos'
  const [posts, setPosts] = useState(load)
  const [activeId, setActiveId] = useState(() => load()[0]?.id || null)
  const [query, setQuery] = useState('')
  const [dirty, setDirty] = useState(false)
  const [preview, setPreview] = useState(false)
  const [toast, setToast] = useState('')
  const [showCloudinarySettings, setShowCloudinarySettings] = useState(false)
  const [cName, setCName] = useState(() => getCloudinaryConfig().cloudName)
  const [cPreset, setCPreset] = useState(() => getCloudinaryConfig().uploadPreset)
  
  // Custom Tag Creation state
  const [allTags, setAllTags] = useState(loadAllTags)
  const [newTagInput, setNewTagInput] = useState('')

  // Mobile View state ('list' | 'edit')
  const [mobileView, setMobileView] = useState('list')

  const active = posts.find((post) => post.id === activeId) || null

  useEffect(() => {
    if (!toast) return undefined
    const id = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(id)
  }, [toast])

  const listed = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return posts
    return posts.filter((post) => post.title.toLowerCase().includes(needle))
  }, [posts, query])

  const patch = (changes) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === activeId
          ? { ...post, ...changes, updatedAt: new Date().toISOString().slice(0, 10) }
          : post
      )
    )
    setDirty(true)
  }

  const save = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    setDirty(false)
    setToast('Saved in this browser')
  }

  const createPost = () => {
    const fresh = emptyPost()
    setPosts((current) => [fresh, ...current])
    setActiveId(fresh.id)
    setMobileView('edit')
    setDirty(true)
  }

  const removePost = () => {
    if (!active) return
    if (!window.confirm(`Delete "${active.title || 'Untitled'}"? This cannot be undone.`)) return
    setPosts((current) => current.filter((post) => post.id !== activeId))
    setActiveId(null)
    setMobileView('list')
    setDirty(true)
  }

  const importFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (!Array.isArray(parsed)) throw new Error('not an array')
        setPosts(parsed)
        setActiveId(parsed[0]?.id || null)
        setDirty(true)
        setToast(`Loaded ${parsed.length} posts`)
      } catch {
        setToast('That file is not a valid posts.json')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const toggleTag = (tag) => {
    if (!active) return
    const tags = active.tags || []
    patch({ tags: tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag] })
  }

  const handleCreateTag = (e) => {
    e.preventDefault()
    const trimmed = newTagInput.trim()
    if (!trimmed) return
    let updatedTags = allTags
    if (!allTags.includes(trimmed)) {
      updatedTags = [...allTags, trimmed]
      setAllTags(updatedTags)
      saveAllTags(updatedTags)
    }
    if (active && !(active.tags || []).includes(trimmed)) {
      const currentTags = active.tags || []
      patch({ tags: [...currentTags, trimmed] })
    }
    setNewTagInput('')
    setToast(`Tag "${trimmed}" added!`)
  }

  return (
    <>
      <Seo {...pages.admin} noindex />

      <div className="min-h-svh bg-cream-200">
        <header className="sticky top-0 z-30 border-b border-charcoal/20 bg-charcoal text-cream">
          <div className="mx-auto flex max-w-[100rem] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center justify-between gap-3 sm:justify-start">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="font-display text-lg italic text-gold">AM</span>
                <span className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.16em] text-cream/70">
                  Admin Panel
                </span>
                {dirty && activeTab === 'posts' && (
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-gold sm:px-2.5 sm:text-[10px]">
                    Unsaved
                  </span>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 border-l border-cream/20 pl-3 sm:pl-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('posts')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] rounded-md transition-colors ${
                    activeTab === 'posts' ? 'bg-gold text-white font-medium' : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline sm:inline">Posts</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('videos')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] rounded-md transition-colors ${
                    activeTab === 'videos' ? 'bg-gold text-white font-medium' : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline sm:inline">Videos</span>
                </button>
              </div>
            </div>

            {activeTab === 'posts' && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setShowCloudinarySettings((v) => !v)}
                  className="inline-flex items-center gap-1.5 border border-gold/40 px-2.5 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-white"
                  title="Configure Cloudinary Image Uploads"
                >
                  <Cloud className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Cloudinary</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreview((v) => !v)}
                  className="inline-flex items-center gap-1.5 border border-cream/25 px-2.5 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-cream/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Eye className="h-3.5 w-3.5" />
                  {preview ? 'Edit' : 'Preview'}
                </button>
                <label className="inline-flex cursor-pointer items-center gap-1.5 border border-cream/25 px-2.5 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-cream/80 transition-colors hover:border-gold hover:text-gold">
                  <FileUp className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Import</span>
                  <input type="file" accept="application/json" onChange={importFile} className="hidden" />
                </label>
                <button
                  type="button"
                  onClick={() => download(posts)}
                  className="inline-flex items-center gap-1.5 border border-cream/25 px-2.5 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-cream/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button
                  type="button"
                  onClick={save}
                  className="inline-flex items-center gap-1.5 bg-gold px-3.5 py-1.5 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-gold-bright"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save
                </button>
              </div>
            )}
          </div>
        </header>

        {showCloudinarySettings && (
          <div className="border-b border-line bg-charcoal text-cream px-5 py-4 sm:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg text-gold flex items-center gap-2">
                  <Cloud className="h-4 w-4" /> Cloudinary Settings
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCloudinarySettings(false)}
                  className="text-cream/60 hover:text-cream"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[13px] text-cream/80 mb-4">
                Enter your Cloudinary <strong>Cloud Name</strong> and an <strong>Unsigned Upload Preset</strong>.
                This allows instant image uploads directly from your browser!
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setCloudinaryConfig(cName.trim(), cPreset.trim())
                  setShowCloudinarySettings(false)
                  setToast('Cloudinary credentials saved!')
                }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70 mb-1">
                    Cloud Name
                  </label>
                  <input
                    value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    placeholder="e.g. my-cloud-name"
                    className="w-full border border-cream/20 bg-charcoal-light px-3 py-2 text-[14px] text-cream outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70 mb-1">
                    Upload Preset (Unsigned)
                  </label>
                  <input
                    value={cPreset}
                    onChange={(e) => setCPreset(e.target.value)}
                    placeholder="e.g. ml_default or my_preset"
                    className="w-full border border-cream/20 bg-charcoal-light px-3 py-2 text-[14px] text-cream outline-none focus:border-gold"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowCloudinarySettings(false)}
                    className="px-4 py-2 text-[12px] text-cream/70 hover:text-cream"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gold px-5 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white hover:bg-gold-bright"
                  >
                    Save Cloudinary Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'videos' ? (
          <VideoManager setToast={setToast} />
        ) : (
          <>
            <div className="border-b border-line bg-gold/10 px-5 py-3 text-[13px] leading-relaxed text-ink-soft sm:px-8">
              <span className="font-medium text-ink">Saving keeps your work in this browser.</span> To put
              it on the live site, click Export and replace <code>src/data/posts.json</code>, then deploy.
              Cloudinary image uploads are active!
            </div>

            <div className="mx-auto grid max-w-[100rem] gap-0 px-0 lg:grid-cols-[320px_1fr]">
              {/* Post List Sidebar: Always visible on desktop, visible on mobile when mobileView === 'list' */}
              <aside className={`${mobileView === 'edit' ? 'hidden lg:block' : 'block'} border-b border-line bg-white lg:min-h-svh lg:border-b-0 lg:border-r`}>
                <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                  <Search className="h-4 w-4 flex-none text-ink-faint" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts"
                    className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink-faint"
                  />
                </div>

                <button
                  type="button"
                  onClick={createPost}
                  className="flex w-full items-center gap-2 border-b border-line px-4 py-3.5 text-left text-[12px] font-medium uppercase tracking-[0.12em] text-green transition-colors hover:bg-cream"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New post
                </button>

                <ul className="flex flex-col">
                  {listed.map((post) => (
                    <li key={post.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveId(post.id)
                          setPreview(false)
                          setMobileView('edit')
                        }}
                        className={`flex w-full flex-col gap-1.5 border-b border-line px-4 py-4 text-left transition-colors ${
                          post.id === activeId ? 'bg-cream' : 'hover:bg-cream/60'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 flex-none rounded-full ${
                              post.status === 'published' ? 'bg-green' : 'bg-gold'
                            }`}
                          />
                          <span className="text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                            {post.status === 'published' ? formatDate(post.publishedAt) : 'Draft'}
                          </span>
                        </span>
                        <span className="font-display text-[15px] leading-snug text-ink">
                          {post.title || 'Untitled'}
                        </span>
                      </button>
                    </li>
                  ))}
                  {listed.length === 0 && (
                    <li className="px-4 py-6 text-[14px] italic text-ink-faint">Nothing matches that.</li>
                  )}
                </ul>
              </aside>

              {/* Main Post Editor: Always visible on desktop, visible on mobile when mobileView === 'edit' */}
              <div className={`${mobileView === 'list' ? 'hidden lg:block' : 'block'} px-4 py-6 sm:px-8 sm:py-8`}>
                {/* Mobile Back Button */}
                <div className="mb-6 flex items-center justify-between border-b border-line pb-4 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileView('list')}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-cream cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Posts
                  </button>
                  {active && (
                    <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-soft truncate max-w-[160px]">
                      {active.title || 'Untitled'}
                    </span>
                  )}
                </div>

                {!active && (
                  <p className="font-display text-xl italic text-ink-soft">
                    Pick a post from the list, or start a new one.
                  </p>
                )}

                {active && preview && (
                  <article className="mx-auto max-w-3xl">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                      {(active.tags || []).join(' · ') || 'Untagged'} · {readingTime(active)} min read
                    </span>
                    <h1 className="mt-4 font-display text-[2.1rem] leading-[1.08] text-ink sm:text-[2.6rem]">
                      {active.title || 'Untitled'}
                    </h1>
                    <p className="mt-4 font-display text-lg italic text-ink-soft">{active.excerpt}</p>
                    {active.cover && (
                      <img
                        src={active.cover}
                        alt={active.coverAlt || ''}
                        className="mt-8 aspect-[16/9] w-full object-cover"
                      />
                    )}
                    <div className="mt-8">
                      <PostBody body={active.body} />
                    </div>
                  </article>
                )}

                {active && !preview && (
                  <div className="mx-auto flex max-w-3xl flex-col gap-6">
                    <Field label="Title" hint={`${active.title.length}/70`}>
                      <input
                        value={active.title}
                        onChange={(e) => {
                          const title = e.target.value
                          const autoSlug = !active.slug || active.slug === slugify(active.title)
                          patch(autoSlug ? { title, slug: slugify(title) } : { title })
                        }}
                        placeholder="What is this piece called?"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="URL" hint={active.status === 'published' ? 'Locked once live' : 'Editable'}>
                      <div className="flex items-center gap-0 border border-line bg-white">
                        <span className="whitespace-nowrap pl-4 text-[14px] text-ink-faint">/blog/</span>
                        <input
                          value={active.slug}
                          onChange={(e) => patch({ slug: slugify(e.target.value) })}
                          className="w-full bg-transparent px-1 py-3 text-[15px] outline-none"
                        />
                      </div>
                    </Field>

                    <Field label="Summary" hint={`${active.excerpt.length}/160`}>
                      <textarea
                        value={active.excerpt}
                        onChange={(e) => patch({ excerpt: e.target.value })}
                        rows={2}
                        placeholder="One sentence. This becomes the search result description."
                        className={areaClass}
                      />
                    </Field>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Cover image">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <input
                            value={active.cover}
                            onChange={(e) => patch({ cover: e.target.value })}
                            placeholder="/images/portrait-desk.jpg or Cloudinary URL"
                            className={`${inputClass} flex-1`}
                          />
                          <CloudinaryUpload
                            label="Upload"
                            onUploadSuccess={(url) => patch({ cover: url })}
                          />
                        </div>
                      </Field>
                      <Field label="Cover description" hint="Required for search">
                        <input
                          value={active.coverAlt}
                          onChange={(e) => patch({ coverAlt: e.target.value })}
                          placeholder="What the photo shows"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    {active.cover && (
                      <img
                        src={active.cover}
                        alt=""
                        className="aspect-[16/9] w-full border border-line object-cover"
                      />
                    )}

                    {/* Dynamic Tags Management Section */}
                    <div className="flex flex-col gap-3">
                      <Label hint="Select or add custom tags">Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => {
                          const on = (active.tags || []).includes(tag)
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                                on
                                  ? 'border-green bg-green text-cream'
                                  : 'border-line text-ink-soft hover:border-green hover:text-green'
                              }`}
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>

                      {/* Tag Creator Input */}
                      <form onSubmit={handleCreateTag} className="flex flex-wrap items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          placeholder="Create custom tag..."
                          className="flex-1 min-w-[180px] rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] text-ink outline-none focus:border-green"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-green px-4 py-2 text-[12px] font-medium uppercase tracking-[0.1em] text-white hover:bg-green-deep transition-colors cursor-pointer"
                        >
                          <Plus className="h-4 w-4" /> Add Tag
                        </button>
                      </form>
                    </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Publish date" hint="A future date schedules it">
                    <input
                      type="date"
                      value={active.publishedAt}
                      onChange={(e) => patch({ publishedAt: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Status">
                    <select
                      value={active.status}
                      onChange={(e) => patch({ status: e.target.value })}
                      className={inputClass}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </Field>
                </div>

                <BlockEditor body={active.body} onChange={(body) => patch({ body })} />

                <details className="border-t border-line pt-4">
                  <summary className="cursor-pointer text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                    Search overrides
                  </summary>
                  <div className="mt-4 flex flex-col gap-6">
                    <Field label="Search title" hint="Falls back to the title">
                      <input
                        value={active.seoTitle}
                        onChange={(e) => patch({ seoTitle: e.target.value })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Search description" hint="Falls back to the summary">
                      <textarea
                        value={active.seoDescription}
                        onChange={(e) => patch({ seoDescription: e.target.value })}
                        rows={2}
                        className={areaClass}
                      />
                    </Field>
                  </div>
                </details>

                <div className="flex items-center justify-between border-t border-line pt-6">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-ink-faint">
                    {readingTime(active)} min read
                  </span>
                  <button
                    type="button"
                    onClick={removePost}
                    className="text-[12px] uppercase tracking-[0.12em] text-red-700 transition-opacity hover:opacity-70"
                  >
                    Delete post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )}

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 bg-charcoal px-5 py-3 text-[13px] text-cream shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </>
  )
}
