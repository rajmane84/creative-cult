import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes
const publicRoutes = ['/login', '/signup', '/'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if this is a public route
  const isPublicRoute = publicRoutes.some((path) => pathname.startsWith(path));

  // For public routes, allow access (but redirect authenticated users to dashboard)
  if (isPublicRoute) {
    const sessionCookie =
      request.cookies.get('better-auth.session_token') ||
      request.cookies.get('__Secure-better-auth.session_token');
    console.log('session cookie', sessionCookie);

    // If user is authenticated and trying to access login/signup, redirect to home
    // This is an optimistic check - the actual role-based redirect happens on the page
    if (
      sessionCookie &&
      (pathname.startsWith('/login') || pathname.startsWith('/signup'))
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  // For protected routes, check if user has a session cookie
  const sessionCookie =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token');

  if (!sessionCookie) {
    // No session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // User has a session cookie - let them through to the page
  // The page will do server-side session verification and role checks
  // This avoids database calls in the proxy while still providing security
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
