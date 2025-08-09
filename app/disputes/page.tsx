
export default function Disputes() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="card p-12 bg-amber-400/80 text-white text-center text-2xl font-semibold">Current</div>
        <div className="card p-12 bg-emerald-400/80 text-white text-center text-2xl font-semibold">Completed</div>
      </div>
      <div className="card p-6">
        <table className="w-full text-sm">
          <thead><tr><th className="text-left py-2">Date</th><th className="text-left">Company</th><th className="text-left">Ref #</th><th className="text-left">Value (AUD)</th></tr></thead>
          <tbody><tr><td className="py-3 text-gray-500" colSpan={4}>No disputes yet.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
