import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'neurofeedback-secret-key';

// Validation Schemas
const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

// Register
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ error: result.error.issues[0].message });
            return;
        }

        const { email, password } = result.data;

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4();

        const stmt = db.prepare('INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)');
        stmt.run(id, email, hashedPassword);

        const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ token, user: { id, email } });
    } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            console.error('Signup error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ error: result.error.issues[0].message });
            return;
        }

        const { email, password } = result.data;

        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = stmt.get(email) as any;

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
