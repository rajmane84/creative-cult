import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to auth pages
  const publicPaths = ['/login', '/signup', '/'];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Allow static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // For public paths, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // For protected paths, check if user has a session
  const sessionCookie = request.cookies.get('better-auth.session_token');

  if (!sessionCookie) {
    // No session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // User has a session, let them through
  // The role check will be done on the page level using the auth client
  // This is because we need to fetch the session data to check the role
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
