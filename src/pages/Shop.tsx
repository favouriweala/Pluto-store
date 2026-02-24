import { useState } from 'react';
import { useProducts } from '../context';
import '../styles/Shop.css';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { products, getProductsByCategory } = useProducts();

  const displayProducts = selectedCategory === 'all' 
    ? products 
    : getProductsByCategory(selectedCategory);

  return (
    <div className="shop">
      <div className="shop-container">
        {/* Sidebar - Filters */}
        <aside className="shop-sidebar">
          <h3>Filter by Category</h3>
          <div className="filter-options">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All Products
            </button>
            <button 
              className={selectedCategory === 'mens' ? 'active' : ''}
              onClick={() => setSelectedCategory('mens')}
            >
              Men's Wear
            </button>
            <button 
              className={selectedCategory === 'womens' ? 'active' : ''}
              onClick={() => setSelectedCategory('womens')}
            >
              Women's Wear
            </button>
            <button 
              className={selectedCategory === 'kids' ? 'active' : ''}
              onClick={() => setSelectedCategory('kids')}
            >
              Kids' Wear
            </button>
          </div>
        </aside>

        {/* Main Content - Product Grid */}
        <main className="shop-main">
          <h2>Our Collection</h2>
          
        {displayProducts.length === 0 ? (
            <div className="empty-state">
              <p>Products coming soon...</p>
            </div>
          ) : (
            <div className="products-grid">
              {displayProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price">₦{product.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
