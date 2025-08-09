
export default function CreditReport() {
  return (
    <div className="space-y-6">
      <div className="header-bar">Credit Report</div>
      <div className="card p-6">
        <div className="border-b mb-4">
          <div className="flex space-x-6">
            {['Overview','Accounts','Defaults','Judgements'].map(t => (
              <button key={t} className="py-2 border-b-2 border-primary text-primary">{t}</button>
            ))}
          </div>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left">
              <tr>
                <th className="py-2 pr-6">Line Item</th>
                <th className="py-2 pr-6">Equifax</th>
                <th className="py-2 pr-6">Illion</th>
                <th className="py-2">Experian</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="py-3 text-gray-500" colSpan={4}>No data yet — upload a credit file.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
