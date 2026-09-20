import { useEffect, useState } from 'react'
import { createMunicipalOfficer, getMunicipalOfficers } from '../services/authService'

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function getRequestError(error) {
  if (!error.status) {
    return 'Unable to connect to the authentication service.'
  }

  if (error.status === 401) {
    return 'Your authentication session has expired. Please log in again.'
  }

  if (error.status === 403) {
    return 'You are not authorized to create municipal accounts.'
  }

  return error.message || 'Unable to create the municipal officer account.'
}

function Admin() {
  const [officers, setOfficers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState('')
  const [createdOfficer, setCreatedOfficer] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getMunicipalOfficers()
      .then(setOfficers)
      .catch((error) => setLoadError(getRequestError(error)))
      .finally(() => setIsLoading(false))
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setStatusMessage('')
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Officer name is required.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.'
    } else if (formData.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm the password.'
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setStatusMessage('')

    try {
      const officer = await createMunicipalOfficer({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      setOfficers((current) => [officer, ...current])
      setCreatedOfficer(officer)
      setStatusMessage('Municipal Officer account created successfully.')
      setFormData(initialForm)
      setIsFormOpen(false)
    } catch (error) {
      setStatusMessage(getRequestError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const openForm = () => {
    setCreatedOfficer(null)
    setStatusMessage('')
    setErrors({})
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setFormData(initialForm)
    setErrors({})
    setStatusMessage('')
    setIsFormOpen(false)
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Administration</p>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Admin Dashboard</h1>
          <button
            type="button"
            onClick={openForm}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            + Create Municipal Officer
          </button>
        </div>

        {statusMessage && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {statusMessage}
          </div>
        )}

        {createdOfficer && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{createdOfficer.name}</p>
            <p className="mt-1">{createdOfficer.email}</p>
          </div>
        )}

        {isFormOpen && (
          <form className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5" onSubmit={handleSubmit} noValidate>
            <h2 className="text-2xl font-semibold text-slate-900">Create Municipal Officer</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="officer-name" className="mb-2 block text-sm font-medium text-slate-700">Officer Name</label>
                <input id="officer-name" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400" />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="officer-email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input id="officer-email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400" />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="officer-password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input id="officer-password" name="password" type="password" value={formData.password} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400" />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="officer-confirm-password" className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</label>
                <input id="officer-confirm-password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400" />
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                {isSubmitting ? 'Creating Officer...' : 'Create Officer'}
              </button>
              <button type="button" onClick={closeForm} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                Cancel
              </button>
            </div>
          </form>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-900">Municipal Officers</h2>
          {isLoading && <p className="mt-4 text-sm text-slate-500">Loading municipal officers...</p>}
          {loadError && <p className="mt-4 text-sm text-red-600">{loadError}</p>}
          {!isLoading && !loadError && officers.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">No municipal officers have been created yet.</p>
          )}
          {!isLoading && !loadError && officers.length > 0 && (
            <div className="mt-4 space-y-3">
              {officers.map((officer) => (
                <div key={officer.id} className="flex flex-col justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-semibold text-slate-900">{officer.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{officer.email}</p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{officer.role}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Admin