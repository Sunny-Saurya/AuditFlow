import express from 'express';
import ResearchReport from '../models/research.model.js';
import { researchAgent } from '../services/agent.js';
import mongoose from 'mongoose';

const router = express.Router();

// Fallback in-memory store when MongoDB is offline
const inMemoryReports = [];

// Dev-safe auth middleware: extracts userId from the Clerk session token
// (set by clerkMiddleware) or falls back to decoding the Bearer JWT payload.
// This avoids requireAuth() which redirects on failure and breaks the API.
const flexibleAuth = () => {
  return (req, res, next) => {
    // First, check if clerkMiddleware already populated req.auth
    if (req.auth && req.auth.userId) {
      return next();
    }

    // Fallback: extract userId from the Bearer token payload
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        req.auth = { userId: payload.sub || payload.userId || 'dev-user' };
      } catch {
        req.auth = { userId: 'dev-user' };
      }
    } else {
      req.auth = { userId: 'dev-user' };
    }
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
    // Invoke the LangGraph agent
    const finalState = await researchAgent.invoke({ 
      symbol: symbol.toUpperCase() 
    });

    const reportData = {
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

    // If MongoDB is connected (readyState === 1), use MongoDB; otherwise, fallback to in-memory store
    if (mongoose.connection.readyState === 1) {
      const report = new ResearchReport({
        userId,
        ...reportData
      });
      await report.save();
      res.status(201).json(report);
    } else {
      console.warn('MongoDB is offline. Saving report to in-memory store.');
      const mockId = new mongoose.Types.ObjectId().toString();
      const inMemoryReport = {
        _id: mockId,
        userId,
        createdAt: new Date(),
        ...reportData
      };
      inMemoryReports.push(inMemoryReport);
      res.status(201).json(inMemoryReport);
    }
  } catch (err) {
    next(err);
  }
});

// Retrieve all research reports for the current Clerk user
router.get('/', flexibleAuth(), async (req, res, next) => {
  const userId = req.auth.userId;

  try {
    if (mongoose.connection.readyState === 1) {
      const reports = await ResearchReport.find({ userId }).sort({ createdAt: -1 });
      res.json(reports);
    } else {
      console.warn('MongoDB is offline. Fetching reports from in-memory store.');
      const reports = inMemoryReports
        .filter(r => r.userId === userId)
        .sort((a, b) => b.createdAt - a.createdAt);
      res.json(reports);
    }
  } catch (err) {
    next(err);
  }
});

// Retrieve a single research report details
router.get('/:id', flexibleAuth(), async (req, res, next) => {
  const { id } = req.params;
  const userId = req.auth.userId;

  try {
    if (mongoose.connection.readyState === 1) {
      const report = await ResearchReport.findById(id);
      
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      if (report.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized to view this report' });
      }

      res.json(report);
    } else {
      console.warn('MongoDB is offline. Fetching report detail from in-memory store.');
      const report = inMemoryReports.find(r => r._id === id);
      
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      if (report.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized to view this report' });
      }

      res.json(report);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
