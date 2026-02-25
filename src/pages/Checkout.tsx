import { useState } from 'react';
import { useCart } from '../context';
import '../styles/Checkout.css';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { items, getCartSubtotal, getShippingCost, getCartTotal } = useCart();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Shipping Address Validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\d{10,}$/)) newErrors.phone = 'Valid phone number is required (10+ digits)';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    // Payment Validation
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{13,19}$/)) 
        newErrors.cardNumber = 'Valid card number required (13-19 digits)';
      if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) 
        newErrors.expiryDate = 'Format: MM/YY';
      if (!formData.cvv.match(/^\d{3,4}$/)) 
        newErrors.cvv = 'Valid CVV required';
      if (!formData.cardholderName.trim()) 
        newErrors.cardholderName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setOrderComplete(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setOrderComplete(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          streetAddress: '',
          city: '',
          state: '',
          postalCode: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardholderName: '',
        });
      }, 3000);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  if (orderComplete) {
    return (
      <div className="checkout">
        <div className="checkout-container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your purchase. Order confirmation has been sent to {formData.email}</p>
            <p className="order-number">Order Number: #PL{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="delivery-text">Your order will be delivered within 3-5 business days</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          {/* Order Form */}
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <section className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+234 801 234 5678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label>Street Address *</label>
                  <input 
                    type="text" 
                    name="streetAddress"
                    placeholder="123 Main Street"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className={errors.streetAddress ? 'error' : ''}
                  />
                  {errors.streetAddress && <span className="error-text">{errors.streetAddress}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input 
                      type="text" 
                      name="city"
                      placeholder="Lagos"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input 
                      type="text" 
                      name="state"
                      placeholder="Lagos State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? 'error' : ''}
                    />
                    {errors.state && <span className="error-text">{errors.state}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    placeholder="100001"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={errors.postalCode ? 'error' : ''}
                  />
                  {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                </div>
              </section>

              {/* Payment Method */}
              <section className="form-section">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      value="card" 
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>🏪 Debit/Credit Card</span>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      value="bank" 
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>🏦 Direct Bank Transfer</span>
                  </label>
                </div>

                {/* Conditional Payment Forms */}
                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Card Number *</label>
                      <input 
                        type="text" 
                        name="cardNumber"
                        placeholder="4532 1234 5678 9010"
                        value={formatCardNumber(formData.cardNumber)}
                        onChange={(e) => handleInputChange({ ...e, target: { ...e.target, value: e.target.value.replace(/\s/g, '') } })}
                        className={errors.cardNumber ? 'error' : ''}
                        maxLength={19}
                      />
                      {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date *</label>
                        <input 
                          type="text" 
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            handleInputChange({ ...e, target: { ...e.target, value } });
                          }}
                          maxLength={5}
                          className={errors.expiryDate ? 'error' : ''}
                        />
                        {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input 
                          type="text" 
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange({ ...e, target: { ...e.target, value: e.target.value.replace(/\D/g, '') } })}
                          maxLength={4}
                          className={errors.cvv ? 'error' : ''}
                        />
                        {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name *</label>
                      <input 
                        type="text" 
                        name="cardholderName"
                        placeholder="JOHN DOE"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        className={errors.cardholderName ? 'error' : ''}
                      />
                      {errors.cardholderName && <span className="error-text">{errors.cardholderName}</span>}
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bank-transfer">
                    <div className="bank-header">
                      <h3>Bank Transfer Details</h3>
                    </div>
                    <div className="bank-details">
                      <div className="detail-row">
                        <span className="detail-label">Account Name:</span>
                        <span className="detail-value">Pluto Store</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Account Number:</span>
                        <span className="detail-value">1234567890</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Bank Code:</span>
                        <span className="detail-value">999</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Amount:</span>
                        <span className="detail-value amount">₦{getCartTotal().toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="bank-note">Transfer the exact amount to receive order confirmation within 24 hours</p>
                  </div>
                )}
              </section>

              <button type="submit" className="complete-purchase-btn">
                Complete Purchase - ₦{getCartTotal().toFixed(2)}
              </button>
              <p className="security-badge">🔒 Your payment is secure and encrypted</p>
            </form>
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
