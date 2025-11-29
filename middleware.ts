import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ALLOW STATIC ASSETS
  const STATIC_PATHS = [
    '/_next/',        // next build assets
    '/static/',       // public/static
    '/favicon',       // favicon.ico or variants
    '/icons/',        // icons folder
    '/images/',       // images folder
    '/assets/',       // any assets folder
    '/fonts/',        // fonts
  ];

  // skip static fully
  if (STATIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow files with extensions (.js, .css, .png, .jpg, .svg etc)
  if (pathname.match(/\.[a-zA-Z0-9]+$/)) {
    return NextResponse.next();
  }

  // ALLOW HOME PAGE
  if (pathname === '/') {
    return NextResponse.next();
  }

  // EVERYTHING ELSE → redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}
