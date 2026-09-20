import { Navigate, useLocation } from 'react-router-dom'

const roleHome = {
  CITIZEN: '/home',
  MUNICIPAL_OFFICER: '/municipal',
  ADMIN: '/admin',
}

function ProtectedRoute({ user, authReady, allowedRoles, children }) {
  const location = useLocation()

  if (!authReady) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <p className="text-sm text-slate-500">Restoring your session...</p>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleHome[user.role] || '/login'} replace />
  }

  return children
}

export default ProtectedRoute