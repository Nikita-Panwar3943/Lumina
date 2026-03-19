import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockProducts = [
    { id: 1, name: 'Radiance Vitamin C Serum', category: 'Serums', price: 89.99, image: 'https://images.unsplash.com/photo-1620916566398-39f168eb0ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Hydra-Boost Moisturizer', category: 'Moisturizers', price: 64.99, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Gentle Foaming Cleanser', category: 'Cleansers', price: 44.99, image: 'https://images.unsplash.com/photo-1571781920623-75e96e30a72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'Retinol Night Cream', category: 'Moisturizers', price: 94.99, image: 'https://images.unsplash.com/photo-1620916566398-39f168eb0ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { id: 5, name: 'Niacinamide Booster', category: 'Serums', price: 54.99, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
  ];

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/collections?search=${encodeURIComponent(query)}`;
      setIsOpen(false);
    }
  };

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  const handleResultClick = (product) => {
    window.location.href = `/product?id=${product.id}`;
    closeSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setTimeout(() => {
      handleSearch({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <>
      <div className={`search-overlay ${isOpen ? 'open' : ''}`} onClick={closeSearch} />
      
      <button className="search-trigger" onClick={openSearch}>
        <Search size={20} />
      </button>

      <div className={`search-modal ${isOpen ? 'open' : ''}`}>
        <div className="search-header">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="search-input"
                autoFocus
              />
            </div>
          </form>
          <button className="search-close" onClick={closeSearch}>
            <X size={24} />
          </button>
        </div>

        <div className="search-results">
          {loading ? (
            <div className="search-loading">Searching...</div>
          ) : query.length >= 2 ? (
            results.length > 0 ? (
              <div className="results-list">
                <div className="results-header">
                  <span>{results.length} results found</span>
                </div>
                {results.map(product => (
                  <div key={product.id} className="search-result-item" onClick={() => handleResultClick(product)}>
                    <div className="result-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="result-details">
                      <h4>{product.name}</h4>
                      <p className="result-category">{product.category}</p>
                      <p className="result-price">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Search size={48} />
                <h3>No products found</h3>
                <p>Try searching with different keywords</p>
              </div>
            )
          ) : (
            <div className="search-suggestions">
              <h3>Popular Searches</h3>
              <div className="suggestions-list">
                <span onClick={() => handleSuggestionClick('Vitamin C Serum')}>Vitamin C Serum</span>
                <span onClick={() => handleSuggestionClick('Moisturizer')}>Moisturizer</span>
                <span onClick={() => handleSuggestionClick('Cleanser')}>Cleanser</span>
                <span onClick={() => handleSuggestionClick('Retinol')}>Retinol</span>
                <span onClick={() => handleSuggestionClick('Sunscreen')}>Sunscreen</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
