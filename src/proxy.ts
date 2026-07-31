import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { verifyRegistrationToken, RegistrationStep } from '@/features/auth/lib/registeration-token';

const intlMiddleware = createMiddleware(routing);

const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
const PROTECTED_ROUTES: string[] = [];

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
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  const { pathname, search } = req.nextUrl;

  const locale = getLocale(pathname);
  const bare = stripLocale(pathname);

  const isAuthRoute = AUTH_ROUTES.some((r) => bare === r || bare.startsWith(r + '/'));
  const isProtectedRoute = PROTECTED_ROUTES.some((r) => bare === r || bare.startsWith(r + '/'));

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  if (!isLoggedIn && isProtectedRoute) {
    const returnUrl = encodeURIComponent(pathname + search);
    return NextResponse.redirect(new URL(`/${locale}/login?returnUrl=${returnUrl}`, req.url));
  }

  // --- Registration step gating ---

  if (bare === '/register' || bare.startsWith('/register/')) {
    const segments = bare.split('/').filter(Boolean);
    const requestedStep = segments[1];

    const regCookie = req.cookies.get('reg_progress')?.value;
    const payload = regCookie ? await verifyRegistrationToken(regCookie) : null;

    if (!requestedStep) {
      return intlMiddleware(req);
    }

    if (!payload || payload.step === 'done') {
      return NextResponse.redirect(new URL(`/${locale}/register`, req.url));
    }

    if (requestedStep !== payload.step) {
      console.log(`Redirecting to correct registration step: ${payload.step}`);
      return NextResponse.redirect(new URL(`/${locale}/register/${payload.step}`, req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
