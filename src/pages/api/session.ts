import type { APIRoute } from "astro";
import { getAdminAuth } from "@/firebase/server";

const FIVE_DAYS_MS = 60 * 60 * 24 * 5 * 1000;
const FIVE_DAYS_S = 60 * 60 * 24 * 5;

export const POST: APIRoute = async ({ request, cookies }) => {
    const { idToken } = await request.json();

    try {
        // Verify the ID token first
        await getAdminAuth().verifyIdToken(idToken);

        // Create a session cookie
        const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
            expiresIn: FIVE_DAYS_MS,
        });

        cookies.set("__session", sessionCookie, {
            path: "/",
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: "lax",
            maxAge: FIVE_DAYS_S,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
};

export const DELETE: APIRoute = async ({ cookies }) => {
    cookies.delete("__session", { path: "/" });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
};
