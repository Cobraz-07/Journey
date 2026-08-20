import { defineMiddleware } from "astro:middleware";
import { getAdminAuth } from "./firebase/server";

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;

    // Only skip auth for the session endpoint (it handles its own token verification)
    if (pathname === "/api/session") {
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

    // Protect all authenticated routes regardless of HTTP method
    if (!user && pathname.startsWith("/authenticated")) {
        if (context.request.method === "GET") {
            return context.redirect("/signin");
        }
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Redirect authenticated users away from public landing & auth pages
    if (user && (pathname === "/signin" || pathname === "/register" || pathname === "/")) {
        return context.redirect("/authenticated/trips");
    }

    // Set verified user info in locals
    context.locals.userEmail = user?.email ?? null;
    context.locals.uid = user?.uid ?? null;

    return next();
});
