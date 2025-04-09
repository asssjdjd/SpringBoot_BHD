import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Category', path: 'category' },
  { label: 'User', path: 'user' },
  { label: 'Theater', path: 'theater' },
  { label: 'Showtime', path: 'showtime' },
  { label: 'FoodCombo', path: 'food-combo' },
  { label: 'Film', path: 'film' },
  { label: 'Home', path : '/admin'}
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <ul className="navbar-nav  d-flex gap-5 flex-row-reverse">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'fw-bold text-primary' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}