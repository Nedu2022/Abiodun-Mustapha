import Database from 'better-sqlite3'
import { mkdirSync, readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dbDir = resolve(root, 'db')

if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true })
}

const dbPath = resolve(dbDir, 'database.sqlite')
console.log(`Initializing SQLite database at: ${dbPath}`)

const db = new Database(dbPath)

// Enable WAL mode for high performance
db.pragma('journal_mode = WAL')

// 1. Create posts table
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    publishedAt TEXT,
    updatedAt TEXT,
    excerpt TEXT,
    seoTitle TEXT,
    seoDescription TEXT,
    cover TEXT,
    coverAlt TEXT,
    tags TEXT, -- JSON array of tags
    body TEXT NOT NULL -- JSON array of body blocks
  );
`)

// 2. Create tags table
db.exec(`
  CREATE TABLE IF NOT EXISTS tags (
    name TEXT PRIMARY KEY
  );
`)

// 3. Create videos table
db.exec(`
  CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    position INTEGER DEFAULT 0
  );
`)

// 4. Create admin credentials table
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`)

// Seed Posts from src/data/posts.json
const postsJsonPath = resolve(root, 'src/data/posts.json')
if (existsSync(postsJsonPath)) {
  const posts = JSON.parse(readFileSync(postsJsonPath, 'utf8'))
  const insertPost = db.prepare(`
    INSERT OR REPLACE INTO posts (id, slug, title, status, publishedAt, updatedAt, excerpt, seoTitle, seoDescription, cover, coverAlt, tags, body)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const insertTag = db.prepare(`INSERT OR IGNORE INTO tags (name) VALUES (?)`)

  db.transaction(() => {
    for (const post of posts) {
      insertPost.run(
        post.id,
        post.slug,
        post.title,
        post.status || 'draft',
        post.publishedAt || null,
        post.updatedAt || null,
        post.excerpt || '',
        post.seoTitle || '',
        post.seoDescription || '',
        post.cover || '',
        post.coverAlt || '',
        JSON.stringify(post.tags || []),
        JSON.stringify(post.body || [])
      )

      for (const tag of post.tags || []) {
        insertTag.run(tag)
      }
    }
  })()
  console.log(`Seeded ${posts.length} posts into SQLite posts table.`)
}

// Seed default Admin User
const insertAdmin = db.prepare(`
  INSERT OR REPLACE INTO admin_users (email, password, updated_at)
  VALUES (?, ?, ?)
`)
insertAdmin.run('abiodunmustapha11@gmail.com', 'admin123', new Date().toISOString())
console.log('Seeded default admin user (abiodunmustapha11@gmail.com) into SQLite.')

console.log('✅ SQLite database setup complete!')
