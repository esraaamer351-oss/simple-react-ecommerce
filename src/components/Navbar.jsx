import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">
          Nova<span>Store</span>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart" className="cart-link">
            Cart
            <span className="cart-badge">{cartCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;