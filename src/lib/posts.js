import raw from '../data/posts.json'

export const TAGS = ['Purpose', 'Discipline', 'Career', 'Leadership', 'Faith & Work', 'Business']

/* ── Tags (API-backed) ── */

export async function loadAllTagsFromApi() {
  try {
    const res = await fetch('/api/tags')
    if (res.ok) {
      const saved = await res.json()
      if (Array.isArray(saved) && saved.length > 0) {
        return Array.from(new Set([...TAGS, ...saved]))
      }
    }
  } catch {}
  return TAGS
}

export async function saveAllTagsToApi(tags) {
  try {
    await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tags),
    })
  } catch {}
}

// Synchronous fallback for initial render (uses built-in JSON only)
export function loadAllTags() {
  return TAGS
}

export function saveAllTags() {
  // no-op: replaced by saveAllTagsToApi
}

/* ── Blog display metadata ── */

export const blogMeta = {
  eyebrow: 'Writing',
  title: 'Notes on purpose,',
  accent: 'discipline and work',
  intro:
    'Everything I teach, I lived through first. These are the long-form versions, written for the person who is ready to stop existing and start living.',
}

/* ── Text helpers ── */

export function blockText(block) {
  if (block.type === 'list') return (block.items || []).join(' ')
  if (block.type === 'image') return block.caption || ''
  return block.text || ''
}

export function plainText(post) {
  return (post.body || []).map(blockText).filter(Boolean).join(' ')
}

export function readingTime(post) {
  const words = plainText(post).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function isPublished(post) {
  if (post.status !== 'published') return false
  if (!post.publishedAt) return false
  const today = new Date()
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`
  return String(post.publishedAt).slice(0, 10) <= localToday
}

export function sortByDate(list) {
  return [...list].sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  )
}

export const allPosts = sortByDate(raw)

export const publishedPosts = sortByDate(raw.filter(isPublished))

/* ── Live posts (fetched from API/DB) ── */

// Cache for fetched posts so we don't re-fetch on every render
let _cachedLivePosts = null

export async function fetchLivePosts() {
  try {
    const res = await fetch('/api/posts')
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        _cachedLivePosts = sortByDate(data)
        return _cachedLivePosts
      }
    }
  } catch {}
  return sortByDate(raw)
}

// Synchronous getter for already-fetched data (fallback to build-time JSON)
export function getLivePosts() {
  if (_cachedLivePosts) return _cachedLivePosts
  return sortByDate(raw)
}

export function getLivePublishedPosts() {
  return getLivePosts().filter(isPublished)
}

export async function saveLivePosts(posts) {
  _cachedLivePosts = sortByDate(posts)
  try {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posts),
    })
  } catch {}
}

/* ── Post lookup helpers ── */

export function postBySlug(slug) {
  const dynamic = getLivePublishedPosts()
  return dynamic.find((post) => post.slug === slug) || publishedPosts.find((post) => post.slug === slug)
}

export function relatedPosts(post, limit = 2) {
  const tags = new Set(post.tags || [])
  const scored = publishedPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: (candidate.tags || []).filter((tag) => tags.has(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((entry) => entry.post)
}

export function emptyPost() {
  const today = new Date().toISOString().slice(0, 10)
  return {
    id: `p-${Math.random().toString(36).slice(2, 10)}`,
    title: '',
    slug: '',
    excerpt: '',
    cover: '',
    coverAlt: '',
    tags: [],
    status: 'draft',
    publishedAt: today,
    updatedAt: today,
    seoTitle: '',
    seoDescription: '',
    body: [{ type: 'paragraph', text: '' }],
  }
}

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
    .replace(/-+$/, '')
}
