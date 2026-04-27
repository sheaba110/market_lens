import React, { useState } from 'react'
import './Login.css'
import { login as apiLogin } from '../api/authApi'

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await apiLogin(form)
      if (onSuccess) onSuccess()
    } catch (err) {
      if (err?.response?.data) {
        setError(JSON.stringify(err.response.data))
      } else {
        setError('Network error. Is the backend running?')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <h2>Sign in</h2>

      {error && <div className="login-error">{error}</div>}

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>

        <button className="login-submit" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
