import { getDb, initDb } from './db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  await initDb()
  const db = getDb()
  const { action } = req.query || {}

  // POST /api/auth?action=login
  if (req.method === 'POST' && action === 'login') {
    try {
      const { email, password } = req.body
      const savedEmail = await db.execute({ sql: 'SELECT value FROM settings WHERE key = ?', args: ['admin_email'] })
      const savedPass = await db.execute({ sql: 'SELECT value FROM settings WHERE key = ?', args: ['admin_password'] })

      const dbEmail = savedEmail.rows[0]?.value || 'abiodunmustapha11@gmail.com'
      const dbPass = savedPass.rows[0]?.value || 'admin'

      if (email === dbEmail && password === dbPass) {
        return res.status(200).json({ success: true })
      }
      return res.status(401).json({ error: 'Invalid credentials' })
    } catch (err) {
      return res.status(500).json({ error: 'Login failed', detail: err.message })
    }
  }

  // POST /api/auth?action=change-password
  if (req.method === 'POST' && action === 'change-password') {
    try {
      const { currentPassword, newPassword } = req.body
      const savedPass = await db.execute({ sql: 'SELECT value FROM settings WHERE key = ?', args: ['admin_password'] })
      const dbPass = savedPass.rows[0]?.value || 'admin'

      if (currentPassword !== dbPass) {
        return res.status(401).json({ error: 'Current password is incorrect.' })
      }
      if (!newPassword || newPassword.length < 4) {
        return res.status(400).json({ error: 'New password must be at least 4 characters.' })
      }

      await db.execute({
        sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
        args: ['admin_password', newPassword],
      })
      return res.status(200).json({ success: true })
    } catch (err) {
      return res.status(500).json({ error: 'Password change failed', detail: err.message })
    }
  }

  // GET /api/auth — health check
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
