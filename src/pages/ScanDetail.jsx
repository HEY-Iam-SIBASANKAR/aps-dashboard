import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import Sidebar from '../components/Sidebar'
import { scanDetail } from '../data/mockData'
import { X, ChevronDown } from 'lucide-react'

const severityColors = {
  Critical: 'bg-red-500/10 text-red-400 border border-red-500/30',
  High:     'bg-orange-500/10 text-orange-400 border border-orange-500/30',
  Medium:   'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
  Low:      'bg-green-500/10 text-green-400 border border-green-500/30',
}

export default function ScanDetail() {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('Activity Log')
  const [toast, setToast] = useState('')
  const [consoleOpen, setConsoleOpen] = useState(true)
  const d = scanDetail

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f5f5f5]'}`}>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <div className={`flex items-center justify-between px-6 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2 text-sm">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Scan</span>
            <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>/</span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Private Assets</span>
            <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>/</span>
            <span className="text-[#0CC8A8] font-medium">New Scan</span>
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

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* Progress + Steps */}
          <div className={`rounded-xl border p-5 ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-8">

              {/* Circle Progress */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none"
                    stroke={isDark ? '#ffffff15' : '#e5e7eb'} strokeWidth="8" />
                  <circle cx="48" cy="48" r="40" fill="none"
                    stroke="#0CC8A8" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - d.progress / 100)}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{d.progress}%</span>
                  <span className="text-xs text-gray-500">{d.status}</span>
                </div>
              </div>

              {/* Steps */}
              <div className="flex-1">
                <div className="flex items-center justify-between relative">
                  {/* Line */}
                  <div className={`absolute top-4 left-0 right-0 h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                  {d.steps.map((step, i) => (
                    <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition
                        ${i === d.activeStep
                          ? 'bg-[#0CC8A8] border-[#0CC8A8] text-white'
                          : i < d.activeStep
                            ? 'bg-[#0CC8A8]/20 border-[#0CC8A8] text-[#0CC8A8]'
                            : isDark ? 'bg-[#1a1a1a] border-white/20 text-gray-500' : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                        {i + 1}
                      </div>
                      <span className={`text-xs font-medium ${i === d.activeStep ? 'text-[#0CC8A8]' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metadata Row */}
            <div className={`grid grid-cols-6 gap-4 mt-6 pt-5 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              {[
                { label: 'Scan Type',    value: d.type },
                { label: 'Targets',      value: d.target },
                { label: 'Started At',   value: d.startedAt },
                { label: 'Credentials',  value: d.credentials },
                { label: 'Files',        value: d.files },
                { label: 'Checklists',   value: d.checklists, accent: true },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className={`text-sm font-medium ${item.accent ? 'text-[#0CC8A8]' : isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Console + Finding Log */}
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>

            {/* Console Header */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0CC8A8] animate-pulse" />
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Live Scan Console</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                  Running...
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setConsoleOpen(!consoleOpen)}>
                  <ChevronDown size={16} className={`text-gray-400 transition ${consoleOpen ? '' : 'rotate-180'}`} />
                </button>
                <button onClick={() => showToast('Console closed')}>
                  <X size={16} className="text-gray-400 hover:text-gray-300" />
                </button>
              </div>
            </div>

            {consoleOpen && (
              <div className="flex divide-x divide-white/10">

                {/* Activity Log Panel */}
                <div className="flex-1 flex flex-col">
                  {/* Tabs */}
                  <div className={`flex border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    {['Activity Log', 'Verification Loops'].map(tab => (
                      <button key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition
                          ${activeTab === tab
                            ? 'border-[#0CC8A8] text-[#0CC8A8]'
                            : `border-transparent ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`
                          }`}>
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Log Output */}
                  <div className={`p-4 font-mono text-xs space-y-3 h-72 overflow-y-auto
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {activeTab === 'Activity Log' ? (
                      d.activityLog.map((log, i) => (
                        <div key={i} className="leading-relaxed">
                          <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>[{log.time}]</span>{' '}
                          {log.highlight ? (
                            <>{log.text}<span className="text-[#0CC8A8]">{log.highlight}</span>{log.after}</>
                          ) : log.code ? (
                            <>{log.text}<span className="text-yellow-400 bg-yellow-400/10 px-1 rounded">{log.code}</span>
                            {log.after && log.after}
                            {log.path && <span className="text-[#0CC8A8] bg-[#0CC8A8]/10 px-1 rounded ml-1">{log.path}</span>}
                            {log.end && log.end}</>
                          ) : log.header ? (
                            <>{log.text}<span className="text-[#0CC8A8] bg-[#0CC8A8]/10 px-1 rounded">{log.header}</span>
                            {log.after}<span className="text-red-400 font-bold">{log.bold}</span>{log.end}</>
                          ) : (
                            <span style={{ whiteSpace: 'pre-line' }}>{log.text}</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-center mt-8">No verification loops running</div>
                    )}
                  </div>
                </div>

                {/* Finding Log Panel */}
                <div className="w-80 flex flex-col">
                  <div className={`px-4 py-2.5 border-b text-sm font-medium
                    ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}>
                    Finding Log
                  </div>
                  <div className="p-3 space-y-3 h-80 overflow-y-auto">
                    {d.findings.map((f, i) => (
                      <div key={i} className={`p-3 rounded-xl border ${isDark ? 'bg-[#0f0f0f] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${severityColors[f.severity]}`}>
                            {f.severity}
                          </span>
                          <span className="text-xs text-gray-500">{f.time}</span>
                        </div>
                        <p className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{f.title}</p>
                        <p className="text-xs text-[#0CC8A8] mb-2">{f.endpoint}</p>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Status Bar */}
            <div className={`flex items-center gap-6 px-4 py-2 border-t text-xs
              ${isDark ? 'border-white/10 bg-[#0d0d0d]' : 'border-gray-200 bg-gray-50'}`}>
              {[
                { label: 'Sub-Agents',          value: d.bottomStats.subAgents },
                { label: 'Parallel Executions', value: d.bottomStats.parallelExecutions },
                { label: 'Operations',          value: d.bottomStats.operations },
              ].map(item => (
                <span key={item.label} className="text-gray-500">
                  ● {item.label}: <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.value}</span>
                </span>
              ))}
              <div className="ml-auto flex items-center gap-3">
                <span className="text-red-400">Critical: {d.bottomStats.critical}</span>
                <span className="text-orange-400">High: {d.bottomStats.high}</span>
                <span className="text-yellow-400">Medium: {d.bottomStats.medium}</span>
                <span className="text-green-400">Low: {d.bottomStats.low}</span>
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