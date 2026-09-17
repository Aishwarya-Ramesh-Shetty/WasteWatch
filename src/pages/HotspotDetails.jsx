import { ArrowRight, MapPinned, ShieldAlert, TrendingUp } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { mockHotspots } from '../data/mockHotspots'

function HotspotDetails() {
  const { id } = useParams()
  const hotspot = mockHotspots.find((item) => item.id === id) ?? mockHotspots[0]

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Hotspot analysis</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">{hotspot.name}</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Current reports</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{hotspot.currentReports}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Predicted risk</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{hotspot.predictedRisk}/100</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-800">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <p className="text-sm font-semibold">Historical trend</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This demo hotspot has shown a {hotspot.trend.toLowerCase()} pattern over the last seven days, driven by event activity, footfall concentration, and environmental conditions.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-800">Contributing factors</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {hotspot.factors.map((factor) => (
                <li key={factor} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Recommended action</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{hotspot.recommendedAction}</h2>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <ShieldAlert className="h-4 w-4" />
              <p className="text-sm font-semibold">Demo Data</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              The simulated risk and intervention values are illustrative and intended to demonstrate action planning, not real-world municipal outcomes.
            </p>
          </div>
          <Link to="/simulator" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
            Test interventions
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-600">
            <MapPinned className="h-4 w-4 text-emerald-600" />
            {hotspot.lastUpdated}
          </div>
        </aside>
      </div>
    </main>
  )
}

export default HotspotDetails
