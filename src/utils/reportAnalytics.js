const RECENT_REPORT_WINDOW_MS = 24 * 60 * 60 * 1000

function toLocationId(location) {
  return location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function toBreakdownKey(value) {
  return (value || 'Other').toLowerCase().replace(/\s+/g, '-')
}

export function aggregateReportsByLocation(reports, now = Date.now()) {
  return reports.reduce((locations, report) => {
    const locationName = report.locationName || report.location || 'Unknown location'
    const locationId = report.locationId || toLocationId(locationName)
    const current = locations[locationId] || {
      locationId,
      locationName,
      totalReports: 0,
      recentReports: 0,
      severityBreakdown: {},
      wasteBreakdown: {},
    }

    current.totalReports += 1

    const createdAt = Date.parse(report.createdAt || '')
    if (createdAt && now - createdAt <= RECENT_REPORT_WINDOW_MS) {
      current.recentReports += 1
    }

    const severityKey = toBreakdownKey(report.severity || report.aiAnalysis?.severity)
    current.severityBreakdown[severityKey] = (current.severityBreakdown[severityKey] || 0) + 1

    const wasteKey = toBreakdownKey(report.wasteType || report.selectedCategory || report.category)
    current.wasteBreakdown[wasteKey] = (current.wasteBreakdown[wasteKey] || 0) + 1

    locations[locationId] = current
    return locations
  }, {})
}

export function getLocationId(location) {
  return toLocationId(location)
}