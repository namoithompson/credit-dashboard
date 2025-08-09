
'use client'
import { useState } from 'react'

export default function Setup() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin1234')
  const [message, setMessage] = useState('')

  async function createAdmin() {
    const res = await fetch('/api/setup', { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' } })
    const j = await res.json()
    setMessage(res.ok ? 'Admin created' : (j.error || 'Error'))
  }

  return (
    <div className="max-w-md space-y-3">
      <div className="header-bar">Initial Admin</div>
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn-primary" onClick={createAdmin}>Create Admin</button>
      <div>{message}</div>
    </div>
  )
}
