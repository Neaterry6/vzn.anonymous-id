import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function LoginPage() {
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/feed');
  };

  return (
    <>
      <Header title="Welcome back to VZN Anon" />
      <main className="container auth-card">
        <h1>Welcome back</h1>
        <p>Sign in to open your feed and anonymous inbox.</p>
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Email
            <input type="email" required placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" required placeholder="••••••" />
          </label>
          <button className="button primary" type="submit">
            <span aria-hidden="true">🚀</span> Log in
          </button>
        </form>
        <p className="switch-link">
          No account yet? <Link to="/signup">Create one here</Link>
        </p>
      </main>
    </>
  );
}
