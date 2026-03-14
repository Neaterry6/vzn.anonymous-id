import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function SignupPage() {
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/feed');
  };

  return (
    <>
      <Header title="Create your VZN Anon account" />
      <main className="container auth-card">
        <h1>Create your account</h1>
        <p>Sign up to get your own anonymous link and inbox.</p>
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Email
            <input type="email" required placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" required minLength={6} placeholder="••••••" />
          </label>
          <label>
            Confirm Password
            <input type="password" required minLength={6} placeholder="••••••" />
          </label>
          <button className="button primary" type="submit">
            <span aria-hidden="true">✅</span> Sign up
          </button>
        </form>
        <p className="switch-link">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </main>
    </>
  );
}
