import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"

const ADMIN_EMAIL = "dravishakatoch6@gmail.com"

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session) {
      // Auth Required, redirect to sign-in page
      const signInUrl = new URL("/admin/login", req.url)
      signInUrl.searchParams.set("next", req.nextUrl.pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Check if user is an admin
    const isAdmin = session?.user?.email === ADMIN_EMAIL

    if (!isAdmin) {
      // Not an admin, redirect to home page
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/games/:path*", "/profile/:path*"],
}
