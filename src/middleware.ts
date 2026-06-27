import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // If the request is coming from a vercel.app domain, add a strict X-Robots-Tag
  // This prevents Google from indexing the Vercel staging/deployment URLs,
  // ensuring ONLY the custom domain (e.g., asciiartgenerator.com or sub.alfo.online) is indexed.
  const url = request.nextUrl;

  const NOINDEX_PATTERNS = [
    /^\/api\//,
    /^\/admin\//,
  ];

  const url = request.nextUrl;

  if (hostname.includes('vercel.app') || NOINDEX_PATTERNS.some(p => p.test(url.pathname))) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Force HTTPS if not on localhost and protocol is HTTP
  // Forwarded protocol check added for platforms like Vercel
  const forwardedProtocol = request.headers.get('x-forwarded-proto');

  const redirectUrl = request.nextUrl.clone();

  if (
    !hostname.includes('localhost') &&
    (forwardedProtocol === 'http')
  ) {
    redirectUrl.protocol = 'https:';
    return NextResponse.redirect(redirectUrl, 308);
  }

  // URL normalization: lowercase, no trailing slash, remove multiple slashes
  // Exclude explicit file extensions and API routes to protect static assets
  if (!url.pathname.match(/\.[A-Za-z0-9]+$/)) {
    let needsRedirect = false;

    if (url.pathname !== '/' && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.slice(0, -1);
      needsRedirect = true;
    }

    if (/[A-Z]/.test(url.pathname)) {
      url.pathname = url.pathname.toLowerCase();
      needsRedirect = true;
    }

    if (/\/{2,}/.test(url.pathname)) {
      url.pathname = url.pathname.replace(/\/{2,}/g, '/');
      needsRedirect = true;
    }

    if (needsRedirect) {
      return NextResponse.redirect(url, 308); // Permanent redirect
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - og (OG image route)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|og).*)',
  ],
};
