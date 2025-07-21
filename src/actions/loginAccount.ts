import { projectAuth } from "@/firebase/config";
import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginAccount = defineAction({
    accept: "form",
    input: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
    handler: async ({email, password}) => {
        await signInWithEmailAndPassword(projectAuth, email, password);

    }
});