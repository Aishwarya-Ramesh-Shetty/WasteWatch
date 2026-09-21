import { mockReports } from '../data/mockReports'
import { authenticatedRequest } from './authService'
import { aggregateReportsByLocation } from '../utils/reportAnalytics'

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
    locationId: report.locationId || report.location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    locationName: report.locationName || report.location,
    wasteType: report.wasteType || report.category,
    selectedCategory: report.selectedCategory || report.category,
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
    locationId: report.locationId || report.location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    locationName: report.locationName || report.location,
    wasteType: report.wasteType || report.category,
    selectedCategory: report.selectedCategory || report.category,
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

function normalizeBackendReport(report) {
  const location = report.location_name || 'Unknown location'
  return {
    id: report.id,
    location,
    locationId: location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    locationName: location,
    wasteType: report.category,
    selectedCategory: report.category,
    category: report.category,
    description: report.description || '',
    status: report.status,
    severity: report.severity,
    confidence: report.confidence,
    image: '',
    aiAnalysis: report.ai_analysis || null,
    createdAt: report.created_at,
    source: 'backend',
  }
}

export async function createReportOnBackend(report) {
  const createdReport = await authenticatedRequest('/api/reports', {
    method: 'POST',
    body: JSON.stringify({
      location_name: report.location,
      category: report.category,
      severity: report.severity,
      description: report.description || null,
      confidence: report.confidence ?? null,
      status: report.status || 'Queued for review',
      ai_analysis: report.aiAnalysis || null,
    }),
  })

  return normalizeBackendReport(createdReport)
}

export async function getReportsFromBackend() {
  const reports = await authenticatedRequest('/api/reports')
  return reports.map(normalizeBackendReport)
}

export function getReportById(id) {
  return getReports().find((report) => report.id === id) || null
}

export function getLocationReportAnalytics() {
  return aggregateReportsByLocation(getReports())
}
