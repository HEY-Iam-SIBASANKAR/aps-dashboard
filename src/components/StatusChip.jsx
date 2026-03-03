const styles = {
  Completed: 'bg-green-500/10 text-green-400 border border-green-500/20',
  Scheduled: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
  Failed:    'bg-red-500/10 text-red-400 border border-red-500/20',
}

export default function StatusChip({ status }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}