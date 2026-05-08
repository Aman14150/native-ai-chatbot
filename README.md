# Local AI Chat

A fully offline AI chat application — no API keys, no cloud, no data leaving your machine.

**Stack:** FastAPI · Ollama · Llama 3.2 · React 18 · Vite

## Features

- 🔒 100% local — powered by [Ollama](https://ollama.com) + Llama 3.2
- ⚡ Real-time streaming responses
- ⏹ Stop generation mid-response
- 💬 Suggestion chips on empty state
- 📱 Responsive dark UI

## Prerequisites

- [Python 3.10+](https://python.org)
- [Node.js 18+](https://nodejs.org)
- [Ollama](https://ollama.com) with `llama3.2` pulled

```bash
ollama pull llama3.2
```

## Getting Started

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
local-ai-chat/
├── backend/
│   ├── main.py
│   ├── routers/chat.py
│   ├── models/schemas.py
│   └── requirements.txt
└── frontend/
    └── src/
        ├── hooks/useChat.js
        ├── components/
        └── App.jsx
```
