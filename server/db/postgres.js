import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.POSTGRESQL || process.env.DATABASE_URL || process.env.POSTGRES_URL;

export let pool = null;
export let isPostgresConnected = false;

if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
  });

  pool.on('error', (err) => {
    console.error('PostgreSQL pool error:', err.message);
    isPostgresConnected = false;
  });
}

export const initPostgres = async () => {
  if (!pool) {
    console.warn('PostgreSQL connection string (POSTGRESQL or DATABASE_URL) not found in environment.');
    return false;
  }

  try {
    const client = await pool.connect();
    console.log('Connected to Neon PostgreSQL successfully!');
    isPostgresConnected = true;

    // Create Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255),
        full_name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);
    `);

    // Create Research Reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS research_reports (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        symbol VARCHAR(50) NOT NULL,
        company_name VARCHAR(255),
        summary TEXT,
        financial_analysis JSONB,
        news_sentiment JSONB,
        markdown_report TEXT,
        confidence INTEGER,
        recommendation VARCHAR(50),
        current_price JSONB,
        investment_reasoning JSONB,
        audit_trail JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    client.release();
    console.log('PostgreSQL tables (users & research_reports) initialized/verified successfully.');
    return true;
  } catch (err) {
    console.error('Error connecting to/initializing PostgreSQL:', err.message);
    isPostgresConnected = false;
    return false;
  }
};

export const saveUser = async ({ userId, email = '', fullName = '', role = 'user' }) => {
  if (!isPostgresConnected || !pool) return null;
  try {
    const query = `
      INSERT INTO users (user_id, email, full_name, role, last_login)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        last_login = CURRENT_TIMESTAMP, 
        email = CASE WHEN EXCLUDED.email <> '' THEN EXCLUDED.email ELSE users.email END,
        full_name = CASE WHEN EXCLUDED.full_name <> '' THEN EXCLUDED.full_name ELSE users.full_name END,
        role = EXCLUDED.role
      RETURNING *;
    `;
    const res = await pool.query(query, [userId, email, fullName, role]);
    return res.rows[0];
  } catch (err) {
    console.error('PostgreSQL saveUser error:', err.message);
    return null;
  }
};

export const saveReportToPostgres = async (reportData) => {
  if (!isPostgresConnected || !pool) return null;
  try {
    const query = `
      INSERT INTO research_reports (
        id, user_id, symbol, company_name, summary, 
        financial_analysis, news_sentiment, markdown_report, 
        confidence, recommendation, current_price, 
        investment_reasoning, audit_trail, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;
    const values = [
      reportData._id || reportData.id,
      reportData.userId,
      reportData.symbol,
      reportData.companyName || '',
      reportData.summary || '',
      typeof reportData.financialAnalysis === 'string' ? JSON.parse(reportData.financialAnalysis) : (reportData.financialAnalysis || {}),
      typeof reportData.newsSentiment === 'string' ? JSON.parse(reportData.newsSentiment) : (reportData.newsSentiment || {}),
      reportData.markdownReport || '',
      reportData.confidence || 0,
      reportData.recommendation || 'HOLD',
      typeof reportData.currentPrice === 'string' ? JSON.parse(reportData.currentPrice) : (reportData.currentPrice || {}),
      typeof reportData.investmentReasoning === 'string' ? JSON.parse(reportData.investmentReasoning) : (reportData.investmentReasoning || {}),
      reportData.auditTrail || [],
      reportData.createdAt || new Date()
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('PostgreSQL saveReportToPostgres error:', err.message);
    return null;
  }
};

export const getReportsFromPostgres = async (userId) => {
  if (!isPostgresConnected || !pool) return null;
  try {
    const query = `SELECT * FROM research_reports WHERE user_id = $1 ORDER BY created_at DESC;`;
    const res = await pool.query(query, [userId]);
    return res.rows.map(row => ({
      _id: row.id,
      userId: row.user_id,
      symbol: row.symbol,
      companyName: row.company_name,
      summary: row.summary,
      financialAnalysis: row.financial_analysis,
      newsSentiment: row.news_sentiment,
      markdownReport: row.markdown_report,
      confidence: row.confidence,
      recommendation: row.recommendation,
      currentPrice: row.current_price,
      investmentReasoning: row.investment_reasoning,
      auditTrail: row.audit_trail,
      createdAt: row.created_at
    }));
  } catch (err) {
    console.error('PostgreSQL getReportsFromPostgres error:', err.message);
    return null;
  }
};

export const getReportByIdFromPostgres = async (id) => {
  if (!isPostgresConnected || !pool) return null;
  try {
    const query = `SELECT * FROM research_reports WHERE id = $1;`;
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      _id: row.id,
      userId: row.user_id,
      symbol: row.symbol,
      companyName: row.company_name,
      summary: row.summary,
      financialAnalysis: row.financial_analysis,
      newsSentiment: row.news_sentiment,
      markdownReport: row.markdown_report,
      confidence: row.confidence,
      recommendation: row.recommendation,
      currentPrice: row.current_price,
      investmentReasoning: row.investment_reasoning,
      auditTrail: row.audit_trail,
      createdAt: row.created_at
    };
  } catch (err) {
    console.error('PostgreSQL getReportByIdFromPostgres error:', err.message);
    return null;
  }
};
