import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
const PROTECTED_ROUTES = ['/'];

type Locale = (typeof routing.locales)[number];

function getLocale(pathname: string): string {
  const segment = pathname.split('/')[1];
  return routing.locales.includes(segment as Locale) ? segment : routing.defaultLocale;
}

function stripLocale(pathname: string): string {
  const segment = pathname.split('/')[1];
  if (routing.locales.includes(segment as Locale)) {
    return pathname.slice(segment.length + 1) || '/';
  }
  return pathname;
}

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const { pathname, search } = req.nextUrl;

  const locale = getLocale(pathname);
  const bare = stripLocale(pathname);

  const isAuthRoute = AUTH_ROUTES.some((r) => bare === r || bare.startsWith(r + '/'));
  const isProtectedRoute = PROTECTED_ROUTES.some((r) => bare === r || bare.startsWith(r + '/'));

  // Logged-in user → redirect away from auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // Guest → redirect away from protected routes, preserve returnUrl
  if (!isLoggedIn && isProtectedRoute) {
    const returnUrl = encodeURIComponent(pathname + search);
    return NextResponse.redirect(
      new URL(`/${locale}/login?returnUrl=${returnUrl}`, req.url)
    );
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api/auth|_next|_vercel|.*\\..*).*)',
};