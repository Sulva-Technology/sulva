import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                    // The `setAll` method changes the response object
                    // so we need to recreate the response with the new cookies
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh session if expired
    const { data: { user } } = await supabase.auth.getUser();

    // Check if accessing admin routes
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = request.nextUrl.pathname === '/admin/login';

    if (isAdminRoute) {
        if (!user) {
            if (!isLoginRoute) {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        } else {
            const { data: adminMembership, error: adminError } = await supabase
                .from('admin_users')
                .select('user_id')
                .eq('user_id', user.id)
                .maybeSingle();

            if (adminError) {
                console.error('Admin membership check failed:', adminError);
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }

            if (!adminMembership && !isLoginRoute) {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }

            if (adminMembership && isLoginRoute) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
