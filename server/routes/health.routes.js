import express from 'express';

const router = express.Router();

// GET /api/health
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running'
  });
});

export default router;
