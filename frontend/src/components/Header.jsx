import React from 'react'
import './Header.css'

export default function Header({ onRegisterClick, onLoginClick, isAuthenticated, onLogout }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-logo">
          <div className="header-logo-icon">🔍</div>
          <span className="header-logo-text">Market Lens</span>
        </div>
        <div className="header-actions">
          <span className="header-badge">PC Components</span>
          {isAuthenticated ? (
            <button className="header-register" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="header-login" onClick={onLoginClick}>
                Login
              </button>
              <button className="header-register" onClick={onRegisterClick}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
