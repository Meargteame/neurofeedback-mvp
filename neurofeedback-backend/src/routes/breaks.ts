import express, { Request, Response } from 'express';
import db from '../database';

const router = express.Router();

// Rule-based break generation logic
const getSuggestions = (score: number): string[] => {
    if (score < 40) {
        // Low Score (High Fatigue): Need intensive rest
        return [
            "Deep Breathing: Box breathing for 2 minutes",
            "Hydration: Drink 300ml of water immediately",
            "Visual Reset: Look at something 20ft away for 20s"
        ];
    } else if (score < 70) {
        // Medium Score: Maintenance required
        return [
            "Posture Check: Reset spine alignment",
            "Micro-Stretch: 30s neck rotation",
            "Mental Clear: Close eyes for 1 minute"
        ];
    } else {
        // High Score: Keep momentum but verify state
        return [
            "Status Check: Verify energy levels",
            "Task Switch: Clear working memory before next task",
            "Quick Stand: 30s standing break"
        ];
    }
};

// POST /generate_breaks
router.post('/', async (req: Request, res: Response) => {
    const { focus_score } = req.body;

    try {
        const suggestions = getSuggestions(focus_score);
        const suggestionsStr = JSON.stringify(suggestions);

        // Save suggestion event (optional for history)
        await db.execute(
            'INSERT INTO break_suggestions (focus_score, suggestions) VALUES ($1, $2)',
            [focus_score, suggestionsStr]
        );

        res.json({ suggestions });
    } catch (error) {
        console.error('Break generation error:', error);
        res.status(500).json({ error: 'Failed to generate suggestions' });
    }
});

export default router;
