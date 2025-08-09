
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="header-bar">Your Credit Score</div>
      <div className="grid grid-cols-12 gap-6 mt-4">
        <div className="col-span-12 lg:col-span-6 card p-6">
          <div className="text-5xl font-bold text-center">—</div>
          <div className="text-center text-sm text-gray-500 mt-2">No score yet — upload a credit file.</div>
          <div className="mt-6 text-center">
            <Link className="btn-primary" href="/credit-report">View Breakdown</Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 grid grid-cols-3 gap-6">
          {['Equifax','illion','Experian'].map((b) => (
            <div key={b} className="tile">{b}<div className="text-4xl mt-4">—</div></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {['Disputes','Defaults','Judgements'].map((x)=>(
          <div key={x} className="card p-6 flex items-center justify-between">
            <div className="text-xl font-semibold">{x}</div>
            <div className="text-3xl font-bold">0</div>
          </div>
        ))}
      </div>
    </div>
  )
}
