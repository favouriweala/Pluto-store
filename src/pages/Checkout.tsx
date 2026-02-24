import { useState } from 'react';
import { useCart } from '../context';
import '../styles/Checkout.css';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { items, getCartSubtotal, getShippingCost, getCartTotal } = useCart();

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          {/* Order Form */}
          <div className="checkout-form">
            {/* Shipping Information */}
            <section className="form-section">
              <h2>Shipping Address</h2>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Full Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Street Address" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="City" required />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="State" required />
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Postal Code" required />
                </div>
              </form>
            </section>

            {/* Payment Method */}
            <section className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input 
                    type="radio" 
                    value="card" 
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Debit/Credit Card</span>
                </label>
                <label className="payment-option">
                  <input 
                    type="radio" 
                    value="bank" 
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Direct Bank Transfer</span>
                </label>
              </div>

              {/* Conditional Payment Forms */}
              {paymentMethod === 'card' && (
                <form className="card-form">
                  <div className="form-group">
                    <input type="text" placeholder="Card Number" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="CVV" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Cardholder Name" required />
                  </div>
                </form>
              )}

              {paymentMethod === 'bank' && (
                <div className="bank-transfer">
                  <p><strong>Bank Transfer Details:</strong></p>
                  <p>Account Name: Pluto Store</p>
                  <p>Account Number: 1234567890</p>
                  <p>Bank Code: 999</p>
                  <p className="note">Transfer the exact amount and receive order confirmation within 24 hours</p>
                </div>
              )}
            </section>

            <button className="complete-purchase-btn">Complete Purchase</button>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {items.length === 0 ? (
                <p className="empty-items">No items in cart</p>
              ) : (
                items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="summary-item">
                    <div className="summary-item-name">{item.name} x{item.quantity}</div>
                    <div className="summary-item-price">₦{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>
            <div className="summary-totals">
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
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
