import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import HotspotDetails from './pages/HotspotDetails'
import ReportResult from './pages/ReportResult'
import ReportWaste from './pages/ReportWaste'
import WhatIfSimulator from './pages/WhatIfSimulator'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportWaste />} />
          <Route path="/report/result" element={<ReportResult />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hotspot/:id" element={<HotspotDetails />} />
          <Route path="/simulator" element={<WhatIfSimulator />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
