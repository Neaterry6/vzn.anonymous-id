import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layer, Rect, Stage, Text } from 'react-konva';
import type { Stage as KonvaStage } from 'konva/lib/Stage';
import Brand from '../components/Brand';
import ThemeToggle from '../components/ThemeToggle';

type FeedPost = {
  id: string;
  text: string;
  cardImage: string;
  createdAt: string;
};

const cardColors = ['#8b5cf6', '#0ea5a4', '#ec4899', '#2563eb', '#16a34a'];

export default function FeedPage() {
  const [cardText, setCardText] = useState('Anonymous vibes only ✨');
  const [cardColor, setCardColor] = useState(cardColors[0]);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const stageRef = useRef<KonvaStage | null>(null);

  const cardPreview = useMemo(() => ({
    width: 420,
    height: 240,
  }), []);

  const publishPost = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const dataUrl = stage.toDataURL({ pixelRatio: 2 });
    setPosts((prev) => [
      {
        id: crypto.randomUUID(),
        text: cardText,
        cardImage: dataUrl,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);
  };

  return (
    <>
      <header className="site-header">
        <Brand subtitle="Your personalized anonymous feed" />
        <div className="feed-header-actions">
          <ThemeToggle />
          <details className="dropdown">
            <summary className="dropbtn">⚙️ Profile Menu</summary>
            <div className="dropdown-content">
              <Link to="/profile">👤 Update Profile</Link>
              <Link to="/inbox">📥 Anonymous Inbox</Link>
              <Link to="/dashboard">📊 Weekly Stats Dashboard</Link>
              <Link to="/group-chat">💬 Anonymous Group Chat</Link>
              <Link to="/about">ℹ️ About</Link>
              <Link to="/">🚪 Log out</Link>
            </div>
          </details>
        </div>
      </header>

      <main className="container page-stack">
        <section className="panel">
          <h2>Create Feed Card (Canvas)</h2>
          <p>Design a post card with canvas and publish it into your feed.</p>

          <div className="canvas-tools">
            <label>
              Card text
              <textarea value={cardText} onChange={(event) => setCardText(event.target.value)} rows={2} />
            </label>

            <label>
              Background color
              <select value={cardColor} onChange={(event) => setCardColor(event.target.value)}>
                {cardColors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="canvas-wrap">
            <Stage width={cardPreview.width} height={cardPreview.height} ref={stageRef}>
              <Layer>
                <Rect x={0} y={0} width={cardPreview.width} height={cardPreview.height} fill={cardColor} cornerRadius={18} />
                <Text
                  x={24}
                  y={38}
                  width={cardPreview.width - 48}
                  text={cardText || 'Your text appears here...'}
                  fill="#ffffff"
                  fontSize={28}
                  lineHeight={1.3}
                  fontStyle="bold"
                />
                <Text x={24} y={cardPreview.height - 36} text="VZN ANON" fill="rgba(255,255,255,0.9)" fontSize={16} />
              </Layer>
            </Stage>
          </div>

          <button className="button primary" type="button" onClick={publishPost}>
            <span aria-hidden="true">🖼️</span> Publish Canvas Card
          </button>
        </section>

        <section className="panel">
          <h2>Your Feed Posts</h2>
          {posts.length === 0 ? (
            <p className="muted-note">No posts yet. Create your first canvas card above.</p>
          ) : (
            <div className="feed-posts">
              {posts.map((post) => (
                <article key={post.id} className="feed-post-card">
                  <img src={post.cardImage} alt="Canvas feed card" />
                  <p>{post.text}</p>
                  <small>{post.createdAt}</small>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <h2>How this works</h2>
          <p>Share your anonymous link and start receiving messages from people.</p>
          <p>
            <strong>Your link:</strong> <code>https://vznanon.app/your-custom-name</code>
          </p>
          <div className="cta-row compact-row">
            <Link className="button primary" to="/inbox">
              <span aria-hidden="true">📥</span> Open Inbox
            </Link>
            <Link className="button secondary" to="/group-chat">
              <span aria-hidden="true">💬</span> Join Group Chat
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
