import { mockReports } from '../data/mockReports'

const STORAGE_KEY = 'wastewatch-reports'

function readStoredReports() {
  if (typeof window === 'undefined') {
    return []
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY)

  if (!storedValue) {
    return []
  }

  try {
    const parsed = JSON.parse(storedValue)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveReports(reports) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))
  }
}

function getSeedReports() {
  return mockReports.map((report) => ({
    ...report,
    createdAt: report.createdAt || new Date().toISOString(),
    status: report.status || 'Under review',
    source: 'demo',
  }))
}

export function getReports() {
  const storedReports = readStoredReports()

  if (storedReports.length > 0) {
    return storedReports
  }

  const seededReports = getSeedReports()
  saveReports(seededReports)
  return seededReports
}

export function createReport(report) {
  const allReports = getReports()
  const nextReport = {
    id: report.id || `RPT-${Date.now()}`,
    location: report.location,
    category: report.category,
    description: report.description || '',
    status: report.status || 'Queued for review',
    severity: report.severity || 'Medium',
    confidence: report.confidence || 0.9,
    image: report.image || '',
    aiAnalysis: report.aiAnalysis || null,
    createdAt: report.createdAt || new Date().toISOString(),
    source: report.source || 'citizen',
  }

  const updatedReports = [nextReport, ...allReports]
  saveReports(updatedReports)
  return nextReport
}

export function getReportById(id) {
  return getReports().find((report) => report.id === id) || null
}
