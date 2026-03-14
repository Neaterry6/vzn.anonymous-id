import { Link } from 'react-router-dom';
import Header from '../components/Header';

const messages = [
  { id: 1, time: '2 min ago', text: 'You are actually very inspiring. Keep going!' },
  { id: 2, time: '1 hour ago', text: 'What is your biggest goal this year?' },
  { id: 3, time: 'Yesterday', text: 'I like your vibe. Never change!' },
];

export default function InboxPage() {
  return (
    <>
      <Header title="Anonymous inbox" />
      <main className="container">
        <section className="panel">
          <h1>Anonymous Inbox</h1>
          <p>Messages sent through your custom anonymous link appear here.</p>

          {messages.map((message) => (
            <div key={message.id} className="message-card">
              <p className="meta">Anonymous • {message.time}</p>
              <p>{message.text}</p>
            </div>
          ))}

          <Link className="button primary" to="/feed">
            <span aria-hidden="true">↩️</span> Back to Feed
          </Link>
        </section>
      </main>
    </>
  );
}
