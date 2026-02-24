import { useState } from 'react';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav className="admin-nav">
            <button 
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              📦 Products
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              📋 Orders
            </button>
            <button 
              className={activeTab === 'customers' ? 'active' : ''}
              onClick={() => setActiveTab('customers')}
            >
              👥 Customers
            </button>
            <button 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <section className="admin-section">
              <div className="section-header">
                <h2>Product Management</h2>
                <button className="add-btn">+ Add New Product</button>
              </div>
              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="empty-row">No products yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <section className="admin-section">
              <h2>Order Management</h2>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="empty-row">No orders yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <section className="admin-section">
              <h2>Customer List</h2>
              <div className="customers-table">
                <table>
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Orders</th>
                      <th>Total Spent</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="empty-row">No customers yet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <section className="admin-section">
              <h2>Settings</h2>
              <div className="settings-form">
                <div className="setting-group">
                  <h3>Store Information</h3>
                  <input type="text" placeholder="Store Name" />
                  <input type="email" placeholder="Store Email" />
                  <input type="text" placeholder="Phone Number" />
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
