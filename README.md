# 🤖 Gemini Chatbot — Full Stack

A full-stack, streaming AI chatbot built with **React (Vite)** on the frontend and **Node.js + Express** on the backend, powered by **Google's Gemini API**. Features real-time token streaming, markdown/code rendering, and a clean feature-based architecture.

---

## ✨ Features

- ⚡ **Real-time streaming responses** — token-by-token rendering via Server-Sent Events (SSE)
- 🎨 **Markdown & syntax-highlighted code blocks** in chat responses
- 🧱 **Feature-based backend architecture** — scalable, domain-driven structure
- 🛡️ **Request validation & rate limiting** built in
- 🪶 **Lightweight state management** with Zustand
- 🎯 **Shared constants** between client & server to keep contracts in sync
- 💅 **Vanilla CSS** — no framework bloat, full styling control

---

## 📁 Project Structure

```text
gemini-chatbot-fullstack/
│
├── .gitignore
├── README.md
├── package.json                 # Root: workspaces + shared scripts (optional)
│
├── client/                      # Vite + React + Vanilla CSS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css            # Global styles, CSS variables, resets
│       │
│       ├── components/
│       │   ├── chat/
│       │   │   ├── ChatContainer.jsx
│       │   │   ├── ChatContainer.css
│       │   │   ├── MessageList.jsx
│       │   │   ├── MessageList.css
│       │   │   ├── MessageBubble.jsx
│       │   │   ├── MessageBubble.css
│       │   │   ├── StreamingMessage.jsx
│       │   │   ├── StreamingMessage.css
│       │   │   ├── ChatInput.jsx
│       │   │   └── ChatInput.css
│       │   │
│       │   └── ui/
│       │       ├── Button.jsx
│       │       ├── Button.css
│       │       ├── CodeBlock.jsx
│       │       ├── CodeBlock.css
│       │       ├── MarkdownRenderer.jsx
│       │       ├── MarkdownRenderer.css
│       │       ├── Skeleton.jsx
│       │       └── Skeleton.css
│       │
│       ├── hooks/
│       │   ├── useChatStream.js
│       │   ├── useScrollToBottom.js
│       │   └── useAutoResize.js
│       │
│       ├── services/
│       │   ├── api.js           # Axios/fetch instance + interceptors
│       │   └── chatApi.js       # Chat-specific API calls
│       │
│       ├── store/
│       │   └── chatStore.js     # Zustand store (lightweight)
│       │
│       └── utils/
│           ├── constants.js
│           └── formatters.js    # Date formatting, text utils
│
├── server/                      # Node.js + Express
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   │
│   └── src/
│       ├── index.js             # Entry point: Express setup + server start
│       │
│       ├── config/
│       │   ├── gemini.js        # Gemini SDK initialization
│       │   ├── cors.js          # CORS configuration
│       │   └── constants.js     # Port, model names, limits
│       │
│       ├── features/
│       │   └── chat/
│       │       ├── chat.controller.js
│       │       ├── chat.service.js      # Business logic / prompt builder
│       │       ├── chat.routes.js
│       │       └── chat.validation.js   # Request body validation (Zod/Joi)
│       │
│       ├── middleware/
│       │   ├── errorHandler.js
│       │   ├── rateLimiter.js
│       │   └── validateRequest.js
│       │
│       └── utils/
│           ├── logger.js        # Simple structured logger
│           └── helpers.js
│
└── shared/                      # Optional: shared between client & server
    └── constants.js             # Message roles, event names, model configs

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React, Vite, Zustand, Vanilla CSS    |
| Backend    | Node.js, Express                     |
| AI Model   | Google Gemini API                    |
| Validation | Zod / Joi                            |
| Streaming  | Server-Sent Events (SSE)             |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18.x`
- A [Gemini API key](https://ai.google.dev/)

### 1. Clone the repository

```bash
git clone https://github.com/masudibnmusa/gemini-chatbot-fullstack.git
cd gemini-chatbot-fullstack
```

### 2. Install dependencies

```bash
# Root (if using workspaces)
npm install

# Or install separately
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

Create a `.env` file inside `server/` (use `.env.example` as reference):

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

### 4. Run the app

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Key Directories

### Client
- `components/chat/` — Chat UI (message list, bubbles, streaming view, input)
- `components/ui/` — Reusable UI primitives (buttons, markdown renderer, code blocks)
- `hooks/` — Custom hooks (`useChatStream`, `useScrollToBottom`, `useAutoResize`)
- `services/` — API layer for communicating with the backend
- `store/` — Zustand store for chat state

### Server
- `features/chat/` — Chat feature module (controller, service, routes, validation)
- `config/` — Gemini SDK setup, CORS, app constants
- `middleware/` — Error handling, rate limiting, request validation

---

## 🧪 Scripts

| Command         | Description                     |
|-----------------|----------------------------------|
| `npm run dev`   | Start dev server (client/server) |
| `npm run build` | Build client for production      |
| `npm start`     | Start production server          |

---

## 🗺️ Roadmap

- [ ] Conversation history persistence (DB integration)
- [ ] User authentication
- [ ] Multi-model support (swap Gemini for other providers)
- [ ] Chat export (PDF/Markdown)
- [ ] Dark mode

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a PR or issue.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://github.com/pmndrs/zustand)