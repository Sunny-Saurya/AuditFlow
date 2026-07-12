import express from 'express';
import ResearchReport from '../models/research.model.js';
import { researchAgent } from '../services/agent.js';
import mongoose from 'mongoose';
import { saveUser, saveReportToPostgres, getReportsFromPostgres, getReportByIdFromPostgres, isPostgresConnected } from '../db/postgres.js';

const router = express.Router();

// Fallback in-memory store when databases are offline
const inMemoryReports = [];

// Dev-safe auth middleware: extracts userId from the Clerk session token
// or falls back to decoding Bearer JWT or guest evaluator token.
const flexibleAuth = () => {
  return async (req, res, next) => {
    let userId = 'dev-user';
    if (req.auth && req.auth.userId) {
      userId = req.auth.userId;
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
    req.auth = { userId };

    // Automatically save/track this user in PostgreSQL Neon DB
    await saveUser({ userId, role: userId === 'guest-evaluator' ? 'evaluator' : 'user' });
    next();
  };
};

// Trigger a new LangGraph research task
router.post('/', flexibleAuth(), async (req, res, next) => {
  const { symbol } = req.body;
  const userId = req.auth.userId;

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  try {
    const finalState = await researchAgent.invoke({ 
      symbol: symbol.toUpperCase() 
    });

    const reportId = new mongoose.Types.ObjectId().toString();
    const reportData = {
      _id: reportId,
      symbol: finalState.symbol,
      companyName: finalState.companyName,
      summary: finalState.summary,
      financialAnalysis: JSON.stringify(finalState.financials),
      newsSentiment: JSON.stringify(finalState.news),
      markdownReport: finalState.report,
      confidence: finalState.confidence,
      recommendation: finalState.recommendation,
      currentPrice: JSON.stringify(finalState.currentPrice),
      investmentReasoning: JSON.stringify(finalState.investmentReasoning),
      auditTrail: finalState.auditTrail
    };

    // 1. Save to PostgreSQL (Primary relational store for user auditability & reporting)
    const pgReport = await saveReportToPostgres({ ...reportData, userId });

    // 2. Save to MongoDB if online
    if (mongoose.connection.readyState === 1) {
      try {
        const report = new ResearchReport({
          _id: reportId,
          userId,
          ...reportData
        });
        await report.save();
      } catch (mongoErr) {
        console.warn('MongoDB save error (PostgreSQL already saved):', mongoErr.message);
      }
    } else {
      inMemoryReports.push({ ...reportData, userId, createdAt: new Date() });
    }

    if (pgReport) {
      return res.status(201).json({
        _id: pgReport.id,
        userId: pgReport.user_id,
        ...reportData
      });
    }

    res.status(201).json({ _id: reportId, userId, ...reportData });
  } catch (err) {
    next(err);
  }
});

// Retrieve all research reports for the current user
router.get('/', flexibleAuth(), async (req, res, next) => {
  const userId = req.auth.userId;

  try {
    // Try PostgreSQL first
    if (isPostgresConnected) {
      const pgReports = await getReportsFromPostgres(userId);
      if (pgReports !== null) {
        return res.json(pgReports);
      }
    }

    // Fallback to MongoDB
    if (mongoose.connection.readyState === 1) {
      const reports = await ResearchReport.find({ userId }).sort({ createdAt: -1 });
      return res.json(reports);
    }

    // Fallback to in-memory
    const reports = inMemoryReports
      .filter(r => r.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
    res.json(reports);
  } catch (err) {
    next(err);
  }
});

// Retrieve a single research report details
router.get('/:id', flexibleAuth(), async (req, res, next) => {
  const { id } = req.params;
  const userId = req.auth.userId;

  try {
    // Try PostgreSQL first
    if (isPostgresConnected) {
      const pgReport = await getReportByIdFromPostgres(id);
      if (pgReport !== null) {
        if (pgReport.userId !== userId) {
          return res.status(403).json({ error: 'Unauthorized to view this report' });
        }
        return res.json(pgReport);
      }
    }

    // Fallback to MongoDB
    if (mongoose.connection.readyState === 1) {
      const report = await ResearchReport.findById(id);
      if (!report) return res.status(404).json({ error: 'Report not found' });
      if (report.userId !== userId) return res.status(403).json({ error: 'Unauthorized to view this report' });
      return res.json(report);
    }

    // Fallback to in-memory
    const report = inMemoryReports.find(r => r._id === id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    if (report.userId !== userId) return res.status(403).json({ error: 'Unauthorized to view this report' });
    res.json(report);
  } catch (err) {
    next(err);
  }
});

export default router;
