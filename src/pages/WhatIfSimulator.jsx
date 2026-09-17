import { ArrowLeftRight, Gauge, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { mockInterventions } from '../data/mockInterventions'

function WhatIfSimulator() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Scenario planner</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">What-If Simulator</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Gauge className="h-5 w-5 text-emerald-600" />
            <h2 className="text-2xl font-semibold text-slate-900">Baseline hotspot</h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Current hotspot risk</p>
            <p className="mt-2 text-4xl font-semibold text-slate-900">82</p>
            <div className="mt-4 h-2.5 rounded-full bg-slate-200">
              <div className="h-2.5 w-[82%] rounded-full bg-amber-500" />
            </div>
            <p className="mt-4 text-sm text-slate-600">Illustrative demo hotspot: Beach Zone 04</p>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <Sparkles className="h-4 w-4" />
              <p className="text-sm font-semibold">Illustrative simulation</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              This simulator tests hypothetical interventions as a product concept. The values shown are demo outputs and not real-world measured predictions.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <ArrowLeftRight className="h-5 w-5 text-sky-600" />
            <h2 className="text-2xl font-semibold text-slate-900">Intervention scenarios</h2>
          </div>

          <div className="space-y-4">
            {mockInterventions.map((intervention) => (
              <div key={intervention.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{intervention.name}</p>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{intervention.simulatedRisk}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{intervention.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Baseline risk: {intervention.baselineRisk}</span>
                  <span>Simulated risk: {intervention.simulatedRisk}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/dashboard" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
          Back to dashboard
        </Link>
      </div>
    </main>
  )
}

export default WhatIfSimulator
