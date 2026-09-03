import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// In-memory cache for serverless invocation
let memoryPosts = null

function getFilePath() {
  return resolve(process.cwd(), 'src/data/posts.json')
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const filePath = getFilePath()

  if (req.method === 'GET') {
    try {
      if (memoryPosts) {
        return res.status(200).json(memoryPosts)
      }
      if (existsSync(filePath)) {
        const data = JSON.parse(readFileSync(filePath, 'utf8'))
        memoryPosts = data
        return res.status(200).json(data)
      }
      return res.status(200).json([])
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read posts' })
    }
  }

  if (req.method === 'POST') {
    try {
      const posts = req.body
      if (!Array.isArray(posts)) {
        return res.status(400).json({ error: 'Payload must be an array of posts' })
      }

      memoryPosts = posts

      // Try writing to filesystem if available
      try {
        writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8')
      } catch {}

      return res.status(200).json({ success: true, count: posts.length, posts })
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save posts' })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
