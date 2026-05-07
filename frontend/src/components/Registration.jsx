import React, { useState } from 'react'
import './Registration.css'

export default function Registration({ onSuccess }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirm: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [message, setMessage] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors(null)
    setMessage(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) {
        setErrors(data)
      } else {
        setMessage('Registration successful. You can now log in.')
        setForm({
          username: '',
          email: '',
          phone_number: '',
          password: '',
          password_confirm: '',
        })
        if (onSuccess) onSuccess()
      }
    } catch (err) {
      setErrors({ network: ['Network error. Is the backend running?'] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="registration">
      <h2>Create an account</h2>

      {message && <div className="registration-success">{message}</div>}

      {errors && (
        <div className="registration-errors">
          {typeof errors === 'string' ? (
            errors
          ) : (
            <>
              {Object.entries(errors).map(([key, val]) => (
                <div key={key} className="error-group">
                  <strong>{key}</strong>: {Array.isArray(val) ? val.join(' ') : String(val)}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <form className="registration-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Phone
          <input name="phone_number" value={form.phone_number} onChange={handleChange} />
        </label>

        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>

        <label>
          Confirm Password
          <input
            name="password_confirm"
            type="password"
            value={form.password_confirm}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="registration-submit" disabled={loading}>
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </div>
  )
}
