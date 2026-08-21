import type { APIRoute } from "astro";
import { getAdminDb } from "@/firebase/server";
import { generateShareToken } from "@/utils/shareToken";

export const GET: APIRoute = async ({ params, locals, url }) => {
    const uid = locals.uid;
    if (!uid) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { tripID } = params;
    if (!tripID) {
        return new Response(JSON.stringify({ error: "Missing trip ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const adminDb = await getAdminDb();
        const tripRef = adminDb.collection("users").doc(uid).collection("trips").doc(tripID);
        const tripSnap = await tripRef.get();

        if (!tripSnap.exists) {
            return new Response(JSON.stringify({ error: "Trip not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const tripData = tripSnap.data();
        const isPublic = Boolean(tripData?.isPublic && tripData?.shareToken);
        const shareToken = isPublic ? tripData?.shareToken : null;
        const origin = url.origin;
        const shareUrl = shareToken ? `${origin}/trip/public/${shareToken}` : null;

        return new Response(
            JSON.stringify({
                isPublic,
                shareToken,
                shareUrl,
                sharedAt: tripData?.sharedAt ?? null,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        console.error("Error fetching trip share state:", err);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};

export const POST: APIRoute = async ({ params, locals, request, url }) => {
    const uid = locals.uid;
    if (!uid) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { tripID } = params;
    if (!tripID) {
        return new Response(JSON.stringify({ error: "Missing trip ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    let body: any = {};
    try {
        body = await request.json();
    } catch {
        body = {};
    }

    const action = body.action || "generate";

    try {
        const adminDb = await getAdminDb();
        const tripRef = adminDb.collection("users").doc(uid).collection("trips").doc(tripID);
        const tripSnap = await tripRef.get();

        if (!tripSnap.exists) {
            return new Response(JSON.stringify({ error: "Trip not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const tripData = tripSnap.data();
        const oldShareToken = tripData?.shareToken;

        if (action === "revoke") {
            // Remove global lookup index if present
            if (oldShareToken) {
                await adminDb.collection("publicTrips").doc(oldShareToken).delete();
            }

            // Update trip document
            await tripRef.update({
                isPublic: false,
                shareToken: null,
                sharedAt: null,
            });

            return new Response(
                JSON.stringify({
                    success: true,
                    isPublic: false,
                    shareToken: null,
                    shareUrl: null,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Action === "generate"
        const newShareToken = generateShareToken();
        const now = new Date().toISOString();

        // 1. If there was an old share token, delete old index
        if (oldShareToken && oldShareToken !== newShareToken) {
            await adminDb.collection("publicTrips").doc(oldShareToken).delete();
        }

        // 2. Set new global index in publicTrips
        await adminDb.collection("publicTrips").doc(newShareToken).set({
            uid,
            tripId: tripID,
            createdAt: now,
        });

        // 3. Update trip document
        await tripRef.update({
            isPublic: true,
            shareToken: newShareToken,
            sharedAt: now,
        });

        const origin = url.origin;
        const shareUrl = `${origin}/trip/public/${newShareToken}`;

        return new Response(
            JSON.stringify({
                success: true,
                isPublic: true,
                shareToken: newShareToken,
                shareUrl,
                sharedAt: now,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        console.error("Error managing trip sharing:", err);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
