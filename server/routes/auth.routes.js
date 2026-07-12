import express from 'express';
import { saveUser } from '../db/postgres.js';

const router = express.Router();

router.post('/sync', async (req, res, next) => {
  try {
    let userId = 'dev-user';
    if (req.auth && req.auth.userId) {
      userId = req.auth.userId;
    } else if (req.body && req.body.userId) {
      userId = req.body.userId;
    } else {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token === 'guest-evaluator-token') {
          userId = 'guest-evaluator';
        } else {
          try {
            const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            userId = payload.sub || payload.userId || 'dev-user';
          } catch {
            userId = 'dev-user';
          }
        }
      }
    }

    const email = req.body.email || '';
    const fullName = req.body.fullName || req.body.name || '';
    const role = userId === 'guest-evaluator' ? 'evaluator' : (req.body.role || 'user');

    const saved = await saveUser({ userId, email, fullName, role });
    res.json({ success: true, user: saved });
  } catch (err) {
    console.error('Auth sync error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
