const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const severityMap = {
  mixed: 'High',
  plastic: 'High',
  organic: 'Medium',
  construction: 'Medium',
  'e-waste': 'High',
  other: 'Medium',
}

const locationSignals = {
  'Beach Zone 04': ['Wind drift', 'High tourist footfall', 'Limited bin access'],
  'Market Area 02': ['Vendor activity', 'Overflowing waste bins', 'Peak-hour traffic'],
  'Railway Station Zone 01': ['Passenger movement', 'Temporary collection pressure', 'Transit spillover'],
  'Residential Block 07': ['Household waste accumulation', 'Low bin visibility', 'Weekend overflow'],
  'Drainage Zone 03': ['Blocked runoff channels', 'Plastic debris', 'Stormwater pressure'],
  'Event Zone 01': ['Event crowding', 'Temporary litter hotspots', 'Short-term cleanup gaps'],
}

const categorySignals = {
  'Mixed Waste': ['Multiple waste streams observed', 'Mixed material clustering', 'Collection complexity'],
  Plastic: ['Plastic fragments detected', 'Dense litter accumulation', 'Low segregation visible'],
  'Organic Waste': ['Food and compostable material', 'Odour risk', 'Potential attraction for pests'],
  'Construction Waste': ['Hard debris and fragments', 'Accumulated build material', 'Safety hazard sign'],
  'E-Waste': ['Electronic components or small devices', 'Improper disposal pattern', 'Potential hazardous material'],
  Other: ['Unclassified litter cluster', 'Mixed debris pattern', 'Further review recommended'],
}

export async function analyzeWasteReport(report) {
  await delay(1400)

  const categoryKey = report.category || 'Mixed Waste'
  const locationKey = report.location || 'Beach Zone 04'

  const category = categoryKey
  const locationSignalsForArea = locationSignals[locationKey] || ['Local accumulation', 'Inconsistent bin coverage']
  const categorySignalsForWaste = categorySignals[category] || categorySignals['Other']
  const severity = severityMap[category.toLowerCase()] || 'Medium'
  const confidence = 0.84 + Math.random() * 0.12
  const confidenceLabel = Math.round(confidence * 100)

  const explanation = `Demo / simulated AI review indicates ${category.toLowerCase()} in ${locationKey}. The report shows localized accumulation patterns consistent with current civic conditions and contributing factors such as crowd movement, limited bin access, and material-specific disposal patterns.`

  return {
    wasteType: category,
    severity,
    confidence: Number(confidence.toFixed(2)),
    confidenceLabel,
    explanation,
    contributingSignals: [...new Set([...categorySignalsForWaste, ...locationSignalsForArea])].slice(0, 4),
    demoNote: 'Demo / simulated AI output for frontend MVP only.',
  }
}
