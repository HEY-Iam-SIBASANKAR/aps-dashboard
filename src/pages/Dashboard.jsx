
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/Sidebar'
import SeverityBadge from '../components/SeverityBadge'
import StatusChip from '../components/StatusChip'
import { orgStats, severityStats, scans } from '../data/mockData'
import { Search, Filter, Columns, Plus, RefreshCw } from 'lucide-react'

const severityIcons = {
  Critical: '🚫',
  High:     '⚠️',
  Medium:   '⚠️',
  Low:      '🔍',
}

export default function Dashboard() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  const filtered = scans.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  )

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f5f5f5]'}`}>
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <div className={`flex items-center justify-between px-6 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2 text-sm">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Scan</span>
            <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>/</span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Private Assets</span>
            <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>/</span>
            <span className="text-[#0CC8A8] font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => showToast('Report exported!')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition
              ${isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              Export Report
            </button>
            <button onClick={() => showToast('Scan stopped!')}
              className="px-4 py-1.5 rounded-lg text-sm font-medium border border-red-500/50 text-red-400 hover:bg-red-500/10 transition">
              Stop Scan
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Org Stats Bar */}
          <div className={`flex flex-wrap items-center gap-4 px-5 py-3 rounded-xl border text-sm
            ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
            {[
              { label: 'Org', value: orgStats.org },
              { label: 'Owner', value: orgStats.owner },
              { label: 'Total Scans', value: orgStats.totalScans },
              { label: 'Scheduled', value: orgStats.scheduled },
              { label: 'Rescans', value: orgStats.rescans },
              { label: 'Failed Scans', value: orgStats.failedScans },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-2 ${i !== 0 ? `border-l pl-4 ${isDark ? 'border-white/10' : 'border-gray-200'}` : ''}`}>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{item.label}:</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
              </div>
            ))}
            <div className={`ml-auto flex items-center gap-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <RefreshCw size={12} />
              {orgStats.lastUpdated}
            </div>
          </div>

          {/* Severity Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {severityStats.map((s) => (
              <div key={s.label}
                className={`px-5 py-4 rounded-xl border ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.label} Severity</span>
                  <span className="text-lg">{severityIcons[s.label]}</span>
                </div>
                <div className="flex items-end gap-3">
                  <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.count}</span>
                  <span className={`text-xs mb-1 ${s.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                    {s.trend === 'up' ? '↑' : '↓'} {s.change} {s.trend === 'up' ? 'increase' : 'decrease'} than yesterday
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Scan Table */}
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>

            {/* Table Toolbar */}
            <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <div className={`flex items-center gap-2 flex-1 max-w-sm px-3 py-2 rounded-lg border text-sm
                ${isDark ? 'bg-[#0f0f0f] border-white/10 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                <Search size={14} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search scans by name or type..."
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
              <button onClick={() => showToast('Filters coming soon!')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition
                ${isDark ? 'border-white/10 text-gray-400 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}>
                <Filter size={14} /> Filter
              </button>
              <button onClick={() => showToast('Column settings coming soon!')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition
                ${isDark ? 'border-white/10 text-gray-400 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}>
                <Columns size={14} /> Column
              </button>
              <button onClick={() => navigate('/scan/1')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0CC8A8] hover:bg-[#0ab598] text-white text-sm font-medium transition">
                <Plus size={14} /> New scan
              </button>
            </div>

            {/* Table Header */}
            <div className={`grid grid-cols-6 px-4 py-2 text-xs font-medium uppercase tracking-wider
              ${isDark ? 'text-gray-500 border-b border-white/10' : 'text-gray-400 border-b border-gray-200'}`}>
              <span>Scan Name</span>
              <span>Type</span>
              <span>Status</span>
              <span>Progress</span>
              <span>Vulnerability</span>
              <span>Last Scan</span>
            </div>

            {/* Table Rows */}
            {filtered.map((scan) => (
              <div key={scan.id}
                onClick={() => navigate(`/scan/${scan.id}`)}
                className={`grid grid-cols-6 px-4 py-3 items-center cursor-pointer border-b transition
                  ${isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{scan.name}</span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{scan.type}</span>
                <span><StatusChip status={scan.status} /></span>
                <div className="flex items-center gap-2">
                  <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full ${scan.status === 'Failed' ? 'bg-red-500' : 'bg-[#0CC8A8]'}`}
                      style={{ width: `${scan.progress}%` }}
                    />
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{scan.progress}%</span>
                </div>
                <div className="flex items-center gap-1">
                  {scan.vuln.critical > 0 && <SeverityBadge type="critical" count={scan.vuln.critical} />}
                  {scan.vuln.high     > 0 && <SeverityBadge type="high"     count={scan.vuln.high} />}
                  {scan.vuln.medium   > 0 && <SeverityBadge type="medium"   count={scan.vuln.medium} />}
                  {scan.vuln.low      > 0 && <SeverityBadge type="low"      count={scan.vuln.low} />}
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{scan.lastScan}</span>
              </div>
            ))}

            {/* Footer */}
            <div className={`flex items-center justify-between px-4 py-3 text-xs
              ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <span>Showing {filtered.length} of {scans.length} Scans</span>
              <div className="flex items-center gap-2">
                <button className={`px-2 py-1 rounded border transition
                  ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-100'}`}>←</button>
                <button className={`px-2 py-1 rounded border transition
                  ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-100'}`}>→</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#0CC8A8] text-white px-4 py-2 rounded-xl text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}