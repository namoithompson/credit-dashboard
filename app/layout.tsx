
import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen flex">
          <aside className="w-64 border-r bg-white">
            <div className="p-6 text-2xl font-bold text-primary">apex</div>
            <nav className="space-y-1 px-3">
              <Link className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="/">Home</Link>
              <Link className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="/credit-report">Credit Report</Link>
              <Link className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="/disputes">Disputes</Link>
              <Link className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="/account">Account Settings</Link>
              <Link className="block px-3 py-2 rounded-lg hover:bg-gray-50" href="/billing">Billing & Payments</Link>
            </nav>
          </aside>
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-96">
                <input className="input pl-10" placeholder="Search here" />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
              <div className="text-sm">🔔 <span className="ml-2">My Account ▾</span></div>
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
