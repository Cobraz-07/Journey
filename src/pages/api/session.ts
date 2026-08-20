import type { APIRoute } from "astro";
import { getAdminAuth } from "@/firebase/server";

const FIVE_DAYS_MS = 60 * 60 * 24 * 5 * 1000;
const FIVE_DAYS_S = 60 * 60 * 24 * 5;

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        let body: { idToken?: string };
        try {
            body = await request.json();
        } catch {
            return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { idToken } = body;
        if (!idToken || typeof idToken !== "string") {
            return new Response(JSON.stringify({ error: "Missing or invalid idToken" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Verify the ID token first
        const adminAuth = await getAdminAuth();
        await adminAuth.verifyIdToken(idToken);

        // Create a session cookie
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn: FIVE_DAYS_MS,
        });

        cookies.set("__session", sessionCookie, {
            path: "/",
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: "lax",
            maxAge: FIVE_DAYS_S,
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Session creation error:", err);
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
};

export const DELETE: APIRoute = async ({ cookies }) => {
    cookies.delete("__session", { path: "/" });
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
