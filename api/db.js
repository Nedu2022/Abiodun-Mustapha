import Database from 'better-sqlite3'
import { resolve } from 'node:path'

let _db = null

export function getDb() {
  if (_db) return _db

  const dbPath = resolve(process.cwd(), 'data.db')
  _db = new Database(dbPath)
  _db.pragma('journal_mode = WAL')

  // Create tables if they don't exist
  _db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `)

  // Seed default password if not set
  const existing = _db.prepare('SELECT value FROM settings WHERE key = ?').get('admin_password')
  if (!existing) {
    _db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('admin_password', 'admin')
  }

  // Seed default email if not set
  const existingEmail = _db.prepare('SELECT value FROM settings WHERE key = ?').get('admin_email')
  if (!existingEmail) {
    _db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('admin_email', 'abiodunmustapha11@gmail.com')
  }

  return _db
}
