import React from 'react'
import OfferCard from './OfferCard'
import './SearchResults.css'

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-body">
        <div className="skeleton-line w-80" />
        <div className="skeleton-line w-60" />
        <div className="skeleton-line w-40" />
        <div className="skeleton-line h-lg" />
      </div>
    </div>
  )
}

export default function SearchResults({
  results,
  loading,
  error,
  hasSearched,
  onDismissError,
}) {
  return (
    <section className="results-section container">
      {/* Error alert */}
      {error && (
        <div className="results-error" role="alert">
          <span className="results-error-icon">⚠️</span>
          <div className="results-error-content">
            <p className="results-error-title">Something went wrong</p>
            <p className="results-error-message">{error}</p>
          </div>
          <button
            className="results-error-dismiss"
            onClick={onDismissError}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <>
          <div className="results-loading">
            <div className="results-loading-spinner" />
            <span className="results-loading-text">Searching offers…</span>
          </div>
          <div className="results-skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      )}

      {/* Results */}
      {!loading && hasSearched && (
        <>
          <div className="results-info">
            <span className="results-count">
              {results.length === 0
                ? 'No results found'
                : <>Found <strong>{results.length}</strong> {results.length === 1 ? 'result' : 'results'}</>}
            </span>
          </div>

          {results.length > 0 && (
            <div className="results-grid" id="results-grid">
              {results.map((offer, index) => (
                <OfferCard
                  key={offer.id || offer.url || `offer-${index}`}
                  offer={offer}
                  index={index}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
