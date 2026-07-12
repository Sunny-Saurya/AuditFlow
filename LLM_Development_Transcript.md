# LLM_Development_Transcript.md

# AI-Assisted Development Transcript

## Project

**AI Investment Research Agent**

---

## Overview

This document summarizes how AI assisted during the development of the AI Investment Research Agent.

Rather than generating the project end-to-end, AI was used as a development companion for understanding new technologies, validating implementation approaches, debugging issues, and improving code quality.

Since **LangChain.js** and **LangGraph.js** were new technologies for me, I frequently used AI to understand concepts before implementing them in my own project. The final architecture, integrations, testing, and application logic were implemented and refined by me.

---

# Development Timeline

## Phase 1 — Project Planning

### Objective

Design an AI-powered investment research application capable of collecting financial information, analyzing company news, and generating an explainable investment recommendation.

### AI Assistance

* Discussed possible project architectures.
* Compared different backend structures.
* Explored suitable APIs for financial data.
* Evaluated different LLM options.

### Decisions Made

* React for the frontend.
* Express.js for the backend.
* PostgreSQL with Prisma ORM for data persistence.
* LangGraph.js to manage the AI workflow.
* LangChain.js for orchestration.
* Google Gemini for reasoning.
* Yahoo Finance and Tavily Search for external data.

---

## Phase 2 — Learning LangGraph

Since LangGraph was completely new to me, I spent time understanding:

* Graph-based workflows
* Shared application state
* Node execution
* Conditional edges
* Workflow orchestration

AI helped explain these concepts using simple examples before I adapted them to my own application.

After understanding the workflow model, I implemented a research pipeline consisting of multiple nodes that execute sequentially.

---

## Phase 3 — Designing the Research Pipeline

The next step was defining how information should flow through the system.

The workflow eventually became:

1. Receive company name.
2. Retrieve financial information.
3. Search recent news.
4. Combine gathered data.
5. Send structured context to Gemini.
6. Generate an investment recommendation.
7. Store the report in PostgreSQL.
8. Return results to the frontend.

AI was mainly used to discuss different workflow structures before implementation.

---

## Phase 4 — Prompt Engineering

One important challenge was generating recommendations that were not only accurate but also explainable.

Several prompt variations were tested before arriving at the final prompt.

The final prompt instructed the model to generate:

* Company overview
* Financial highlights
* Market sentiment
* Opportunities
* Risks
* BUY / HOLD / SELL recommendation
* Confidence score
* Supporting reasoning

The prompt was refined through multiple iterations based on the quality of the generated reports.

---

## Phase 5 — Database Design

The project required persistent storage for:

* User accounts
* Authentication
* Research reports

Different database options were considered before selecting PostgreSQL.

Prisma ORM was chosen because it provides:

* Type-safe queries
* Schema management
* Database migrations
* Cleaner development workflow

AI was used to clarify Prisma concepts and migration workflows while the database schema was designed and implemented manually.

---

## Phase 6 — Backend Development

The backend was developed using Express.js.

Major components included:

* Authentication APIs
* Research API
* LangGraph workflow
* Database operations
* Error handling

During development, AI helped explain implementation patterns, suggest improvements, and troubleshoot runtime errors.

---

## Phase 7 — Frontend Development

The frontend dashboard was built using React and Tailwind CSS.

Features implemented include:

* Login and signup pages
* Company search
* Research report display
* Recommendation cards
* Confidence score visualization
* Report history

AI was occasionally used to improve UI layout ideas and component organization.

---

## Phase 8 — Debugging

Throughout development, several technical issues were encountered, including:

* LangGraph workflow execution
* API integration errors
* Prisma migration problems
* Environment configuration
* JSON parsing issues
* Response formatting
* Prompt optimization

AI helped identify potential causes, explain error messages, and suggest debugging strategies, while the fixes were implemented and verified manually.

---

## Phase 9 — Documentation

After completing the application, AI assisted in improving project documentation by helping organize:

* README structure
* Feature descriptions
* Architecture overview
* Trade-offs
* Setup instructions

The documentation was reviewed and customized before being included in the repository.

---

# Examples of AI Discussions

During development, AI was primarily used for discussions such as:

* Understanding LangGraph workflows
* Structuring backend architecture
* Designing database schemas
* Improving prompts for Gemini
* Debugging implementation issues
* Explaining Prisma behavior
* Organizing Express routes
* Improving React component structure
* Refining project documentation

These discussions accelerated the learning process but were always followed by implementation, testing, and refinement within the project.

---

# Reflection

This project provided practical experience with AI orchestration frameworks such as LangChain.js and LangGraph.js.

While AI significantly accelerated learning and debugging, the project required integrating multiple technologies—including React, Express.js, PostgreSQL, Prisma ORM, Gemini, Yahoo Finance, and Tavily Search—into a cohesive application. Building, testing, debugging, and refining these integrations was an iterative development process carried out throughout the project.

---

# AI Usage Statement

AI was used responsibly as a software development assistant for:

* Learning unfamiliar technologies
* Exploring implementation approaches
* Debugging issues
* Refining prompts
* Improving documentation

Final implementation decisions, application architecture, integration, testing, debugging, and code refinement were completed by the project author.
