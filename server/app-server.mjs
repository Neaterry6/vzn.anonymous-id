import express from 'express';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ noServer: true });

const initReactions = () => ({ love: 0, like: 0, angry: 0, byUser: {} });
const history = [
  { id: 'seed-1', sender: 'Anon-84X', text: 'Welcome to the hidden group 👋', sentAt: '10:14', kind: 'text', reactions: initReactions() },
  { id: 'seed-2', sender: 'Anon-Q7B', text: 'Drop your mood sticker below 🎉', sentAt: '10:15', kind: 'text', reactions: initReactions() },
];

const broadcast = (payload) => {
  const encoded = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client.readyState === 1) client.send(encoded);
  }
};

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'history', messages: history }));

  socket.on('message', (raw) => {
    try {
      const incoming = JSON.parse(String(raw));

      if (incoming.type === 'message' && incoming.message) {
        const withReactions = { ...incoming.message, reactions: incoming.message.reactions ?? initReactions() };
        history.push(withReactions);
        if (history.length > 250) history.shift();
        broadcast({ type: 'message', message: withReactions });
        return;
      }

      if (incoming.type === 'reaction') {
        const { messageId, reaction, userAlias } = incoming;
        const target = history.find((msg) => msg.id === messageId);
        if (!target) return;

        target.reactions = target.reactions ?? initReactions();
        const prev = target.reactions.byUser[userAlias];
        if (prev) target.reactions[prev] = Math.max(0, target.reactions[prev] - 1);

        if (prev === reaction) {
          delete target.reactions.byUser[userAlias];
        } else {
          target.reactions[reaction] = (target.reactions[reaction] ?? 0) + 1;
          target.reactions.byUser[userAlias] = reaction;
        }

        broadcast({ type: 'reaction', message: target });
      }
    } catch {
      // ignore malformed payload
    }
  });
});

server.on('upgrade', (request, socket, head) => {
  if (request.url !== '/ws') {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use(express.static(distDir));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const port = Number(process.env.PORT || 3000);
server.listen(port, '0.0.0.0', () => {
  console.log(`VZN app listening on http://0.0.0.0:${port}`);
});
