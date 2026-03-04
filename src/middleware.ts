import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/Grace-admin")) {
    // Allow access to login page without authentication
    if (request.nextUrl.pathname === "/Grace-admin/login") {
      // If already logged in, redirect to admin dashboard
      if (user) {
        // Check if user is in admin_users table
        const { data: adminUser } = await supabase
          .from("admin_users")
          .select("id")
          .eq("id", user.id)
          .single();

        if (adminUser) {
          return NextResponse.redirect(new URL("/Grace-admin", request.url));
        }
      }
      return supabaseResponse;
    }

    // For all other admin routes, require authentication
    if (!user) {
      return NextResponse.redirect(new URL("/Grace-admin/login", request.url));
    }

    // Check if user is in admin_users table
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!adminUser) {
      // User exists but not an admin - redirect to login
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/Grace-admin/login", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/Grace-admin/:path*",
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
