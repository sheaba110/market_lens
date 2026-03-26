import React from 'react'
import './EmptyState.css'

export default function EmptyState({ hasSearched }) {
  if (hasSearched) return null

  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">🖥️</div>
      <h2 className="empty-state-title">Discover PC Components</h2>
      <p className="empty-state-subtitle">
        Search across multiple retailers to find the best prices on GPUs, CPUs,
        monitors, and more.
      </p>
    </div>
  )
}
