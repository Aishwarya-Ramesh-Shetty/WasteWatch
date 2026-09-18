import { ArrowRight, MapPinned, ShieldAlert, TrendingUp } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { mockHotspots } from '../data/mockHotspots'
import { calculateHotspotRisk } from '../services/hotspotRiskService'
import { getLocationReportAnalytics } from '../services/reportService'

function formatBreakdownLabel(value) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function HotspotDetails() {
  const { id } = useParams()
  const matchedHotspot = mockHotspots.find((item) => item.id === id)
  const locationAnalytics = getLocationReportAnalytics()
  const location = Object.values(locationAnalytics).find(
    (item) => item.locationId === id || item.locationName === matchedHotspot?.name,
  )
  const hotspot = matchedHotspot || {
    name: location?.locationName || 'Reported location',
    predictedRisk: 'Pending',
    trend: 'Emerging',
    factors: [],
    recommendedAction: 'Review citizen reports and plan a local response.',
    lastUpdated: 'Demo Data',
  }
  const locationName = location?.locationName || hotspot.name
  const citizenReports = location?.totalReports || 0
  const recentReports = location?.recentReports || 0
  const risk = calculateHotspotRisk(location)

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Hotspot analysis</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">{locationName}</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Citizen Reports</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{citizenReports}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Demo / Simulated Risk</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{risk.score}/100</p>
              <p className="mt-1 text-sm font-semibold text-emerald-700">{risk.status}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">Recent activity</p>
            <p className="mt-2 text-sm text-emerald-800">{recentReports} reports in the last 24 hours</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-800">Waste composition</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {Object.entries(location?.wasteBreakdown || {}).map(([category, count]) => (
                  <li key={category}>{formatBreakdownLabel(category)} — {count}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Severity</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {Object.entries(location?.severityBreakdown || {}).map(([severity, count]) => (
                  <li key={severity}>{formatBreakdownLabel(severity)} — {count}</li>
                ))}
              </ul>
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
            <p className="text-sm font-semibold text-slate-800">Why this location is flagged</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {risk.reasons.map((reason) => (
                <li key={reason} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-800">Contextual factors</p>
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
              <p className="text-sm font-semibold">Demo / Simulated Risk</p>
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
