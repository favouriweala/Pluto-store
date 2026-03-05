import { Link } from 'react-router-dom';
import { useCart } from '../context';
import '../styles/Navigation.css';

function Navigation() {
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🪐 Pluto Store
        </Link>
        
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/shop" className="navbar-link">Shop</Link>
          </li>
          <li>
            <Link to="/cart" className="navbar-link">
              🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin" className="navbar-link admin-link">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navigation;
