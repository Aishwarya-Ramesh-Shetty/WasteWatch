const AUTH_TOKEN_KEY = 'wastewatch_auth_token'
const AUTH_USER_KEY = 'wastewatch_auth_user'
const AUTH_CHANGE_EVENT = 'wastewatch-auth-change'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    const message = data?.detail || 'Authentication request failed.'
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return data
}

export function saveSession(token, user) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function getStoredToken() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export function getStoredUser() {
  if (typeof window === 'undefined') {
    return null
  }

  const rawUser = window.localStorage.getItem(AUTH_USER_KEY)
  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser)
  } catch {
    return null
  }
}

export function logout({ notify = true } = {}) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.localStorage.removeItem(AUTH_USER_KEY)
  if (notify) {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
  }
}

export async function registerUser({ name, email, password }) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export async function loginUser({ email, password }) {
  const result = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  if (result?.access_token && result?.user) {
    saveSession(result.access_token, result.user)
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: { user: result.user } }))
  }

  return result
}

export async function getCurrentUser() {
  const token = getStoredToken()
  if (!token) {
    return null
  }

  try {
    const data = await request('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    saveSession(token, data)
    return data
  } catch {
    logout({ notify: false })
    return null
  }
}

export async function createMunicipalOfficer({ name, email, password }) {
  const token = getStoredToken()
  return request('/api/admin/municipal-officers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, password }),
  })
}

export async function getMunicipalOfficers() {
  const token = getStoredToken()
  return request('/api/admin/municipal-officers', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export { AUTH_CHANGE_EVENT }
