const colors = {
  critical: 'bg-red-500 text-white',
  high:     'bg-orange-500 text-white',
  medium:   'bg-yellow-500 text-white',
  low:      'bg-green-500 text-white',
}

export default function SeverityBadge({ type, count }) {
  const key = type.toLowerCase()
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold ${colors[key]}`}>
      {count}
    </span>
  )
}