import React, { useState, useEffect } from 'react';
import { Package, Users, ShoppingCart, TrendingUp, Menu, X, Plus, Edit, Trash2, Eye } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });

  const mockProducts = [
    { id: 1, name: 'Radiance Vitamin C Serum', price: 89.99, stock: 45, category: 'Serums', status: 'active' },
    { id: 2, name: 'Hydra-Boost Moisturizer', price: 64.99, stock: 78, category: 'Moisturizers', status: 'active' },
    { id: 3, name: 'Gentle Foaming Cleanser', price: 44.99, stock: 12, category: 'Cleansers', status: 'active' },
    { id: 4, name: 'Retinol Night Cream', price: 94.99, stock: 3, category: 'Moisturizers', status: 'low-stock' },
  ];

  const mockOrders = [
    { id: 'LUM-20240316-0001', customer: 'Sarah Johnson', total: 134.99, status: 'delivered', date: '2024-03-15' },
    { id: 'LUM-20240316-0002', customer: 'Emily Chen', total: 89.99, status: 'shipped', date: '2024-03-16' },
    { id: 'LUM-20240316-0003', customer: 'Michael Davis', total: 234.97, status: 'processing', date: '2024-03-16' },
  ];

  const mockUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', joined: '2024-01-15', orders: 3 },
    { id: 2, name: 'Emily Chen', email: 'emily@example.com', joined: '2024-02-20', orders: 1 },
    { id: 3, name: 'Michael Davis', email: 'michael@example.com', joined: '2024-03-01', orders: 5 },
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setOrders(mockOrders);
    setUsers(mockUsers);
    setStats({
      totalRevenue: 459.95,
      totalOrders: 156,
      totalProducts: 24,
      totalUsers: 892
    });
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
  ];

  const renderDashboard = () => (
    <div className="dashboard-grid">
      <div className="stat-card">
        <div className="stat-icon revenue">
          <TrendingUp size={24} />
        </div>
        <div className="stat-content">
          <h3>${stats.totalRevenue.toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon orders">
          <ShoppingCart size={24} />
        </div>
        <div className="stat-content">
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon products">
          <Package size={24} />
        </div>
        <div className="stat-content">
          <h3>{stats.totalProducts}</h3>
          <p>Products</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon users">
          <Users size={24} />
        </div>
        <div className="stat-content">
          <h3>{stats.totalUsers}</h3>
          <p>Users</p>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Products</h2>
        <button className="btn btn-primary">
          <Plus size={16} />
          Add Product
        </button>
      </div>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td className={product.stock < 10 ? 'low-stock' : ''}>
                  {product.stock}
                </td>
                <td>
                  <span className={`status-badge ${product.status}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Orders</h2>
      </div>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Users</h2>
      </div>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.joined}</td>
                <td>{user.orders}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'users':
        return renderUsers();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-dashboard">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>LUMINA Admin</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h1>{menuItems.find(item => item.id === activeSection)?.label}</h1>
          <div className="header-actions">
            <button className="btn btn-secondary">Export</button>
          </div>
        </div>
        <div className="content-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
