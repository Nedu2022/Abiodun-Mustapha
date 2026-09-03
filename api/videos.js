import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

let memoryVideos = null

function getFilePath() {
  return resolve(process.cwd(), 'src/data/videos.json')
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const filePath = getFilePath()

  if (req.method === 'GET') {
    try {
      if (memoryVideos) return res.status(200).json(memoryVideos)
      if (existsSync(filePath)) {
        const data = JSON.parse(readFileSync(filePath, 'utf8'))
        memoryVideos = data
        return res.status(200).json(data)
      }
      return res.status(200).json([])
    } catch {
      return res.status(500).json({ error: 'Failed to read videos' })
    }
  }

  if (req.method === 'POST') {
    try {
      const videos = req.body
      if (!Array.isArray(videos)) {
        return res.status(400).json({ error: 'Payload must be an array of videos' })
      }
      memoryVideos = videos
      try {
        writeFileSync(filePath, JSON.stringify(videos, null, 2), 'utf8')
      } catch {}
      return res.status(200).json({ success: true, videos })
    } catch {
      return res.status(500).json({ error: 'Failed to save videos' })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
