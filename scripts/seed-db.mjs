// Run this once to seed the Turso database with existing posts.json
// Usage: TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... node scripts/seed-db.mjs

import { createClient } from '@libsql/client'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
  console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN env vars.')
  console.error('Usage: TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... node scripts/seed-db.mjs')
  process.exit(1)
}

const db = createClient({ url, authToken })

async function seed() {
  // Create tables
  await db.batch([
    { sql: `CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, data TEXT NOT NULL)`, args: [] },
    { sql: `CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY CHECK (id = 1), data TEXT NOT NULL)`, args: [] },
    { sql: `CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY CHECK (id = 1), data TEXT NOT NULL)`, args: [] },
    { sql: `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`, args: [] },
  ])

  // Seed posts from posts.json
  const postsPath = resolve(process.cwd(), 'src/data/posts.json')
  const posts = JSON.parse(readFileSync(postsPath, 'utf8'))
  await db.execute({
    sql: 'INSERT OR REPLACE INTO posts (id, data) VALUES (?, ?)',
    args: ['all', JSON.stringify(posts)],
  })
  console.log(`✓ Seeded ${posts.length} posts into database`)

  // Seed videos from content.js videos
  try {
    const videosPath = resolve(process.cwd(), 'src/data/videos.json')
    const videos = JSON.parse(readFileSync(videosPath, 'utf8'))
    await db.execute({
      sql: 'INSERT OR REPLACE INTO videos (id, data) VALUES (1, ?)',
      args: [JSON.stringify(videos)],
    })
    console.log(`✓ Seeded ${videos.length} videos into database`)
  } catch {
    console.log('⊘ No videos.json found, skipping video seed')
  }

  // Seed default password
  const existing = await db.execute({ sql: 'SELECT value FROM settings WHERE key = ?', args: ['admin_password'] })
  if (existing.rows.length === 0) {
    await db.execute({ sql: 'INSERT INTO settings (key, value) VALUES (?, ?)', args: ['admin_password', 'admin'] })
    console.log('✓ Seeded default admin password')
  } else {
    console.log('⊘ Admin password already set, skipping')
  }

  // Seed default email
  const existingEmail = await db.execute({ sql: 'SELECT value FROM settings WHERE key = ?', args: ['admin_email'] })
  if (existingEmail.rows.length === 0) {
    await db.execute({ sql: 'INSERT INTO settings (key, value) VALUES (?, ?)', args: ['admin_email', 'abiodunmustapha11@gmail.com'] })
    console.log('✓ Seeded default admin email')
  } else {
    console.log('⊘ Admin email already set, skipping')
  }

  console.log('\n✅ Database seeded successfully!')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
