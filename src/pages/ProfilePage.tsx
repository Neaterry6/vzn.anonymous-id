import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function ProfilePage() {
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/feed');
  };

  return (
    <>
      <Header title="Profile customization" />
      <main className="container panel">
        <h1>Profile Settings</h1>
        <p>Set your public profile details and custom anonymous link.</p>

        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Profile Picture URL
            <input type="url" placeholder="https://example.com/photo.jpg" />
          </label>
          <label>
            Username
            <input type="text" required placeholder="your_username" />
          </label>
          <label>
            Nickname
            <input type="text" placeholder="Your display nickname" />
          </label>
          <label>
            Gender
            <select defaultValue="">
              <option value="" disabled>
                Select gender
              </option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </label>
          <label>
            Custom Anonymous Link
            <div className="input-prefix">
              <span>https://vznanon.app/</span>
              <input type="text" required placeholder="your-custom-name" />
            </div>
          </label>
          <button className="button primary" type="submit">
            <span aria-hidden="true">💾</span> Save Profile
          </button>
          <Link className="button secondary" to="/feed">
            <span aria-hidden="true">↩️</span> Back to Feed
          </Link>
        </form>
      </main>
    </>
  );
}
