import NextAuth from 'next-auth'
import { authOptions } from '@/lib/serverAuth'

// NextAuth handler for the app router.
// Exports both GET and POST handlers to support credential sign‑in and JWT session endpoints.
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
