import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const researchReportSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  symbol: { type: String, required: true, uppercase: true },
  companyName: { type: String, required: true },
  summary: { type: String, required: true },
  financialAnalysis: { type: String },
  newsSentiment: { type: String },
  markdownReport: { type: String, required: true },
  confidence: { type: Number, default: 0 },
  recommendation: { type: String, default: "HOLD" },
  currentPrice: { type: String }, 
  investmentReasoning: { type: String }, 
  auditTrail: [stepSchema],
  createdAt: { type: Date, default: Date.now }
});

const ResearchReport = mongoose.model('ResearchReport', researchReportSchema);

export default ResearchReport;
