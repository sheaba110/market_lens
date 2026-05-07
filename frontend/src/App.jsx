import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import EmptyState from './components/EmptyState'
import Registration from './components/Registration'
import Login from './components/Login'
import { setAuthHeaderFromStorage, logout as authLogout } from './api/authApi'
import { useSearch } from './hooks/useSearch'

export default function App() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

  useEffect(() => {
    setAuthHeaderFromStorage()
    setIsAuthenticated(!!localStorage.getItem('accessToken'))
    console.log(import.meta.env.VITE_API_URL) // Log the API URL to verify it's being read correctly
  }, [])

  return (
    <div className="app">
      <Header
        onRegisterClick={() => {
          setShowRegistration(v => !v)
          setShowLogin(false)
        }}
        onLoginClick={() => {
          setShowLogin(v => !v)
          setShowRegistration(false)
        }}
        isAuthenticated={isAuthenticated}
        onLogout={() => {
          authLogout()
          setIsAuthenticated(false)
        }}
      />
      <main className="app-content">
        {showRegistration ? (
          <Registration onSuccess={() => setShowRegistration(false)} />
        ) : showLogin ? (
          <Login
            onSuccess={() => {
              setIsAuthenticated(true)
              setShowLogin(false)
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  )
}
