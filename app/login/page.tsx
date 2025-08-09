/* eslint-disable @next/next/no-async-client-component */
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

/**
 * Login page.
 *
 * Presents a simple email/password form and authenticates against the
 * credentials provider configured in lib/serverAuth.ts. On success the
 * user is redirected to the home page. Validation errors are displayed
 * inline.
 */
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    // Use the credentials provider. redirect:false tells next‑auth
    // not to navigate automatically so we can handle errors.
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })
    if (res?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md card p-6 space-y-4">
        <h1 className="text-2xl font-bold">Sign in</h1>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div>
          <label className="label">Email</label>
          <input
            className="input w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            className="input w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Sign in
        </button>
      </form>
    </div>
  )
}
