import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import {
  LayoutDashboard, FolderOpen, ScanLine, Calendar,
  Bell, Settings, HelpCircle, Sun, Moon, ChevronRight
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',     icon: <LayoutDashboard size={18} />, path: '/dashboard' },
  { label: 'Projects',      icon: <FolderOpen size={18} />,      path: '/projects' },
  { label: 'Scans',         icon: <ScanLine size={18} />,        path: '/scans' },
  { label: 'Schedule',      icon: <Calendar size={18} />,        path: '/schedule' },
  { label: 'Notifications', icon: <Bell size={18} />,            path: '/notifications' },
  { label: 'Settings',      icon: <Settings size={18} />,        path: '/settings' },
  { label: 'Support',       icon: <HelpCircle size={18} />,      path: '/support' },
]

export default function Sidebar() {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className={`w-56 min-h-screen flex flex-col justify-between py-6 px-3 border-r
      ${isDark ? 'bg-[#111111] border-white/10' : 'bg-white border-gray-200'}`}
    >
      {/* Top — Logo + Nav */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 mb-8">
          <div className="w-7 h-7 rounded-full bg-[#0CC8A8] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            aps
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/dashboard' && location.pathname.startsWith('/scan'))
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition w-full text-left
                  ${isActive
                    ? 'bg-[#0CC8A8]/10 text-[#0CC8A8]'
                    : isDark
                      ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom — Theme Toggle + User */}
      <div className="flex flex-col gap-3 px-1">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition w-full
            ${isDark ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Divider */}
        <div className={`h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />

        {/* User Profile */}
        <div className={`flex items-center gap-3 px-2 py-2 rounded-xl cursor-pointer transition
          ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
              admin@edu.com
            </p>
            <p className="text-xs text-gray-500">Security Lead</p>
          </div>
          <ChevronRight size={14} className="text-gray-500" />
        </div>
      </div>
    </aside>
  )
}