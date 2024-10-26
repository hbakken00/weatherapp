// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim() !== '') {
            onSearch(query);
            setQuery(''); // Clear input after search
        }
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search locations" 
            />
            <button onClick={handleSearch}>
                <span role="img" aria-label="search-icon">🔍</span>
            </button>
        </div>
    );
};

export default SearchBar;
