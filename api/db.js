import { createClient } from '@libsql/client'

let _client = null

export function getDb() {
  if (_client) return _client

  _client = createClient({
    url: process.env.TURSO_DATABASE_URL || 'file:data.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  })

  return _client
}

// Initialize tables — call once on first request
let _initialized = false

export async function initDb() {
  if (_initialized) return
  const db = getDb()

  await db.batch([
    {
      sql: `CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL
      )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        data TEXT NOT NULL
      )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        data TEXT NOT NULL
      )`,
      args: [],
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )`,
      args: [],
    },
  ])

  // Seed default password if not set
  const existing = await db.execute({
    sql: 'SELECT value FROM settings WHERE key = ?',
    args: ['admin_password'],
  })
  if (existing.rows.length === 0) {
    await db.execute({
      sql: 'INSERT INTO settings (key, value) VALUES (?, ?)',
      args: ['admin_password', 'admin'],
    })
  }

  // Seed default email if not set
  const existingEmail = await db.execute({
    sql: 'SELECT value FROM settings WHERE key = ?',
    args: ['admin_email'],
  })
  if (existingEmail.rows.length === 0) {
    await db.execute({
      sql: 'INSERT INTO settings (key, value) VALUES (?, ?)',
      args: ['admin_email', 'abiodunmustapha11@gmail.com'],
    })
  }

  _initialized = true
}
