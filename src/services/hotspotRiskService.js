const RISK_THRESHOLDS = [
  { minimum: 80, status: 'Emerging Hotspot' },
  { minimum: 60, status: 'Watch' },
  { minimum: 40, status: 'Moderate Activity' },
  { minimum: 0, status: 'Low Activity' },
]

const SEVERITY_WEIGHTS = {
  high: 1,
  medium: 0.6,
  low: 0.25,
}

const EMPTY_LOCATION = {
  totalReports: 0,
  recentReports: 0,
  severityBreakdown: {},
  wasteBreakdown: {},
}

function getRiskStatus(score) {
  return RISK_THRESHOLDS.find((threshold) => score >= threshold.minimum).status
}

function getSeverityScore(location) {
  const totalReports = location.totalReports || 0
  if (totalReports === 0 || location.recentReports === 0) return 0

  const weightedSeverity = Object.entries(location.severityBreakdown || {}).reduce(
    (total, [severity, count]) => total + (SEVERITY_WEIGHTS[severity] || 0.1) * count,
    0,
  )
  const recentRatio = Math.min(1, location.recentReports / totalReports)
  return Math.round((weightedSeverity / totalReports) * 25 * recentRatio)
}

function getCategoryScore(location) {
  if (location.recentReports < 2) return 0

  const categoryCounts = Object.values(location.wasteBreakdown || {})
  const dominantCategoryCount = Math.max(...categoryCounts, 0)
  const concentration = location.totalReports ? dominantCategoryCount / location.totalReports : 0
  return Math.round(concentration * 20)
}

function getReasons(location) {
  const reasons = []
  const highSeverityReports = location.severityBreakdown?.high || 0
  const dominantCategoryCount = Math.max(...Object.values(location.wasteBreakdown || {}), 0)
  const categoryConcentration = location.totalReports ? dominantCategoryCount / location.totalReports : 0

  if (location.recentReports >= 4) {
    reasons.push('High recent report activity')
  } else if (location.recentReports >= 2) {
    reasons.push('Increasing recent report activity')
  } else if (location.recentReports === 1) {
    reasons.push('Recent citizen activity detected')
  } else {
    reasons.push('No reports in the last 24 hours')
  }

  if (highSeverityReports >= 2) {
    reasons.push('Multiple high-severity reports')
  } else if (highSeverityReports === 1) {
    reasons.push('A high-severity report is present')
  } else if (location.totalReports > 0) {
    reasons.push('Reports are mostly lower severity')
  }

  if (location.totalReports >= 2) {
    reasons.push('Reports are concentrated in this location')
  } else {
    reasons.push('Limited report frequency in this location')
  }

  if (categoryConcentration >= 0.6 && location.recentReports >= 2) {
    reasons.push('Waste reports are concentrated in one category')
  } else if (location.totalReports > 0) {
    reasons.push('Reports span multiple waste categories')
  }

  return reasons
}

// Demo risk model. This will later be replaced by the XGBoost prediction service.
export function calculateHotspotRisk(location = EMPTY_LOCATION) {
  const recentActivityScore = Math.min(30, (location.recentReports || 0) * 6)
  const severityScore = getSeverityScore(location)
  const concentrationScore = Math.min(25, Math.max(0, (location.recentReports || 0) - 1) * 5)
  const categoryPatternScore = getCategoryScore(location)
  const score = Math.max(0, Math.min(100, Math.round(
    recentActivityScore + severityScore + concentrationScore + categoryPatternScore,
  )))

  return {
    score,
    status: getRiskStatus(score),
    reasons: getReasons(location),
  }
}