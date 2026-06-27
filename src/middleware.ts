import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // If the request is coming from a vercel.app domain, add a strict X-Robots-Tag
  // This prevents Google from indexing the Vercel staging/deployment URLs,
  // ensuring ONLY the custom domain (e.g., asciiartgenerator.com or sub.alfo.online) is indexed.
  const url = request.nextUrl;

  const NOINDEX_PATTERNS = [
    /^\/api\//,
    /^\/admin\//,
  ];

  if (hostname.includes('vercel.app') || NOINDEX_PATTERNS.some(p => p.test(url.pathname))) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Force HTTPS if not on localhost and protocol is HTTP
  // Forwarded protocol check added for platforms like Vercel
  const forwardedProtocol = request.headers.get('x-forwarded-proto');

  if (
    !hostname.includes('localhost') &&
    (url.protocol === 'http:' || forwardedProtocol === 'http')
  ) {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
