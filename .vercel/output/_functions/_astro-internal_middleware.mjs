import { d as defineMiddleware, s as sequence } from './chunks/index_DdsliIQq.mjs';
import { g as getAdminAuth } from './chunks/server_BKb5tyQR.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_CnhSHa__.mjs';
import 'kleur/colors';
import './chunks/astro/server_BJAPvbWO.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith("/api/")) {
    return next();
  }
  const sessionCookie = context.cookies.get("__session")?.value;
  let user = null;
  if (sessionCookie) {
    try {
      const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
      user = {
        email: decodedClaims.email ?? null,
        uid: decodedClaims.uid
      };
    } catch {
      context.cookies.delete("__session", { path: "/" });
    }
  }
  if (!user && pathname.startsWith("/authenticated") && context.request.method === "GET") {
    return context.redirect("/register");
  }
  if (user && (pathname === "/signin" || pathname === "/register" || pathname === "/")) {
    return context.redirect("/authenticated/");
  }
  context.locals.userEmail = user?.email ?? null;
  context.locals.uid = user?.uid ?? null;
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
