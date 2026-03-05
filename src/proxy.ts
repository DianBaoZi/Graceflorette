import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // If Supabase env vars missing, just allow through to login
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (request.nextUrl.pathname !== "/grace-admin/login") {
      return NextResponse.redirect(new URL("/grace-admin/login", request.url));
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
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

  // Allow access to login page without authentication
  if (request.nextUrl.pathname === "/grace-admin/login") {
    if (user) {
      const { data: adminUser } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (adminUser) {
        return NextResponse.redirect(new URL("/grace-admin", request.url));
      }
    }
    return supabaseResponse;
  }

  // For all other admin routes, require authentication
  if (!user) {
    return NextResponse.redirect(new URL("/grace-admin/login", request.url));
  }

  // Check if user is in admin_users table
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!adminUser) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/grace-admin/login", request.url));
  }

  return supabaseResponse;
  } catch {
    // On any auth error, redirect to login rather than crashing
    return NextResponse.redirect(new URL("/grace-admin/login", request.url));
  }
}

export const config = {
  matcher: ["/grace-admin/:path*"],
};
