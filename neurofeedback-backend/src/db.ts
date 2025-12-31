import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.DB_PATH || 'neurofeedback.db';
const db = new Database(dbPath);

// Initialize Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS focus_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    active_time INTEGER NOT NULL, -- minutes
    idle_time INTEGER NOT NULL, -- minutes
    tab_switches INTEGER NOT NULL,
    typing_events INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS break_suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    focus_score INTEGER NOT NULL,
    suggestions TEXT NOT NULL, -- JSON string
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('Database initialized successfully');

export default db;

