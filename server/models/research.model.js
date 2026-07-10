import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const researchReportSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk User ID
  symbol: { type: String, required: true, uppercase: true },
  companyName: { type: String, required: true },
  summary: { type: String, required: true },
  financialAnalysis: { type: String },
  newsSentiment: { type: String },
  markdownReport: { type: String, required: true },
  confidence: { type: Number, default: 0 },
  recommendation: { type: String, default: "HOLD" },
  currentPrice: { type: String }, // JSON string of price data
  investmentReasoning: { type: String }, // JSON string of {why, when, risks}
  auditTrail: [stepSchema],
  createdAt: { type: Date, default: Date.now }
});

const ResearchReport = mongoose.model('ResearchReport', researchReportSchema);

export default ResearchReport;
