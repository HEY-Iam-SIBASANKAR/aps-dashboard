import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Eye, EyeOff, Sun, Moon, Shield, Zap, FileText } from 'lucide-react'

export default function Login() {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', agreed: false
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#0f0f0f]' : 'bg-gray-100'}`}>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        {isDark ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-gray-800" />}
      </button>

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)' }}
      >
        {/* Gradient blobs */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 rounded-full bg-[#0CC8A8] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <span className="text-white text-xl font-semibold">aps</span>
          </div>

          {/* Tagline */}
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Expert level Cybersecurity{' '}
            <span className="text-[#0CC8A8]">in hours</span>{' '}
            not weeks.
          </h1>

          {/* Features */}
          <p className="text-gray-400 mb-8 text-sm font-medium uppercase tracking-wider">
            What's included
          </p>
          <ul className="space-y-4">
            {[
              { icon: <Zap size={16} />, text: 'Effortlessly spider and map targets to uncover hidden security flaws' },
              { icon: <Shield size={16} />, text: 'Deliver high-quality, validated findings in hours, not weeks.' },
              { icon: <FileText size={16} />, text: 'Generate professional, enterprise-grade security reports automatically.' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-[#0CC8A8] mt-0.5">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Trustpilot */}
        <div className="relative z-10">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-green-400 text-sm">★</span>
            <span className="text-gray-400 text-sm">Trustpilot</span>
          </div>
          <p className="text-white font-semibold">
            Rated 4.5/5.0{' '}
            <span className="text-gray-400 font-normal text-sm">(100k+ reviews)</span>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8`}>
        <div className={`w-full max-w-md rounded-2xl p-8 shadow-2xl ${isDark ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white border border-gray-200'}`}>

          <h2 className={`text-2xl font-bold text-center mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Sign up
          </h2>
          <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Already have an account?{' '}
            <span className="text-[#0CC8A8] cursor-pointer hover:underline">Log in</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Row */}
            <div className="flex gap-3">
              <input
                name="firstName"
                placeholder="First name*"
                value={form.firstName}
                onChange={handleChange}
                required
                className={`w-1/2 px-4 py-3 rounded-xl text-sm outline-none border transition
                  ${isDark
                    ? 'bg-[#0f0f0f] border-white/10 text-white placeholder-gray-500 focus:border-[#0CC8A8]'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#0CC8A8]'
                  }`}
              />
              <input
                name="lastName"
                placeholder="Last name*"
                value={form.lastName}
                onChange={handleChange}
                required
                className={`w-1/2 px-4 py-3 rounded-xl text-sm outline-none border transition
                  ${isDark
                    ? 'bg-[#0f0f0f] border-white/10 text-white placeholder-gray-500 focus:border-[#0CC8A8]'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#0CC8A8]'
                  }`}
              />
            </div>

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email address*"
              value={form.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none border transition
                ${isDark
                  ? 'bg-[#0f0f0f] border-white/10 text-white placeholder-gray-500 focus:border-[#0CC8A8]'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#0CC8A8]'
                }`}
            />

            {/* Password */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (8+ characters)*"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none border transition pr-12
                  ${isDark
                    ? 'bg-[#0f0f0f] border-white/10 text-white placeholder-gray-500 focus:border-[#0CC8A8]'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#0CC8A8]'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreed"
                checked={form.agreed}
                onChange={handleChange}
                required
                className="mt-1 accent-[#0CC8A8]"
              />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                I agree to Aps's{' '}
                <span className="text-[#0CC8A8] hover:underline cursor-pointer">Terms & Conditions</span>
                {' '}and acknowledge the{' '}
                <span className="text-[#0CC8A8] hover:underline cursor-pointer">Privacy Policy</span>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0CC8A8] hover:bg-[#0ab598] text-white font-semibold text-sm transition"
            >
              Create account
            </button>

            {/* Social Logins */}
            <div className="flex gap-3 mt-2">
              {/* Apple */}
              <button type="button" className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </button>

              {/* Google */}
              <button type="button" className={`flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition border
                ${isDark ? 'bg-white text-gray-800 border-gray-200 hover:bg-gray-100' : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'}`}>
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>

              {/* Meta */}
              <button type="button" className="flex-1 py-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-medium flex items-center justify-center gap-2 transition">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}