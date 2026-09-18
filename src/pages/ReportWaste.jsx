import { Camera, ImageIcon, MapPin, Sparkles, Trash2, UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeWasteReport } from '../services/mockAIService'
import { createReport } from '../services/reportService'

const demoLocations = [
  'Beach Zone 04',
  'Market Area 02',
  'Railway Station Zone 01',
  'Residential Block 07',
  'Drainage Zone 03',
  'Event Zone 01',
]

const categoryOptions = ['Mixed Waste', 'Plastic', 'Organic Waste', 'Construction Waste', 'E-Waste', 'Other']

const initialState = {
  image: '',
  location: '',
  category: '',
  description: '',
}

function ReportWaste() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState(initialState)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelection = (file) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFormData((current) => ({ ...current, image: reader.result }))
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    handleFileSelection(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files?.[0]
    handleFileSelection(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.image) {
      setError('Please upload a waste image before submitting.')
      return
    }

    if (!formData.location) {
      setError('Please choose a demo location.')
      return
    }

    if (!formData.category) {
      setError('Please select a waste category.')
      return
    }

    setIsAnalyzing(true)
    setError('')

    const analysis = await analyzeWasteReport(formData)

    const newReport = createReport({
      id: `RPT-${Date.now()}`,
      location: formData.location,
      locationName: formData.location,
      wasteType: formData.category,
      selectedCategory: formData.category,
      category: formData.category,
      description: formData.description,
      image: formData.image,
      severity: analysis.severity,
      confidence: analysis.confidence,
      status: 'Queued for review',
      aiAnalysis: analysis,
      createdAt: new Date().toISOString(),
    })

    setIsAnalyzing(false)
    navigate('/report/result', { state: { report: newReport } })
  }

  const isSubmitDisabled = !formData.image || !formData.location || !formData.category || isAnalyzing

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Citizen reporting</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Report Waste</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Upload waste image</label>
              <div
                className={`rounded-2xl border border-dashed p-5 text-center transition ${
                  isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50'
                }`}
                onDragOver={(event) => {
                  event.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                {formData.image ? (
                  <div className="space-y-4">
                    <img src={formData.image} alt="Uploaded waste preview" className="mx-auto max-h-64 rounded-xl object-cover shadow-sm" />
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                      <span className="truncate">{formData.image.split(',')[0].slice(0, 40) || 'Uploaded image'}</span>
                      <button
                        type="button"
                        onClick={() => setFormData((current) => ({ ...current, image: '' }))}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-6">
                    <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-3 text-sm font-medium text-slate-700">Upload waste image</p>
                    <p className="mt-1 text-sm text-slate-500">Drag and drop or select a photo of the waste condition.</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      <Camera className="h-4 w-4" />
                      Select image
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="mb-2 block text-sm font-medium text-slate-700">Location</label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <select
                  id="location"
                  value={formData.location}
                  onChange={(event) => setFormData((current) => ({ ...current, location: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-400"
                >
                  <option value="">Select demo location</option>
                  {demoLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-2 text-xs text-slate-500">Demo locations only. This is a frontend mock flow.</p>
            </div>

            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">Waste category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400"
              >
                <option value="">Select a category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                id="description"
                rows="4"
                value={formData.description}
                onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
                placeholder="Describe what you observed..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {isAnalyzing && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <div className="mb-3 flex items-center gap-2 font-semibold">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Analyzing Waste
                </div>
                <ul className="space-y-1 text-emerald-700">
                  <li>• Detecting waste type...</li>
                  <li>• Assessing severity...</li>
                  <li>• Analyzing location...</li>
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze & Submit Report'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(initialState)
                  setError('')
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Reset form
              </button>
            </div>
          </form>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reporting guide</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">What this flow includes</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            <li>• Image upload preview with local state</li>
            <li>• Demo location selection</li>
            <li>• Simulated AI analysis and validation</li>
            <li>• Report persistence for the rest of the app</li>
          </ul>
          <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-700">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <ImageIcon className="h-4 w-4" />
              Frontend-only demo
            </div>
            This flow stores image data in browser memory and local storage for the MVP.
          </div>
        </aside>
      </div>
    </main>
  )
}

export default ReportWaste
