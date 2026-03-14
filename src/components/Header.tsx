import { Link } from 'react-router-dom';
import Brand from './Brand';

type HeaderProps = {
  title?: string;
};

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/signup', label: 'Sign Up', icon: '📝' },
  { to: '/login', label: 'Log In', icon: '🔐' },
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/group-chat', label: 'Group Chat', icon: '💬' },
];

export default function Header({ title }: HeaderProps) {
  return (
    <header className="site-header">
      <Brand subtitle={title ?? 'Anonymous messages made simple'} />
      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="icon-btn nav-icon-btn" aria-label={item.label}>
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
