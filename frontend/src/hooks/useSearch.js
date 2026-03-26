import { useState, useCallback } from 'react'
import { searchOffers } from '../api/searchApi'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = useCallback(async (e) => {
    if (e) e.preventDefault()

    const trimmed = query.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const data = await searchOffers(trimmed)
      setResults(data)
    } catch (err) {
      let errorMessage = 'Failed to search. '

      if (err.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. Please check if the backend server is running.'
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        errorMessage += 'Cannot connect to backend server. Please ensure it is running on port 8000.'
      } else if (err.response) {
        errorMessage += err.response.data?.detail || `Server error: ${err.response.status} ${err.response.statusText}`
      } else if (err.request) {
        errorMessage += 'No response from server. Please check if the backend server is running.'
      } else {
        errorMessage += err.message || 'Unknown error occurred'
      }

      setError(errorMessage)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [query])

  const clearError = useCallback(() => setError(null), [])

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    hasSearched,
    handleSearch,
    clearError,
  }
}
