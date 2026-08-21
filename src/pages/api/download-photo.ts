import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
    const photoUrl = url.searchParams.get("url");
    const rawFilename = url.searchParams.get("filename") || "journey_photo.webp";

    if (!photoUrl) {
        return new Response(JSON.stringify({ error: "Missing url parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Security: Only allow downloading from trusted Firebase Storage domains
    let parsedUrl: URL;
    try {
        parsedUrl = new URL(photoUrl);
    } catch {
        return new Response(JSON.stringify({ error: "Invalid URL" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const isAllowedDomain = parsedUrl.hostname === "firebasestorage.googleapis.com" || parsedUrl.hostname.endsWith(".firebasestorage.app");
    if (!isAllowedDomain) {
        return new Response(JSON.stringify({ error: "Forbidden domain" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const response = await fetch(photoUrl);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
                status: response.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        const contentType = response.headers.get("content-type") || "image/webp";
        const buffer = await response.arrayBuffer();

        // Sanitize filename
        const safeFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, "_");

        return new Response(buffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="${safeFilename}"`,
                "Cache-Control": "public, max-age=86400",
            },
        });
    } catch (err) {
        console.error("Error proxying image download:", err);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
