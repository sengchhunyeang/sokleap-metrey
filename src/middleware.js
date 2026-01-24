import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login');
  const isApiAuth = req.nextUrl.pathname.startsWith('/api/auth');
  const isRegister = req.nextUrl.pathname.startsWith('/api/register');
  const isApiDocs = req.nextUrl.pathname.startsWith('/api-docs') || req.nextUrl.pathname.startsWith('/api/docs');

  // Allow auth API routes, registration, and API docs
  if (isApiAuth || isRegister || isApiDocs) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from login page
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Redirect non-logged-in users to login page
  if (!isAuthPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo|.*\\.png$|.*\\.svg$).*)'],
};
