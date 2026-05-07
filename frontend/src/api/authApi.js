import apiClient from './searchApi'

export async function login({ username, password }) {
  const response = await apiClient.post('/login/', { username, password })
  const data = response.data

  if (data.access) {
    localStorage.setItem('accessToken', data.access)
  }
  if (data.refresh) {
    localStorage.setItem('refreshToken', data.refresh)
  }

  // ensure Authorization header is set for subsequent requests
  if (data.access) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access}`
  }

  return data
}

export function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  delete apiClient.defaults.headers.common['Authorization']
}

export function setAuthHeaderFromStorage() {
  const token = localStorage.getItem('accessToken')
  if (token) apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function getAccessToken() {
  return localStorage.getItem('accessToken')
}

export default {
  login,
  logout,
  setAuthHeaderFromStorage,
  getAccessToken,
}
