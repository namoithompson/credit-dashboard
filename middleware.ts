import { withAuth } from 'next-auth/middleware'

/**
 * Global authentication middleware.
 *
 * This middleware uses next‑auth's withAuth helper to enforce that
 * requests have a valid session token. It redirects unauthenticated
 * users to the custom login page. The `/setup` and `/api/setup`
 * routes remain public so the initial administrator can be created.
 */
export default withAuth({
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async authorized({ req, token }) {
      const { pathname } = req.nextUrl
      // Allow access to setup and its API without a session
      if (pathname.startsWith('/setup') || pathname.startsWith('/api/setup')) {
        return true
      }
      // Allow NextAuth API routes
      if (pathname.startsWith('/api/auth')) {
        return true
      }
      return !!token
    }
  }
})

/**
 * Configure which routes the middleware runs on. Excludes static assets.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}
