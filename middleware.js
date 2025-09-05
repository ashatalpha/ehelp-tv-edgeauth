import { NextResponse, type NextRequest } from 'next/server'

/**
 * Protect only real pages; skip Next internals, static assets, and API routes.
 * Adjust the matcher at the bottom if you want APIs protected too.
 */
export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url)

  // Public paths (redundant with matcher, but extra-safe)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/api/') // let API routes pass by default
  ) {
    return NextResponse.next()
  }

  // Read credentials from env. If not set, do NOT block the site.
  // (Prevents lockout during setup.)
  const USER = process.env.SITE_USER
  const PASS = process.env.SITE_PASS
  if (!USER || !PASS) {
    return NextResponse.next()
  }

  // Expect "Authorization: Basic base64(username:password)"
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="ehelp.tv"' },
    })
  }

  // Decode base64 using Web API atob (Edge-safe)
  // No URL-safe replacements; Basic uses standard base64.
  let decoded = ''
  try {
    const base64 = authHeader.slice(6).trim()
    decoded = atob(base64) // throws if invalid
  } catch {
    return new Response('Invalid Authorization header', { status: 400 })
  }

  const sep = decoded.indexOf(':')
  const user = sep >= 0 ? decoded.slice(0, sep) : ''
  const pass = sep >= 0 ? decoded.slice(sep + 1) : ''

  if (user === USER && pass === PASS) {
    return NextResponse.next()
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="ehelp.tv"' },
  })
}

/**
 * Match everything EXCEPT:
 *  - Next internals: _next/static, _next/image
 *  - common assets: favicon, robots, sitemap
 *  - api routes (remove `api/` below if you also want to protect APIs)
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml|api/).*)',
  ],
}
