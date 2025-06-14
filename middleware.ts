// help me to write a middleware to redirect all the routes to home page
// my static resources are also getting redirected to home page which I don't want

import { NextResponse } from 'next/server';
export function middleware(request) {
    // Check if the request is for a static resource
    const isStaticResource = request.nextUrl.pathname.startsWith('/_next/') ||
                             request.nextUrl.pathname.startsWith('/static/') ||
                             request.nextUrl.pathname.startsWith('/favicon.ico') ||
                             request.nextUrl.pathname.startsWith('/api/');

// check for home page also
    const isHomePage = request.nextUrl.pathname === '/';
    
    // If it's not a static resource, redirect to the home page
    if (!isStaticResource && !isHomePage) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    // If it is a static resource, allow the request to continue
    return NextResponse.next();
}