import { AlertTriangle, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mockHotspots } from '../data/mockHotspots'
import { mockPredictions } from '../data/mockPredictions'
import { calculateHotspotRisk } from '../services/hotspotRiskService'
import { getReports, getReportsFromBackend } from '../services/reportService'
import { aggregateReportsByLocation } from '../utils/reportAnalytics'

function Dashboard() {
  const [reports, setReports] = useState(() => getReports())

  useEffect(() => {
    let isActive = true

    getReportsFromBackend()
      .then((backendReports) => {
        if (isActive && backendReports.length > 0) {
          setReports(backendReports)
        }
      })
      .catch(() => {})

    return () => {
      isActive = false
    }
  }, [])

  const recentReports = reports.slice(0, 5)
  const locationAnalytics = aggregateReportsByLocation(reports)
  const locationCards = Object.values(locationAnalytics).map((location, index) => {
    const hotspot = mockHotspots.find((item) => item.name === location.locationName)
    const risk = calculateHotspotRisk(location)

    return {
      ...location,
      risk,
      id: hotspot?.id || location.locationId,
      areaType: hotspot?.areaType || 'Reported location',
      recommendedAction: hotspot?.recommendedAction || 'Review citizen reports and plan a local response.',
      mapPosition: `${18 + (index * 23) % 68}%`,
      mapTop: `${20 + (index * 31) % 54}%`,
    }
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Municipal / Civic Management</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Municipal Dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Monitor citizen reports, identify emerging waste hotspots, and plan preventive interventions.
        </p>
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
              {locationCards.map((location) => (
                <Link
                  key={location.locationId}
                  to={`/hotspot/${location.id}`}
                  title={`${location.locationName}: ${location.risk.status}, ${location.risk.score}/100`}
                  className={`absolute h-4 w-4 rounded-full shadow-lg ring-4 transition hover:scale-125 ${
                    location.risk.score >= 80
                      ? 'bg-red-500 ring-red-100'
                      : location.risk.score >= 60
                        ? 'bg-amber-500 ring-amber-100'
                        : 'bg-emerald-500 ring-emerald-100'
                  }`}
                  style={{ left: location.mapPosition, top: location.mapTop }}
                />
              ))}

              <div className="absolute inset-x-0 bottom-0 flex justify-between border-t border-slate-200 bg-white/70 px-4 py-3 text-xs font-medium text-slate-600">
                {locationCards.slice(0, 3).map((location) => (
                  <Link key={location.locationId} to={`/hotspot/${location.id}`} className="truncate hover:text-emerald-700">
                    {location.locationName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Priority interventions</p>
          <div className="mt-5 space-y-4">
            {mockHotspots.slice(0, 3).map((hotspot) => {
              const location = locationAnalytics[hotspot.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')]
              const risk = calculateHotspotRisk(location)

              return (
              <div key={hotspot.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{hotspot.name}</p>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">{risk.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">Demo / Simulated Risk: {risk.score}/100</p>
                <Link to={`/hotspot/${hotspot.id}`} className="mt-3 inline-flex text-sm font-semibold text-emerald-700">
                  View hotspot →
                </Link>
              </div>
              )
            })}
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
            {locationCards.map((location) => (
              <div key={location.locationId} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{location.locationName}</p>
                    <p className="text-sm text-slate-500">{location.areaType}</p>
                  </div>
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">{location.risk.status}</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
                  <span><strong className="text-slate-900">{location.totalReports}</strong> Citizen Reports</span>
                  <span><strong className="text-slate-900">{location.recentReports}</strong> recent reports</span>
                  <span><strong className="text-slate-900">{location.severityBreakdown.high || 0}</strong> high severity</span>
                  <span><strong className="text-slate-900">{location.risk.score}/100</strong> Demo / Simulated Risk</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{location.recommendedAction}</p>
                <Link to={`/hotspot/${location.id}`} className="mt-3 inline-flex text-sm font-semibold text-emerald-700">
                  View location →
                </Link>
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
                      <p className="font-semibold text-slate-900">{report.locationName || report.location}</p>
                      <p className="text-sm text-slate-500">{report.wasteType || report.category}</p>
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
