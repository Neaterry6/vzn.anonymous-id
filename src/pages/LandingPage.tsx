import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function LandingPage() {
  return (
    <>
      <Header title="Built for bold, anonymous conversations" />
      <main className="container hero">
        <section className="panel hero-panel">
          <p className="badge">Safe • Fun • Anonymous</p>
          <h1>Welcome to VZN Anon</h1>
          <h2>Share your link. Receive anonymous messages.</h2>
          <p>
            VZN Anon lets you collect honest anonymous messages from friends and followers.
            Create your account, customize your anonymous link, and receive private feedback in your inbox.
          </p>
          <div className="cta-row">
            <Link className="button primary" to="/signup">
              <span aria-hidden="true">📝</span> Create an account
            </Link>
            <Link className="button secondary" to="/login">
              <span aria-hidden="true">🔐</span> Sign in
            </Link>
          </div>
        </section>
      </main>
      <footer>
        <p>After login you can use feed, profile, inbox, dashboard stats, and anonymous group chat.</p>
        <p>Creator GitHub: <a href="https://github.com/your-github-username" target="_blank" rel="noreferrer">@your-github-username</a></p>
      </footer>
    </>
  );
}
