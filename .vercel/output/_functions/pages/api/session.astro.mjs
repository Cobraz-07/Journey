import { g as getAdminAuth } from '../../chunks/server_DzZAxVwU.mjs';
export { renderers } from '../../renderers.mjs';

const FIVE_DAYS_MS = 60 * 60 * 24 * 5 * 1e3;
const FIVE_DAYS_S = 60 * 60 * 24 * 5;
const POST = async ({ request, cookies }) => {
  const { idToken } = await request.json();
  try {
    await getAdminAuth().verifyIdToken(idToken);
    const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
      expiresIn: FIVE_DAYS_MS
    });
    cookies.set("__session", sessionCookie, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: FIVE_DAYS_S
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
};
const DELETE = async ({ cookies }) => {
  cookies.delete("__session", { path: "/" });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
