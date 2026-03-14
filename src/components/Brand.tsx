import { Link } from 'react-router-dom';
import logo from '../assets/vzn-anon-logo.svg';

type BrandProps = {
  subtitle?: string;
};

export default function Brand({ subtitle = 'Anonymous messages made simple' }: BrandProps) {
  return (
    <Link to="/" className="brand" aria-label="VZN Anon home">
      <img src={logo} alt="VZN Anon logo" className="brand-logo" />
      <span>
        <strong>VZN Anon</strong>
        <small>{subtitle}</small>
      </span>
    </Link>
  );
}
