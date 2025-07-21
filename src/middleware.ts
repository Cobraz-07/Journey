import { defineMiddleware } from "astro:middleware";
import { projectAuth } from "./firebase/config";

export const onRequest = defineMiddleware((context, next) => {
    const currentUser = projectAuth.currentUser;
    const { pathname } = context.url;

    if(!currentUser && pathname.startsWith("/authenticated") && context.request.method === "GET"){
        return context.redirect("/register")
    }

    if(currentUser && (pathname === "/signin" || pathname === "/register" || pathname === "/")){
        return context.redirect("/authenticated/")
    }

    if(currentUser){
        context.locals.userEmail = currentUser.email;
    }
    
    return next()
})