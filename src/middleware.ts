import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';
  const authRoute = request.nextUrl.pathname.includes('/auth');

  if (!authRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  } else {
    // eslint-disable-next-line
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
