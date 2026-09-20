import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, MapPinned, X } from 'lucide-react'

const roleNavItems = {
  CITIZEN: [
    { label: 'Home', to: '/home' },
    { label: 'Report Waste', to: '/report' },
  ],
  MUNICIPAL_OFFICER: [
    { label: 'Home', to: '/municipal' },
    { label: 'Municipal Dashboard', to: '/dashboard' },
  ],
  ADMIN: [{ label: 'Admin', to: '/admin' }],
}

function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return null
  }

  const navItems = roleNavItems[user.role] || []

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to={navItems[0]?.to || '/login'} className="flex items-center gap-3" aria-label="WasteWatch AI home">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <MapPinned className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">WasteWatch AI</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Detect. Predict. Prevent.</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                onLogout()
              }}
              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
