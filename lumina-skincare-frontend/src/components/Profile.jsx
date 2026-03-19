import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, CreditCard, LogOut, Edit, Camera } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  });

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('lumina-current-user');
    if (currentUser) {
      try {
        const user = JSON.parse(currentUser);
        setUserData({
          name: user.name || 'User',
          email: user.email || 'user@example.com',
          phone: '+1 (555) 123-4567',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('lumina-current-user');
        window.location.href = '/auth';
      }
    } else {
      // Redirect to auth page if not logged in
      window.location.href = '/auth';
    }
  }, []);

  const [orders] = useState([
    {
      id: 'LUM-20240316-0001',
      date: '2024-03-15',
      total: 134.99,
      status: 'delivered',
      items: [
        { name: 'Radiance Vitamin C Serum', quantity: 1, price: 89.99 },
        { name: 'Gentle Foaming Cleanser', quantity: 1, price: 44.99 }
      ]
    },
    {
      id: 'LUM-20240310-0002',
      date: '2024-03-10',
      total: 64.99,
      status: 'shipped',
      items: [
        { name: 'Hydra-Boost Moisturizer', quantity: 1, price: 64.99 }
      ]
    }
  ]);

  const [addresses] = useState([
    {
      id: 1,
      type: 'home',
      street: '123 Beauty Lane',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      street: '456 Skincare Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US',
      isDefault: false
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'orders', label: 'Orders', icon: <Package size={20} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard size={20} /> }
  ];

  const renderProfile = () => (
    <div className="profile-section">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar">
            <img src={userData.avatar} alt="Profile" />
            <button className="avatar-edit">
              <Camera size={16} />
            </button>
          </div>
        </div>
        <div className="profile-info">
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
          <button className="btn btn-secondary">
            <Edit size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-group">
          <label>Full Name</label>
          <input type="text" value={userData.name} readOnly />
        </div>
        <div className="detail-group">
          <label>Email Address</label>
          <input type="email" value={userData.email} readOnly />
        </div>
        <div className="detail-group">
          <label>Phone Number</label>
          <input type="tel" value={userData.phone} readOnly />
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-section">
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <div className="empty-state">
          <Package size={48} />
          <h4>No orders yet</h4>
          <p>Start shopping to see your order history here</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h4>Order #{order.id}</h4>
                  <p className="order-date">{order.date}</p>
                </div>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: ${order.total}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="addresses-section">
      <div className="section-header">
        <h3>Shipping Addresses</h3>
        <button className="btn btn-primary">Add Address</button>
      </div>
      <div className="addresses-list">
        {addresses.map(address => (
          <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
            <div className="address-header">
              <h4>{address.type.charAt(0).toUpperCase() + address.type.slice(1)}</h4>
              {address.isDefault && <span className="default-badge">Default</span>}
            </div>
            <div className="address-details">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
            </div>
            <div className="address-actions">
              <button className="btn btn-secondary">Edit</button>
              <button className="btn btn-danger">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="payment-section">
      <h3>Payment Methods</h3>
      <div className="payment-methods">
        <div className="payment-card">
          <div className="payment-info">
            <div className="card-type">Visa</div>
            <div className="card-number">•••• •••• •••• 4242</div>
            <div className="card-expiry">Expires 12/25</div>
          </div>
          <div className="payment-actions">
            <span className="default-badge">Default</span>
            <button className="btn btn-secondary">Edit</button>
            <button className="btn btn-danger">Remove</button>
          </div>
        </div>
        <button className="add-payment-btn">
          <CreditCard size={20} />
          Add Payment Method
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'orders':
        return renderOrders();
      case 'addresses':
        return renderAddresses();
      case 'payment':
        return renderPayment();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="sidebar-header">
              <h2>My Account</h2>
            </div>
            <nav className="sidebar-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  <span className="nav-label">{tab.label}</span>
                </button>
              ))}
            </nav>
            <button className="logout-btn" onClick={() => {
          localStorage.removeItem('lumina-current-user');
          window.dispatchEvent(new Event('userLoggedOut'));
          window.location.href = '/';
        }}>
          <LogOut size={20} />
          Sign Out
        </button>
          </div>

          <div className="profile-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
