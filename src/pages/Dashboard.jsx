import { AlertTriangle, MapPinned, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mockHotspots } from '../data/mockHotspots'
import { mockPredictions } from '../data/mockPredictions'
import { getReports } from '../services/reportService'

function Dashboard() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    setReports(getReports())
  }, [])

  const recentReports = reports.slice(0, 5)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Municipal perspective</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Municipal Dashboard</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {mockPredictions.map((prediction) => (
          <div key={prediction.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{prediction.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{prediction.value}</p>
            <p className="mt-2 text-sm text-slate-600">{prediction.context}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Hotspot map</h2>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Demo Data</div>
          </div>

          <div className="h-[320px] rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-slate-50 to-sky-50 p-6">
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-dashed border-slate-300 bg-white/60">
              <div className="absolute left-[18%] top-[24%] h-4 w-4 rounded-full bg-red-500 shadow-lg" />
              <div className="absolute left-[46%] top-[32%] h-4 w-4 rounded-full bg-amber-500 shadow-lg" />
              <div className="absolute left-[60%] top-[56%] h-4 w-4 rounded-full bg-emerald-500 shadow-lg" />
              <div className="absolute left-[78%] top-[20%] h-4 w-4 rounded-full bg-orange-500 shadow-lg" />

              <div className="absolute inset-x-0 bottom-0 flex justify-between border-t border-slate-200 bg-white/70 px-4 py-3 text-xs font-medium text-slate-600">
                <span>Beach Zone 04</span>
                <span>Market Area 02</span>
                <span>Drainage Zone 03</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Priority interventions</p>
          <div className="mt-5 space-y-4">
            {mockHotspots.slice(0, 3).map((hotspot) => (
              <div key={hotspot.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{hotspot.name}</p>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">{hotspot.riskLabel}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">Predicted risk: {hotspot.predictedRisk}/100</p>
                <Link to={`/hotspot/${hotspot.id}`} className="mt-3 inline-flex text-sm font-semibold text-emerald-700">
                  View hotspot →
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h2 className="text-2xl font-semibold text-slate-900">Active hotspots</h2>
          </div>
          <div className="space-y-4">
            {mockHotspots.map((hotspot) => (
              <div key={hotspot.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{hotspot.name}</p>
                    <p className="text-sm text-slate-500">{hotspot.areaType}</p>
                  </div>
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">{hotspot.predictedRisk}/100</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{hotspot.recommendedAction}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h2 className="text-2xl font-semibold text-slate-900">Recent reports</h2>
          </div>
          <div className="space-y-4">
            {recentReports.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                No reports yet. Submit the first citizen report to populate the dashboard.
              </div>
            ) : (
              recentReports.map((report) => (
                <div key={report.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{report.location}</p>
                      <p className="text-sm text-slate-500">{report.category}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">{report.severity || report.aiAnalysis?.severity || 'Medium'}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{report.status}</span>
                    <span>{report.timestamp || new Date(report.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
