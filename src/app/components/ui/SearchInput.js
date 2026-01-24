'use client';

import { useState, useEffect, useRef } from 'react';

export default function SearchInput({
  label,
  placeholder = 'Search...',
  value = '',
  onSearch,
  onSelect,
  results = [],
  loading = false,
  renderItem,
  debounceMs = 300,
  className = '',
}) {
  const [query, setQuery] = useState(value);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length >= 2 && onSearch) {
      debounceRef.current = setTimeout(() => {
        onSearch(query);
        setShowResults(true);
      }, debounceMs);
    } else {
      setShowResults(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, debounceMs, onSearch]);

  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item);
    }
    setShowResults(false);
    setQuery('');
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowResults(true)}
        placeholder={placeholder}
        className="form-input"
      />

      {/* Dropdown Results */}
      {showResults && (
        <div className="absolute z-20 w-full mt-1 bg-[#FEFEFE] border border-[#ABAFB1] rounded shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="p-3 text-center text-[#5E6366] text-[14px]">
              Searching...
            </div>
          ) : results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => handleSelect(item)}
                className="p-3 hover:bg-[#F5F5FA] cursor-pointer border-b border-[#F5F5FA] last:border-b-0"
              >
                {renderItem ? renderItem(item) : item.name || item.label}
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-[#5E6366] text-[14px]">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
