import React from 'react'
import './SearchBar.css'

export default function SearchBar({ query, setQuery, onSubmit, loading }) {
  return (
    <section className="search-section">
      <h1 className="search-hero-title">Find the Best PC Deals</h1>
      <p className="search-hero-subtitle">
        Compare prices across top retailers — powered by real-time data
      </p>
      <form className="search-form" onSubmit={onSubmit} id="search-form">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          id="search-input"
          className="search-input"
          type="text"
          placeholder="Search for GPUs, CPUs, monitors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          aria-label="Search offers"
        />
        <button
          id="search-button"
          className="search-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="search-btn-spinner" aria-hidden="true" />
              Searching…
            </>
          ) : (
            'Search'
          )}
        </button>
      </form>
    </section>
  )
}
