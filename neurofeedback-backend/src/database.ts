import Database from 'better-sqlite3';
import { Pool } from 'pg';

export interface DatabaseAdapter {
    query(sql: string, params?: any[]): Promise<any[]>;
    execute(sql: string, params?: any[]): Promise<{ id?: number | string }>;
    get(sql: string, params?: any[]): Promise<any>;
    close(): Promise<void>;
}

class SQLiteAdapter implements DatabaseAdapter {
    private db: Database.Database;

    constructor(dbPath: string) {
        this.db = new Database(dbPath);
        // Enable WAL mode for better concurrency
        this.db.pragma('journal_mode = WAL');
    }

    private normalizeSql(sql: string): string {
        // Convert $1, $2, etc to ?
        return sql.replace(/\$\d+/g, '?');
    }

    async query(sql: string, params: any[] = []): Promise<any[]> {
        const stmt = this.db.prepare(this.normalizeSql(sql));
        return stmt.all(...params);
    }

    async execute(sql: string, params: any[] = []): Promise<{ id?: number | string }> {
        const normalizedSql = this.normalizeSql(sql);
        const stmt = this.db.prepare(normalizedSql);
        
        // If the query returns data (like RETURNING id), use get()
        if (normalizedSql.trim().toUpperCase().includes('RETURNING')) {
            const result = stmt.get(...params) as any;
            return { id: result?.id };
        } else {
            const info = stmt.run(...params);
            return { id: info.lastInsertRowid };
        }
    }

    async get(sql: string, params: any[] = []): Promise<any> {
        const stmt = this.db.prepare(this.normalizeSql(sql));
        return stmt.get(...params);
    }

    async close(): Promise<void> {
        this.db.close();
    }
}

class PostgresAdapter implements DatabaseAdapter {
    private pool: Pool;

    constructor(connectionString: string) {
        this.pool = new Pool({
            connectionString,
            ssl: {
                rejectUnauthorized: false // Required for Render
            }
        });
    }

    async query(sql: string, params: any[] = []): Promise<any[]> {
        const res = await this.pool.query(sql, params);
        return res.rows;
    }

    async execute(sql: string, params: any[] = []): Promise<{ id?: number | string }> {
        // Postgres doesn't return lastInsertId automatically like SQLite
        // We need to append RETURNING id if it's an INSERT
        // But that changes the query structure. 
        // For MVP, we will assume the caller handles RETURNING if they need the ID,
        // OR we can try to detect INSERTs.
        
        // However, the existing code expects `result.lastInsertRowid`.
        // In Postgres, we usually do `INSERT ... RETURNING id`.
        
        const res = await this.pool.query(sql, params);
        if (res.rows.length > 0 && res.rows[0].id) {
             return { id: res.rows[0].id };
        }
        return {};
    }

    async get(sql: string, params: any[] = []): Promise<any> {
        const res = await this.pool.query(sql, params);
        return res.rows[0];
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}

// Factory
const isPostgres = !!process.env.DATABASE_URL;
const db: DatabaseAdapter = isPostgres 
    ? new PostgresAdapter(process.env.DATABASE_URL!)
    : new SQLiteAdapter(process.env.DB_PATH || 'neurofeedback.db');

// Initialize Schema
const initSchema = async () => {
    console.log(`Initializing database (${isPostgres ? 'Postgres' : 'SQLite'})...`);
    
    if (isPostgres) {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS focus_sessions (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL,
                active_time INTEGER NOT NULL,
                idle_time INTEGER NOT NULL,
                tab_switches INTEGER NOT NULL,
                typing_events INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS break_suggestions (
                id SERIAL PRIMARY KEY,
                focus_score INTEGER NOT NULL,
                suggestions TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    } else {
        // SQLite Schema
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS focus_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                active_time INTEGER NOT NULL,
                idle_time INTEGER NOT NULL,
                tab_switches INTEGER NOT NULL,
                typing_events INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS break_suggestions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                focus_score INTEGER NOT NULL,
                suggestions TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }
    console.log('Database initialized successfully');
};

// Run init
initSchema().catch(console.error);

export default db;
