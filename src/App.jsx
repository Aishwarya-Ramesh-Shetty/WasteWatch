import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { AUTH_CHANGE_EVENT, getCurrentUser, getStoredToken, logout } from './services/authService'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import HotspotDetails from './pages/HotspotDetails'
import Login from './pages/Login'
import MunicipalHome from './pages/MunicipalHome'
import Register from './pages/Register'
import ReportResult from './pages/ReportResult'
import ReportWaste from './pages/ReportWaste'
import WhatIfSimulator from './pages/WhatIfSimulator'

const roleHome = {
  CITIZEN: '/home',
  MUNICIPAL_OFFICER: '/municipal',
  ADMIN: '/admin',
}

function RoleRedirect({ user, authReady }) {
  if (!authReady) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <p className="text-sm text-slate-500">Restoring your session...</p>
      </main>
    )
  }

  return <Navigate to={user ? roleHome[user.role] || '/login' : '/login'} replace />
}

function AppContent() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const restoreSession = () => {
      setAuthReady(false)

      if (!getStoredToken()) {
        setUser(null)
        setAuthReady(true)
        return
      }

      getCurrentUser()
        .then(setUser)
        .finally(() => setAuthReady(true))
    }

    restoreSession()
    const handleAuthChange = (event) => {
      if (event.detail?.user) {
        setUser(event.detail.user)
        setAuthReady(true)
        return
      }

      restoreSession()
    }

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange)
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange)
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<RoleRedirect user={user} authReady={authReady} />} />
        <Route
          path="/home"
          element={<ProtectedRoute user={user} authReady={authReady} allowedRoles={['CITIZEN']}><Home /></ProtectedRoute>}
        />
        <Route
          path="/report"
          element={<ProtectedRoute user={user} authReady={authReady} allowedRoles={['CITIZEN']}><ReportWaste /></ProtectedRoute>}
        />
        <Route
          path="/report/result"
          element={<ProtectedRoute user={user} authReady={authReady} allowedRoles={['CITIZEN']}><ReportResult /></ProtectedRoute>}
        />
        <Route
          path="/municipal"
          element={<ProtectedRoute user={user} authReady={authReady} allowedRoles={['MUNICIPAL_OFFICER']}><MunicipalHome /></ProtectedRoute>}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute user={user} authReady={authReady} allowedRoles={['MUNICIPAL_OFFICER']}><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/hotspot/:id"
          element={<ProtectedRoute user={user} authReady={authReady} allowedRoles={['MUNICIPAL_OFFICER']}><HotspotDetails /></ProtectedRoute>}
        />
        <Route
          path="/simulator"
          element={<ProtectedRoute user={user} authReady={authReady} allowedRoles={['MUNICIPAL_OFFICER']}><WhatIfSimulator /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute user={user} authReady={authReady} allowedRoles={['ADMIN']}><Admin /></ProtectedRoute>}
        />
        <Route path="*" element={<RoleRedirect user={user} authReady={authReady} />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
