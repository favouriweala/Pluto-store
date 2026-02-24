import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="product-detail">
      <div className="product-container">
        {/* Product Image */}
        <div className="product-image">
          <img src="" alt="Product" />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>Product Name</h1>
          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="review-count">(0 reviews)</span>
          </div>

          <div className="product-price">
            <span className="price">₦0</span>
            <span className="original-price">₦0</span>
          </div>

          <p className="product-description">
            Product description goes here...
          </p>

          <div className="product-options">
            <div className="size-selector">
              <label>Size:</label>
              <select>
                <option>Select Size</option>
              </select>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <input type="number" min="1" defaultValue="1" />
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="wishlist-btn">❤️ Save</button>
          </div>

          <div className="product-details-section">
            <h3>Product Details</h3>
            <div className="details-tabs">
              <div className="detail">
                <strong>Material:</strong> <span>Cotton</span>
              </div>
              <div className="detail">
                <strong>Care:</strong> <span>Machine wash cold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
