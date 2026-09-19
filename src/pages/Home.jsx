import { ArrowRight, Building2, CircleDashed, MapPinned, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const workflow = [
  { title: 'Report', text: 'Citizens capture a waste sighting with image and location context.' },
  { title: 'Detect', text: 'AI reviews the observation to identify waste categories and severity.' },
  { title: 'Learn', text: 'Patterns across recurring reports and locations are analyzed over time.' },
  { title: 'Predict', text: 'Spatial-temporal trends highlight emerging hotspots before they worsen.' },
  { title: 'Recommend', text: 'The system suggests interventions based on conditions and contributing factors.' },
  { title: 'Prevent', text: 'Municipal teams can act early to reduce risk before it becomes a crisis.' },
]

const capabilities = [
  'AI Waste Detection',
  'Spatial-Temporal Hotspot Prediction',
  'Risk Mapping',
  'Contributing Factor Analysis',
  'Intervention Recommendations',
  'What-If Simulation',
]

function Home() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              Waste monitoring for civic action
            </div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              WasteWatch AI
            </h1>
            <p className="mt-4 text-2xl font-medium tracking-tight text-emerald-700">Detect. Predict. Prevent.</p>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              A smarter approach to identifying and preventing emerging waste hotspots.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/report" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Demo hotspot risk</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">82/100</p>
                </div>
                <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">High</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                    <span>Beach Zone 04</span>
                    <span>82</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[82%] rounded-full bg-amber-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                    <span>Market Area 02</span>
                    <span>76</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[76%] rounded-full bg-orange-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                    <span>Drainage Zone 03</span>
                    <span>88</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[88%] rounded-full bg-red-500" />
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  Simulated response
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Increase cleaning frequency could reduce risk from 82 to 61 in this illustrative scenario.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">From observation to prevention</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {workflow.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Operational loop</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Citizen insight to municipal action</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {[
            'Citizen',
            'Report waste',
            'AI analyzes observation',
            'WasteWatch identifies patterns',
            'Municipality sees risk',
            'Municipality tests interventions',
            'Preventive action',
          ].map((item, index) => (
            <div key={item} className="flex flex-col items-center gap-2 text-center">
              <div className={`flex h-16 w-full items-center justify-center rounded-2xl border px-3 text-sm font-medium ${
                index === 0 || index === 6
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}>
                {item}
              </div>
              {index < 6 && <div className="text-slate-400">→</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Core capabilities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">A system designed for prevention</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((capability) => (
              <div key={capability} className="rounded-2xl border border-slate-700 bg-slate-800/70 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-300">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <p className="font-medium text-slate-100">{capability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Distinctive advantage</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Don’t just predict the hotspot. Test the response.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                Municipal users can compare possible interventions through simulated scenarios before deciding what action to take. These values are illustrative and designed to demonstrate the product concept; they are not guaranteed real-world outcomes.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white p-4 text-emerald-700 shadow-sm">
              <CircleDashed className="h-7 w-7" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">Illustrative simulation</p>
                <p className="text-lg font-semibold">82 → 61</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/report" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
            Explore the product
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
