import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Pluto Store</h1>
          <p>Premium Fashion, Delivered</p>
          <button className="cta-button">Start Shopping</button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Pluto?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Premium Quality</h3>
            <p>Curated collections of the finest clothing</p>
          </div>
          <div className="feature-card">
            <h3>Fast Delivery</h3>
            <p>Quick and secure shipping</p>
          </div>
          <div className="feature-card">
            <h3>Easy Returns</h3>
            <p>Hassle-free return policy</p>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>Men's Wear</h3>
          </div>
          <div className="category-card">
            <h3>Women's Wear</h3>
          </div>
          <div className="category-card">
            <h3>Kids' Wear</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
