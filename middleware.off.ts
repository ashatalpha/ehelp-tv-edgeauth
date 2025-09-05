import { NextResponse, type NextRequest } from 'next/server'

// Match only real pages; skip Next internals, static assets, and API routes.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml|api/).*)',
  ],
};

export default function middleware(req: NextRequest) {
  // Allow preflight/HEAD without auth to avoid odd client failures
  const method = req.method.toUpperCase();
  if (method === 'OPTIONS' || method === 'HEAD') {
    return NextResponse.next();
  }

  const url = new URL(req.url);
  const pathname = url.pathname;

  // Extra allowlist (redundant with matcher; ultra-safe)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next();
  }

  // If creds are not set, do not block the site (prevents lockouts)
  const USER = process.env.SITE_USER;
  const PASS = process.env.SITE_PASS;
  if (!USER || !PASS) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="ehelp.tv"' },
    });
  }

  // Edge-safe base64 decode without throwing
  const b64 = authHeader.slice(6).trim();
  let decoded = '';
  try {
    // atob is available in Edge runtime; if it fails, bail cleanly
    decoded = atob(b64);
  } catch {
    return new Response('Invalid Authorization header', { status: 400 });
  }

  const i = decoded.indexOf(':');
  const user = i >= 0 ? decoded.slice(0, i) : '';
  const pass = i >= 0 ? decoded.slice(i + 1) : '';

  if (user === USER && pass === PASS) {
    return NextResponse.next();
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="ehelp.tv"' },
  });
}
