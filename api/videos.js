import { getDb, initDb } from './db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  await initDb()
  const db = getDb()

  if (req.method === 'GET') {
    try {
      const result = await db.execute({ sql: 'SELECT data FROM videos WHERE id = 1', args: [] })
      if (result.rows.length > 0) return res.status(200).json(JSON.parse(result.rows[0].data))
      return res.status(200).json([])
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read videos', detail: err.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const videos = req.body
      if (!Array.isArray(videos)) {
        return res.status(400).json({ error: 'Payload must be an array of videos' })
      }
      await db.execute({
        sql: 'INSERT OR REPLACE INTO videos (id, data) VALUES (1, ?)',
        args: [JSON.stringify(videos)],
      })
      return res.status(200).json({ success: true, count: videos.length })
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save videos', detail: err.message })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
