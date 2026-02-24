import { useState } from 'react';
import '../styles/Shop.css';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Placeholder for products - will be replaced with real data
  const products = [];

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
          
          {products.length === 0 ? (
            <div className="empty-state">
              <p>Products coming soon...</p>
            </div>
          ) : (
            <div className="products-grid">
              {/* Product cards will be mapped here */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
