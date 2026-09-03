import { gallery } from '../data/content'

export const STORAGE_KEY_VIDEOS = 'abiodun.videos.v1'

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

export function loadVideos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_VIDEOS)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.error('Error loading videos:', err)
  }
  return gallery.videos
}

export function saveVideos(videos) {
  try {
    localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(videos))
    window.dispatchEvent(new Event('storage'))
  } catch (err) {
    console.error('Error saving videos:', err)
  }
}
