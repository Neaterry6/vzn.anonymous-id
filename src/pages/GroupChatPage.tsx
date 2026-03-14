import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import Header from '../components/Header';

type Message = {
  id: number;
  sender: string;
  text: string;
  image?: string;
  sentAt: string;
};

const defaultMessages: Message[] = [
  { id: 1, sender: 'Anon-84X', text: 'Welcome to the hidden group 👋', sentAt: '10:14' },
  { id: 2, sender: 'Anon-Q7B', text: 'Drop your mood sticker below 🎉', sentAt: '10:15' },
  { id: 3, sender: 'Anon-You', text: 'Love this clean chat update ✨', sentAt: '10:16' },
];

const stickers = ['🔥', '🎉', '💯', '✨', '😎', '🥳'];
const emojis = ['😀', '😂', '😍', '🤫', '🤝', '🚀'];

export default function GroupChatPage() {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const youAlias = useMemo(() => 'Anon-You', []);

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const appendText = (value: string) => {
    setText((prev) => `${prev}${value}`);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = `${now.getHours()}`.padStart(2, '0');
    const minutes = `${now.getMinutes()}`.padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const onSend = (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim() && !imagePreview) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: youAlias,
        text: text.trim() || '📷 image only',
        image: imagePreview,
        sentAt: getCurrentTime(),
      },
    ]);
    setText('');
    setImagePreview(undefined);
  };

  return (
    <>
      <Header title="Global anonymous group chat" />
      <main className="container page-stack">
        <section className="panel chat-panel">
          <div className="chat-topbar">
            <div>
              <h1>Anonymous Group Chat</h1>
              <p>Everyone on VZN Anon is auto-joined. IDs stay hidden behind aliases.</p>
            </div>
            <span className="online-pill">🟢 1,298 online</span>
          </div>

          <div className="chat-box whatsapp-chat">
            {messages.map((msg) => {
              const isMe = msg.sender === youAlias;

              return (
                <article key={msg.id} className={`chat-bubble ${isMe ? 'me' : 'other'}`}>
                  <p className="meta">{msg.sender}</p>
                  <p>{msg.text}</p>
                  {msg.image ? <img className="chat-image" src={msg.image} alt="Uploaded by anonymous user" /> : null}
                  <span className="bubble-time">{msg.sentAt}</span>
                </article>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <h2>Send a message</h2>
          <form onSubmit={onSend} className="form-grid">
            <label>
              Message
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Say something anonymously..."
                rows={3}
              />
            </label>

            <div className="chip-row">
              {stickers.map((sticker) => (
                <button key={sticker} type="button" className="icon-btn" onClick={() => appendText(sticker)}>
                  <span aria-hidden="true">🏷️</span>
                  <span>{sticker}</span>
                </button>
              ))}
            </div>

            <div className="chip-row">
              {emojis.map((emoji) => (
                <button key={emoji} type="button" className="icon-btn" onClick={() => appendText(emoji)}>
                  <span aria-hidden="true">😊</span>
                  <span>{emoji}</span>
                </button>
              ))}
            </div>

            <div className="composer-row">
              <label className="inline-file-input">
                <span aria-hidden="true">🖼️</span>
                <span>Image</span>
                <input type="file" accept="image/*" onChange={onFileUpload} />
              </label>

              <button className="icon-btn voice-btn" type="button" aria-label="Record voice note (demo)">
                <span aria-hidden="true">🎙️</span>
                <span>Voice Note</span>
              </button>

              <button className="button primary send-btn" type="submit">
                <span aria-hidden="true">📤</span> Send
              </button>
            </div>

            {imagePreview ? <img className="chat-image" src={imagePreview} alt="Preview before sending" /> : null}
          </form>
        </section>
      </main>
    </>
  );
}
