# AI Investment Research Agent

> An AI-powered investment research platform built using **React**, **Node.js**, **Express.js**, **PostgreSQL**, **Prisma ORM**, **LangGraph.js**, and **LangChain.js**. The application researches a company, gathers financial and market information, and generates an explainable investment recommendation.

---

# Overview

The AI Investment Research Agent automates the first stage of investment research by collecting financial information, market sentiment, company news, and AI-powered insights before generating an investment recommendation.

The generated report includes:

* Company Overview
* Current Stock Price
* Financial Highlights
* Market Sentiment
* Key Opportunities
* Potential Risks
* Investment Recommendation (BUY / HOLD / SELL)
* Confidence Score
* AI-generated Reasoning
* Sources Used

---

# Features

## Authentication

* User Signup & Login
* JWT Authentication
* Protected Routes

## AI Research

* Company Research
* Financial Analysis
* Live Stock Price
* News Analysis
* AI-generated Investment Recommendation
* Confidence Score

## Dashboard

* Interactive Dashboard
* Research Report History
* Responsive User Interface

## Engineering

* LangGraph Workflow
* Modular Backend Architecture
* Graceful Error Handling
* Production-ready Folder Structure

---

# Tech Stack

## Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios

## Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT Authentication

## AI

* LangChain.js
* LangGraph.js
* Google Gemini

## APIs

* Yahoo Finance
* Tavily Search

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

DATABASE_URL="postgresql://username:password@localhost:5432/investment_agent"

GOOGLE_API_KEY=your_google_gemini_key
TAVILY_API_KEY=your_tavily_key

CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret
```

### client/.env

```env
VITE_API_URL=http://localhost:5000
```

## Generate Prisma Client

```bash
cd server
npx prisma generate
```

## Run Database Migrations

```bash
npx prisma migrate dev
```

## Run Backend

```bash
npm run dev
```

## Run Frontend

```bash
cd ../client
npm run dev
```

Open the application:

```text
http://localhost:5173
```

---

# How It Works

1. User logs in and enters a company ticker or company name.
2. The frontend sends a request to the Express backend.
3. The backend initializes a LangGraph workflow.
4. Yahoo Finance provides real-time financial data.
5. Tavily Search retrieves the latest company news and market sentiment.
6. LangChain structures the collected information.
7. Google Gemini analyzes the data and generates an explainable recommendation.
8. The final report is stored in PostgreSQL using Prisma ORM.
9. The completed report is returned to the frontend dashboard.

---

# Architecture

```text
                        User
                          │
                          ▼
                 React Frontend (Vite)
                          │
                  REST API (Express.js)
                          │
                 JWT Authentication
                          │
                          ▼
              LangGraph Research Workflow
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
 Yahoo Finance      Tavily Search     Gemini AI
 Financial Data      Latest News       Analysis
        └─────────────────┼─────────────────┘
                          │
                    AI Recommendation
                          │
                          ▼
               PostgreSQL Database
                  (Prisma ORM)
                          │
                          ▼
               Research Report History
                          │
                          ▼
                 Interactive Dashboard
```

---

# Key Decisions & Trade-offs

## Why LangGraph?

LangGraph allows complex AI workflows to be broken into reusable nodes with shared state, making the system easier to maintain, debug, and extend as additional research steps are introduced.

## Why Gemini?

Google Gemini provides strong reasoning capabilities with a generous free tier, making it an excellent choice for generating explainable investment recommendations.

## Why PostgreSQL?

PostgreSQL provides ACID compliance, strong data consistency, and excellent performance for storing structured application data such as users, authentication records, and investment research reports. Combined with Prisma ORM, it offers type-safe database access and simplifies schema management.

## Why Prisma ORM?

Prisma improves developer productivity by providing type-safe database queries, automated migrations, and a clean schema definition, reducing boilerplate code and improving maintainability.

## Trade-offs

Given the assignment timeline, I prioritized:

* End-to-end AI research workflow
* Explainable AI recommendations
* Clean and modular architecture
* Responsive user interface
* Secure authentication
* Reliable database persistence

Instead of implementing:

* Portfolio optimization
* SEC filing analysis
* Historical stock trend forecasting
* Multi-agent collaboration
* Real-time portfolio monitoring

---

# Example Runs

## Apple (AAPL)

**Recommendation:** BUY

**Confidence:** 90%

**Reasoning**

* Strong quarterly financial performance
* Positive market sentiment
* Consistent revenue growth
* Healthy cash reserves

---

## Tesla (TSLA)

**Recommendation:** HOLD

**Confidence:** 72%

**Reasoning**

* High valuation compared to peers
* Strong long-term growth potential
* Increased market competition
* Short-term uncertainty

---

# What I Would Improve With More Time

* Portfolio management
* Historical stock trend analysis
* SEC filing analysis
* Multi-agent LangGraph workflow
* Redis caching
* PDF report export
* Docker containerization
* CI/CD pipeline
* Unit and integration testing
* Real-time stock alerts

---

# AI Usage

This project was developed with extensive assistance from an AI coding assistant.

AI was used for:

* Project planning
* Learning LangChain.js
* Learning LangGraph.js
* Prompt engineering
* Workflow design
* Backend implementation
* Debugging
* Error resolution
* Code refactoring
* Documentation

While I had prior experience with React, Node.js, Express.js, and PostgreSQL, LangChain.js and LangGraph.js were new technologies for me. I used AI as a learning companion throughout the development process while independently integrating, testing, debugging, and refining the overall implementation.

---

# LLM Chat Session Transcript

The complete AI-assisted development conversation is included with this submission.

**Included file:**

- [LLM_Development_Transcript.md](./LLM_Development_Transcript.md)



The transcript documents:

* Architecture discussions
* Workflow design
* LangGraph implementation
* Prompt engineering
* Debugging sessions
* Implementation decisions
* AI-assisted software development process

---

# Project Structure

```text
AI-Investment-Research-Agent
│
├── client/
│
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   └── package.json
│
├── README.md
└── LLM_Development_Transcript.md
```

---

# Conclusion

This project demonstrates how modern AI frameworks such as **LangGraph.js** and **LangChain.js** can be integrated with a **React + Express + PostgreSQL** architecture to build an explainable AI-powered investment research platform. The application emphasizes modular design, scalable architecture, secure data management with PostgreSQL and Prisma ORM, transparent AI reasoning, and responsible AI-assisted software development.

GITHUB-LINK : https://github.com/Sunny-Saurya/AuditFlow
LIVE-LINK: https://auditflow-nine.vercel.app/
