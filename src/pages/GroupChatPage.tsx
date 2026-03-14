import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import MessageReactions from '../components/MessageReactions';
import { ChatMessage, ReactionType, ServerPayload, initReactions } from '../types/chat';

const fallbackMessages: ChatMessage[] = [
  {
    id: 'local-1',
    sender: 'Anon-84X',
    text: 'Welcome to the hidden group 👋',
    sentAt: '10:14',
    kind: 'text',
    reactions: initReactions(),
  },
  {
    id: 'local-2',
    sender: 'Anon-Q7B',
    text: 'Drop your mood sticker below 🎉',
    sentAt: '10:15',
    kind: 'text',
    reactions: initReactions(),
  },
  {
    id: 'local-3',
    sender: 'Anon-D11',
    text: 'New GC? Yes 🔥',
    sentAt: '10:16',
    kind: 'text',
    reactions: initReactions(),
  },
];

export default function GroupChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(fallbackMessages);
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [socketConnected, setSocketConnected] = useState(false);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const youAlias = useMemo(() => {
    const existingAlias = localStorage.getItem('vzn-anon-alias');
    if (existingAlias) return existingAlias;

    const newAlias = `Anon-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
    localStorage.setItem('vzn-anon-alias', newAlias);
    return newAlias;
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const wsUrl = isLocal ? `${protocol}://localhost:3002` : `${protocol}://${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => setSocketConnected(true);
    socket.onclose = () => setSocketConnected(false);

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as ServerPayload;

        if (payload.type === 'history') {
          setMessages(payload.messages);
          return;
        }

        if (payload.type === 'message') {
          setMessages((prev) => [...prev, payload.message]);
          return;
        }

        if (payload.type === 'reaction') {
          setMessages((prev) => prev.map((msg) => (msg.id === payload.message.id ? payload.message : msg)));
        }
      } catch {
        // ignore bad payload
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${`${now.getHours()}`.padStart(2, '0')}:${`${now.getMinutes()}`.padStart(2, '0')}`;
  };

  const sendSocketPayload = (payload: unknown) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
      return true;
    }
    return false;
  };

  const publishMessage = (message: ChatMessage) => {
    if (!sendSocketPayload({ type: 'message', message })) {
      setMessages((prev) => [...prev, message]);
    }
  };

  const onSend = (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim() && !imagePreview) return;

    publishMessage({
      id: crypto.randomUUID(),
      sender: youAlias,
      text: text.trim() || '📷 Image',
      image: imagePreview,
      sentAt: getCurrentTime(),
      kind: imagePreview ? 'image' : 'text',
      reactions: initReactions(),
    });

    setText('');
    setImagePreview(undefined);
  };

  const sendVoiceNote = () => {
    const seconds = 4 + Math.floor(Math.random() * 18);
    publishMessage({
      id: crypto.randomUUID(),
      sender: youAlias,
      text: 'Voice note',
      sentAt: getCurrentTime(),
      kind: 'voice',
      voiceSeconds: seconds,
      reactions: initReactions(),
    });
  };

  const reactToMessage = (messageId: string, reaction: ReactionType) => {
    const sent = sendSocketPayload({ type: 'reaction', messageId, reaction, userAlias: youAlias });
    if (sent) return;

    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        const current = msg.reactions.byUser[youAlias];
        const next = { ...msg.reactions, byUser: { ...msg.reactions.byUser } };

        if (current) next[current] = Math.max(0, next[current] - 1);
        if (current === reaction) {
          delete next.byUser[youAlias];
        } else {
          next[reaction] += 1;
          next.byUser[youAlias] = reaction;
        }

        return { ...msg, reactions: next };
      }),
    );
  };

  return (
    <main className="chat-page-wrap">
      <section className="chat-shell">
        <div className="chat-appbar">
          <button className="chat-icon-circle" type="button" aria-label="Back">
            ←
          </button>
          <div className="chat-avatar">👥</div>
          <div className="chat-room-meta">
            <h1>VZN Anon Group</h1>
            <p>{socketConnected ? 'Online now' : 'Reconnecting...'} • IDs hidden</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="pinned-row">
          <span>📌</span>
          <p>@all be respectful and keep it anonymous.</p>
        </div>

        <div className="chat-box whatsapp-chat" ref={chatListRef}>
          {messages.map((msg) => {
            const isMe = msg.sender === youAlias;

            return (
              <article key={msg.id} className={`chat-bubble ${isMe ? 'me' : 'other'}`}>
                <p className="meta">{msg.sender}</p>

                {msg.kind === 'voice' ? (
                  <div className="voice-preview">
                    <span aria-hidden="true">🎙️</span>
                    <div className="voice-bars" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <small>{msg.voiceSeconds}s</small>
                  </div>
                ) : (
                  <p>{msg.text}</p>
                )}

                {msg.image ? <img className="chat-image" src={msg.image} alt="Uploaded by anonymous user" /> : null}

                <div className="bubble-footer">
                  <span className="bubble-time">{msg.sentAt}</span>
                  <MessageReactions
                    currentReaction={msg.reactions.byUser[youAlias]}
                    counts={{ love: msg.reactions.love, like: msg.reactions.like, angry: msg.reactions.angry }}
                    onReact={(reaction) => reactToMessage(msg.id, reaction)}
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="chat-composer">
          <form onSubmit={onSend} className="composer-form">
            <div className="composer-main">
              <label className="icon-btn inline-file-input" aria-label="Upload image">
                <span aria-hidden="true">🖼️</span>
                <input type="file" accept="image/*" onChange={onFileUpload} />
              </label>

              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Message"
                rows={1}
              />

              <button className="icon-btn" type="submit" aria-label="Send message">
                📤
              </button>

              <button className="icon-btn voice-btn mic-round" type="button" onClick={sendVoiceNote} aria-label="Voice note">
                🎙️
              </button>
            </div>
            {imagePreview ? <img className="chat-image" src={imagePreview} alt="Preview before sending" /> : null}
          </form>
        </div>
      </section>
    </main>
  );
}
