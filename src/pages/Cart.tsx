import { Link } from 'react-router-dom';
import '../styles/Cart.css';

export default function Cart() {
  const cartItems = [];

  return (
    <div className="cart">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              {/* Cart item rows will be mapped here */}
            </div>

            {/* Cart Summary */}
            <aside className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₦0</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>₦0</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₦0</span>
              </div>
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
