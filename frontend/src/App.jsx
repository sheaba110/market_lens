import React from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import EmptyState from './components/EmptyState'
import { useSearch } from './hooks/useSearch'

export default function App() {
  const {
    query,
    setQuery,
    results,
    loading,
    error,
    hasSearched,
    handleSearch,
    clearError,
  } = useSearch()

  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSubmit={handleSearch}
          loading={loading}
        />
        <SearchResults
          results={results}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          onDismissError={clearError}
        />
        <EmptyState hasSearched={hasSearched} />
      </main>
    </div>
  )
}
