# Current Architecture

## Applications

- Next.js frontend using the App Router
- Express backend written in TypeScript
- PostgreSQL with Drizzle ORM for users, sessions, and messages
- Qdrant for semantic memory search
- Neo4j for user-to-entity relationships
- Google Gemini for responses, embeddings, and relationship extraction
- Trigger.dev for background memory and message processing

## Current authentication

Authentication currently uses Better Auth with email/password credentials and
database-backed sessions. The browser calls the Next.js `/api` path, which is
proxied to Express so session cookies remain first-party.

The planned replacement is a first-party authentication module with short-lived
JWT access tokens and rotating, server-revocable refresh sessions. That change is
outside this stabilization step.

## Request flow

```text
Browser
  -> Next.js /api rewrite
  -> Express
  -> Better Auth or authentication middleware
  -> chat controller
  -> PostgreSQL / Gemini / Qdrant / Neo4j / Trigger.dev
```

## Known technical risks

- Request bodies are not consistently validated at the API boundary.
- Chat persistence is split across multiple independent background jobs.
- External-service calls do not have explicit timeout and retry policies.
- The memory-processing path contains a hard-coded user identifier.
- Error responses and logging are not standardized.
- Readiness checks and graceful resource shutdown are missing.
- Automated tests and continuous integration are missing.

## Baseline verification

```powershell
cd backend
pnpm run build

cd ../frontend
pnpm run lint
pnpm run build
```
