import { gallery } from '../data/content'

export function extractYouTubeId(input = '') {
  if (!input) return ''
  const trimmed = input.trim()
  
  // Standard full URL: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([^&"'>]+)/)
  if (watchMatch && watchMatch[1]) return watchMatch[1]

  // Short URL: https://youtu.be/VIDEO_ID
  const shortMatch = trimmed.match(/(?:youtu\.be\/)([^?&"'>]+)/)
  if (shortMatch && shortMatch[1]) return shortMatch[1]

  // Embed URL: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = trimmed.match(/(?:youtube\.com\/embed\/)([^?&"'>]+)/)
  if (embedMatch && embedMatch[1]) return embedMatch[1]

  // Raw Video ID (11 chars typically)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed

  return trimmed
}

// Fetch videos from SQLite API
export async function fetchVideos() {
  try {
    const res = await fetch('/api/videos')
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) return data
    }
  } catch {}
  return gallery.videos
}

// Synchronous fallback for initial render
export function loadVideos() {
  return gallery.videos
}

// Save videos to SQLite API
export async function saveVideos(videos) {
  try {
    await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videos),
    })
  } catch (err) {
    console.error('Error saving videos:', err)
  }
}
