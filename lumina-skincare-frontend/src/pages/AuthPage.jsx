import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Create test user if not exists
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('lumina-users') || '[]');
    const testUser = users.find(u => u.email === 'test@gmail.com');
    
    if (!testUser) {
      // Create test user
      users.push({
        id: Date.now(),
        name: 'Test User',
        email: 'test@gmail.com',
        password: '123456'
      });
      localStorage.setItem('lumina-users', JSON.stringify(users));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Store user data in localStorage for demo
    if (!isLogin) {
      const users = JSON.parse(localStorage.getItem('lumina-users') || '[]');
      const userExists = users.find(u => u.email === formData.email);
      
      if (userExists) {
        alert('User with this email already exists!');
        return;
      }
      
      const newUserId = Date.now();
      users.push({
        id: newUserId,
        name: formData.name,
        email: formData.email,
        password: formData.password // In production, this should be hashed
      });
      
      localStorage.setItem('lumina-users', JSON.stringify(users));
      localStorage.setItem('lumina-current-user', JSON.stringify({
        id: newUserId,
        name: formData.name,
        email: formData.email
      }));
      
      alert('Account created successfully!');
      window.dispatchEvent(new Event('userLoggedIn'));
      window.location.href = '/profile';
    } else {
      // Login
      const users = JSON.parse(localStorage.getItem('lumina-users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('lumina-current-user', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email
        }));
        alert('Login successful!');
        window.dispatchEvent(new Event('userLoggedIn'));
        window.location.href = '/profile';
      } else {
        alert('Invalid email or password!');
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-content">
            <h1>Welcome to LUMINA</h1>
            <p>Join our community and unlock exclusive benefits</p>
            
            <div className="auth-features">
              <div className="feature-item">
                <div className="feature-icon">🎁</div>
                <h3>15% Off First Order</h3>
                <p>Get instant savings when you sign up</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚚</div>
                <h3>Free Shipping</h3>
                <p>On orders over $50</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">�</div>
                <h3>Premium Quality</h3>
                <p>Dermatologist tested formulas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
            
            {isLogin && (
              <div className="test-credentials" style={{
                background: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#495057' }}>
                  Test Credentials:
                </p>
                <p style={{ margin: '0 0 4px 0', color: '#6c757d' }}>
                  Email: <strong style={{ color: '#007bff' }}>test@gmail.com</strong>
                </p>
                <p style={{ margin: '0', color: '#6c757d' }}>
                  Password: <strong style={{ color: '#007bff' }}>123456</strong>
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              
              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={20} />
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  className="auth-link-btn"
                  onClick={toggleForm}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {!isLogin && (
              <div className="terms-agreement">
                <p>
                  By creating an account, you agree to our{' '}
                  <a href="#">Terms of Service</a> and{' '}
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
