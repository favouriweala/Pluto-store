import { Link } from 'react-router-dom';
import { useCart } from '../context';
import '../styles/Cart.css';

export default function Cart() {
  const { items, removeItem, updateQuantity, getCartSubtotal, getShippingCost, getCartTotal } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {items.length === 0 ? (
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
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">₦{item.price.toFixed(2)}</p>
                    <p className="cart-item-size">Size: {item.size}</p>

                    <div className="cart-item-quantity">
                      <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">₦{(item.price * item.quantity).toFixed(2)}</div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <aside className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₦{getCartSubtotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>₦{getShippingCost().toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₦{getCartTotal().toFixed(2)}</span>
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
