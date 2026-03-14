import { Link } from 'react-router-dom';
import Brand from '../components/Brand';

export default function FeedPage() {
  return (
    <>
      <header className="site-header">
        <Brand subtitle="Your personalized anonymous feed" />
        <details className="dropdown">
          <summary className="dropbtn">⚙️ Profile Menu</summary>
          <div className="dropdown-content">
            <Link to="/profile">👤 Update Profile</Link>
            <Link to="/inbox">📥 Anonymous Inbox</Link>
            <Link to="/dashboard">📊 Weekly Stats Dashboard</Link>
            <Link to="/group-chat">💬 Anonymous Group Chat</Link>
            <Link to="/">🚪 Log out</Link>
          </div>
        </details>
      </header>

      <main className="container page-stack">
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

        <section className="panel">
          <h2>Recent Activity</h2>
          <ul>
            <li>You updated your nickname.</li>
            <li>2 new anonymous messages arrived in your inbox.</li>
            <li>Your profile link was copied 5 times today.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
