import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Set language header based on path
  const response = NextResponse.next()

  if (pathname.startsWith("/zh")) {
    response.headers.set("x-lang", "zh")
  } else {
    response.headers.set("x-lang", "en")
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - static files
     * - _next (Next.js internals)
     * - favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
