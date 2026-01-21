import db from './database';

export async function initDatabase() {
    console.log('Initializing database tables...');
    
    try {
        // Users Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Focus Sessions Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS focus_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                active_time REAL DEFAULT 0,
                idle_time REAL DEFAULT 0,
                tab_switches INTEGER DEFAULT 0,
                typing_events INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Break Suggestions Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS break_suggestions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                focus_score INTEGER NOT NULL,
                suggestions TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database tables initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}
