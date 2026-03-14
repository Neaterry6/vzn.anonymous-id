import Header from '../components/Header';

export default function AboutPage() {
  return (
    <>
      <Header title="About VZN Anon" />
      <main className="container page-stack">
        <section className="panel">
          <h1>About this project</h1>
          <p>
            VZN Anon is a social prototype focused on anonymous conversations, feedback, and real-time group chat.
            The app is built with React + TypeScript + Vite and uses a lightweight WebSocket server for live group chat updates.
          </p>
        </section>

        <section className="panel">
          <h2>Creator</h2>
          <p>
            Creator GitHub: <a href="https://github.com/your-github-username" target="_blank" rel="noreferrer">@your-github-username</a>
          </p>
          <p className="muted-note">Replace this GitHub link with your exact profile URL if you want your live handle shown.</p>
        </section>
      </main>
    </>
  );
}
