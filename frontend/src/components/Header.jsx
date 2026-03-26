import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-logo">
          <div className="header-logo-icon">🔍</div>
          <span className="header-logo-text">Market Lens</span>
        </div>
        <span className="header-badge">PC Components</span>
      </div>
    </header>
  )
}
