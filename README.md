
# AI Investment Research Agent

> An AI-powered investment research platform built using the **MERN Stack**, **LangGraph.js**, and **LangChain.js**. The application researches a company, gathers financial and market information, and generates an explainable investment recommendation.

---

# Overview

The AI Investment Research Agent automates the first stage of investment research by collecting financial information, market sentiment, and company news before generating an AI-assisted recommendation.

The generated report includes:

- Company Overview
- Current Stock Price
- Financial Highlights
- Market Sentiment
- Key Opportunities
- Potential Risks
- Investment Recommendation (BUY / HOLD / SELL)
- Confidence Score
- AI-generated Reasoning
- Sources Used

---

# Features

## Authentication
- User Signup & Login
- Protected Routes

## AI Research
- Company Research
- Financial Analysis
- Live Stock Price
- News Analysis
- AI Recommendation
- Confidence Score

## Dashboard
- Interactive Dashboard
- Report History
- Responsive UI

## Engineering
- LangGraph Workflow
- Modular Architecture
- Graceful Error Handling
- Production-ready Folder Structure

---

# Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## AI
- LangChain.js
- LangGraph.js
- Google Gemini

## APIs
- Yahoo Finance
- Tavily Search

---

# How to Run

## Clone Repository

```bash
git clone <repository-url>
cd AI-Investment-Research-Agent
```

## Install Dependencies

```bash
npm install

cd client
npm install

cd ../server
npm install
```

## Configure Environment Variables

### server/.env

```env
PORT=5000
MONGODB_URI=your_mongodb_uri

GOOGLE_API_KEY=your_google_gemini_key
TAVILY_API_KEY=your_tavily_key

CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret
```

### client/.env

```env
VITE_API_URL=http://localhost:5000
```

## Run Backend

```bash
cd server
npm run dev
```

## Run Frontend

```bash
cd client
npm run dev
```

Open:

```
http://localhost:5173
```

---

# How It Works

1. User enters a company name.
2. Backend creates a LangGraph workflow.
3. Financial data is collected.
4. Recent news is collected.
5. AI analyzes the gathered information.
6. Recommendation and confidence score are generated.
7. Report is returned to the frontend.

---

# Architecture

```text
User
  │
React Frontend
  │
Express API
  │
LangGraph Workflow
  ├── Financial Data
  ├── News Search
  └── AI Analysis
  │
PostgreSQL
  │
Frontend Report
```

---

# Key Decisions & Trade-offs

## Why LangGraph?

LangGraph allows the application to break complex AI workflows into reusable nodes with shared state. This makes the system easier to maintain, debug, and extend.

## Why Gemini?

Gemini offers a generous free tier and strong reasoning performance, making it suitable for this assignment.

## Why MongoDB?

MongoDB stores semi-structured AI-generated reports efficiently without requiring a rigid relational schema.

## Trade-offs

Given the assignment timeline, I prioritized:

- End-to-end AI workflow
- Explainable recommendations
- Clean architecture
- Responsive UI

Instead of:

- Portfolio optimization
- SEC filing analysis
- Advanced forecasting
- Multi-agent collaboration

---

# Example Runs

## Apple

Recommendation: **BUY**

Confidence: **90%**

Reason:
- Strong financial performance
- Positive market sentiment
- Consistent profitability

---

## Tesla

Recommendation: **HOLD**

Confidence: **72%**

Reason:
- High valuation
- Growth opportunities
- Competitive market


# What I Would Improve With More Time

- Portfolio management
- Historical trend analysis
- SEC filing analysis
- Multi-agent workflow
- Redis caching
- Report export (PDF)
- Docker deployment
- CI/CD pipeline
- Automated testing

---

# AI Usage

This project was developed with extensive assistance from an AI coding assistant.

AI was used for:

- Project planning
- Learning LangChain.js
- Learning LangGraph.js
- Prompt engineering
- Backend implementation
- Debugging
- Error resolution
- Code refactoring
- Documentation

While I had prior experience with the MERN stack, LangChain.js and LangGraph.js were new to me. I used AI as a learning companion throughout the development process and independently integrated, tested, debugged, and refined the implementation.

---

# LLM Chat Session Transcript

The complete AI development conversation is included with this submission.

Included file:

```
LLM_Development_Transcript.md
```

This transcript documents the architectural discussions, implementation decisions, debugging process, and AI-assisted development workflow.

---

# Project Structure

```text
client/
server/
README.md
LLM_Development_Transcript.md
```

---

# Conclusion

This project demonstrates how modern AI frameworks such as LangGraph.js and LangChain.js can be integrated with the MERN stack to build an explainable AI-powered investment research application. The focus was on clean architecture, modular design, transparency, and responsible AI-assisted software development.
