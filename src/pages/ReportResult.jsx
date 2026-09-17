import { CheckCircle2, MapPin, ShieldAlert, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function ReportResult() {
  const location = useLocation()
  const report = location.state?.report

  if (!report) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">No report found</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">No submitted report was found.</h1>
          <Link to="/report" className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">
            Submit a report
          </Link>
        </div>
      </main>
    )
  }

  const confidencePercent = Math.round((report.aiAnalysis?.confidence || report.confidence || 0.9) * 100)

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Report outcome</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Report Result</h1>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {report.status}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            {report.image && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <img src={report.image} alt="Submitted waste report preview" className="mx-auto max-h-72 rounded-xl object-cover" />
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Detected Waste</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{report.aiAnalysis?.wasteType || report.category}</h2>
                </div>
                <div className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
                  {report.aiAnalysis?.severity || report.severity || 'Medium'}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Confidence</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{confidencePercent}%</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Location</p>
                <p className="mt-2 flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  {report.location}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Submitted details</p>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-800">Category:</span> {report.category}</p>
                <p><span className="font-semibold text-slate-800">Description:</span> {report.description || 'No description provided.'}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-800">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <p className="text-sm font-semibold">AI Analysis</p>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Demo / Simulated</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {report.aiAnalysis?.explanation || 'No explanation available.'}
              </p>
              {report.aiAnalysis?.contributingSignals && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Contributing signals</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {report.aiAnalysis.contributingSignals.map((signal) => (
                      <li key={signal}>• {signal}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 text-amber-700">
                <ShieldAlert className="h-4 w-4" />
                <p className="text-sm font-semibold">Important</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Demo / simulated AI output for the frontend MVP only. This confidence value is illustrative and not a verified model result.
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{report.status}</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            <li>• Report ID: {report.id}</li>
            <li>• Submitted by: Citizen</li>
            <li>• Next step: AI review and municipal triage</li>
            <li>• Follow-up: preventive action planning</li>
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/dashboard" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
              View Municipal Dashboard
            </Link>
            <Link to="/report" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
              Submit Another Report
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default ReportResult
