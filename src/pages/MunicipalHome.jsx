import { Link } from 'react-router-dom'

function MunicipalHome() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Municipal / Civic Management</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Municipal Home</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
          Review citizen reports, monitor emerging hotspots, and test preventive interventions from one workspace.
        </p>
        <Link to="/dashboard" className="mt-8 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
          Open Municipal Dashboard
        </Link>
      </div>
    </main>
  )
}

export default MunicipalHome