import type { APIRoute } from "astro";
import { getAdminDb } from "@/firebase/server";

export const DELETE: APIRoute = async ({ params, locals }) => {
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
        const shareToken = tripData?.shareToken;

        const batch = adminDb.batch();

        // 1. Delete publicTrips index if present
        if (shareToken) {
            const publicIndexRef = adminDb.collection("publicTrips").doc(shareToken);
            batch.delete(publicIndexRef);
        }

        // 2. Delete all photos
        const photosRef = tripRef.collection("photos");
        const photosSnap = await photosRef.get();
        photosSnap.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        // 3. Delete all journal entries
        const journalRef = tripRef.collection("journal");
        const journalSnap = await journalRef.get();
        journalSnap.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        // 4. Delete the trip itself
        batch.delete(tripRef);

        await batch.commit();

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error securely deleting trip:", err);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
