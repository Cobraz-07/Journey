import { defineMiddleware } from "astro:middleware";
import { getAdminAuth } from "./firebase/server";

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;

    // Skip auth verification for API routes
    if (pathname.startsWith("/api/")) {
        return next();
    }

    // Try to verify the session cookie
    const sessionCookie = context.cookies.get("__session")?.value;
    let user: { email: string | null; uid: string } | null = null;

    if (sessionCookie) {
        try {
            const adminAuth = await getAdminAuth();
            const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
            user = {
                email: decodedClaims.email ?? null,
                uid: decodedClaims.uid,
            };
        } catch {
            // Invalid or expired cookie — clear it
            context.cookies.delete("__session", { path: "/" });
        }
    }

    // Protect authenticated routes
    if (!user && pathname.startsWith("/authenticated") && context.request.method === "GET") {
        return context.redirect("/register");
    }

    // Redirect authenticated users away from public auth pages
    if (user && (pathname === "/signin" || pathname === "/register" || pathname === "/")) {
        return context.redirect("/authenticated/");
    }

    // Set verified user info in locals
    context.locals.userEmail = user?.email ?? null;
    context.locals.uid = user?.uid ?? null;

    return next();
});
