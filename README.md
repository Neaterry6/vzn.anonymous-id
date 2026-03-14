# VZN Anon (React + TypeScript + Node.js runtime)

VZN Anon is a multi-page anonymous social prototype built with **React + TypeScript + Vite** and a lightweight **WebSocket chat server**.

## Run locally

```bash
npm install
npm run dev
```

This starts:
- Vite frontend (`http://localhost:5173`)
- WebSocket group chat server (`ws://localhost:3002`)

## Pages included

- `/` landing page
- `/signup` sign up page
- `/login` login page
- `/feed` post-login feed page + canvas card post creator
- `/profile` profile settings page
- `/inbox` anonymous inbox page
- `/dashboard` weekly user stats dashboard
- `/group-chat` global anonymous group chat
- `/about` about + creator section

## Key features

- Responsive mobile + desktop UI across all pages
- Light and dark theme toggle (saved in local storage)
- Real-time group chat powered by WebSockets
- Message types: text, image upload preview, voice-note stub bubble
- Per-message reactions: Love, Like, Angry (live updates)
- Feed canvas card editor using `react-konva` + `konva`
- Anonymous aliases for chat users

## Creator

- GitHub: `https://github.com/your-github-username`
