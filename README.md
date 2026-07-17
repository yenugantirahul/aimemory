# 🧠 AIMemory

**AIMemory** is a full-stack AI Assistant application equipped with long-term memory. It remembers user facts and semantic history across chat sessions using a hybrid database architecture (Relational, Vector, and Graph).

---

## 🏗️ Architecture & How It Works

AIMemory combines different database models to provide the LLM with comprehensive context:

```
┌────────────────────────────────────────────────────────┐
│                        Next.js                         │
│                        Frontend                        │
└──────────────────────────┬─▲───────────────────────────┘
                           │ │ API requests /
                           ▼ │ session cookies
┌────────────────────────────────────────────────────────┐
│                        Express                         │
│                        Backend                         │
└──────┬───────────────────┬───────────────────┬─────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  PostgreSQL  │    │    Qdrant    │    │    Neo4j     │
│ (Drizzle ORM)│    │ (Vector DB)  │    │  (Graph DB)  │
│              │    │              │    │              │
│  Auth, Users │    │   Semantic   │    │ Entity/Fact  │
│  & Messages  │    │   Memories   │    │Relationships │
└──────┬───────┘    └──────────────┘    └──────────────┘
       │
       ▼ (Asynchronous)
┌──────────────┐
│ Trigger.dev  │
│ (Background  │
│    Tasks)    │
└──────────────┘
```

1. **Relational Data (PostgreSQL + Drizzle ORM):** Stores persistent app data, user profiles, session information (via **better-auth**), and basic chat message history.
2. **Semantic Memory (Qdrant Vector DB):** Stores high-dimensional vector embeddings of user queries. Whenever a user chats, the system performs a semantic search to retrieve past contextually relevant memories.
3. **Graph Relationships (Neo4j Graph DB):** Stores structured entity facts and relationships extracted from conversations (e.g., `User` -> `LIKES` -> `Pizza`).
4. **Background Tasks (Trigger.dev v3):** Background workers process raw prompts asynchronously to update the PostgreSQL message history and extract memories without blocking the user response.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4 & Shadcn UI
- **Networking:** Axios client (with cookie credentials)
- **Markdown Rendering:** React Markdown with GFM support

### Backend
- **Server:** Node.js & Express
- **Authentication:** [better-auth](https://better-auth.com/)
- **ORM:** Drizzle ORM
- **AI Engine:** Google Gemini API
- **Background Tasks:** [Trigger.dev](https://trigger.dev/)

### Infrastructure (Docker)
- **PostgreSQL 17** (Relational Database)
- **Qdrant** (Vector Database)
- **Neo4j 5** (Graph Database)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/)
- [Docker & Docker Compose](https://www.docker.com/)

---

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/yenugantirahul/aimemory.git
cd aimemory

# Install dependencies in both projects (monorepo structure)
cd backend && pnpm install
cd ../frontend && pnpm install
```

---

### Step 2: Start Infrastructure Services

Use Docker Compose from the root directory to spin up PostgreSQL, Qdrant, and Neo4j:

```bash
docker compose up -d
```

Verify that the following ports are open:
- PostgreSQL: `5432`
- Qdrant: `6333`, `6334`
- Neo4j: `7474` (Browser), `7687` (Bolt Protocol)

---

### Step 3: Configure Environment Variables

#### Backend Configuration
Create a `.env` file in the `backend` folder:

```env
PORT=5000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/memorydb
CORS_ORIGIN_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:5000/api/auth
GEMINI_API_KEY=your_gemini_api_key
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password
QDRANT_URL=http://localhost:6333
TRIGGER_SECRET_KEY=your_trigger_secret_key
```

#### Frontend Configuration
Create a `.env` file in the `frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Step 4: Run Database Migrations

Generate and run Drizzle migrations to set up database tables:

```bash
cd backend
pnpm drizzle-kit push
```

---

### Step 5: Start the Development Servers

#### Start the Backend Server:
```bash
cd backend
pnpm dev
```

#### Start the Trigger.dev Dev Environment:
```bash
cd backend
pnpm dlx trigger.dev@latest dev
```

#### Start the Frontend Server:
```bash
cd frontend
pnpm run dev
```

Open `http://localhost:3000` in your browser to interact with the application!
