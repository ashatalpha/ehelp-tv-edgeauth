import { NextResponse } from 'next/server'

function isPublicPath(pathname) {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  )
}

function base64Decode(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=')
  return atob(normalized) // Web API available in Edge runtime
}

export function middleware(req) {
  const url = new URL(req.url)
  const pathname = url.pathname

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const USER = process.env.SITE_USER || ''
  const PASS = process.env.SITE_PASS || ''

  // Allow through if creds not set yet (prevents lockout during setup)
  if (!USER || !PASS) {
    return NextResponse.next()
  }

  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="ehelp.tv"' },
    })
  }

  try {
    const decoded = base64Decode(authHeader.slice(6).trim())
    const idx = decoded.indexOf(':')
    const user = idx >= 0 ? decoded.slice(0, idx) : ''
    const pass = idx >= 0 ? decoded.slice(idx + 1) : ''
    if (user !== USER || pass !== PASS) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="ehelp.tv"' },
      })
    }
  } catch {
    return new NextResponse('Invalid Authorization header', { status: 400 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml).*)'],
}
