import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProducts, useCart } from '../context';
import '../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { getProductById, getDiscountPercentage } = useProducts();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = productId ? getProductById(productId) : null;

  if (!product) {
    return (
      <div className="product-detail">
        <div className="product-container">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      image: product.image,
    });

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      navigate('/cart');
    }, 1000);
  };

  return (
    <div className="product-detail">
      <div className="product-container">
        {/* Product Image */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {getDiscountPercentage(product) > 0 && (
            <div className="discount-badge-large">Save {getDiscountPercentage(product)}%</div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="review-count">(42 reviews)</span>
          </div>

          <div className="product-price">
            <span className="price">₦{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">₦{product.originalPrice.toFixed(2)}</span>
                <span className="savings-text">You save ₦{(product.originalPrice - product.price).toFixed(2)}</span>
              </>
            )}
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-options">
            <div className="size-selector">
              <label>Size:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="">Select Size</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
          </div>

          <div className="product-actions">
            <button 
              className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button className="wishlist-btn">❤️ Save</button>
          </div>

          <div className="product-details-section">
            <h3>Product Details</h3>
            <div className="details-tabs">
              <div className="detail">
                <strong>Material:</strong>
                <span>{product.material}</span>
              </div>
              <div className="detail">
                <strong>Care:</strong>
                <span>{product.care}</span>
              </div>
              <div className="detail">
                <strong>In Stock:</strong>
                <span>{product.inStock ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
