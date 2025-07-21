import { projectAuth } from "@/firebase/config";
import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const createAccount = defineAction({
    accept: "form",
    input: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
    handler: async ({email, password}) => {
        await createUserWithEmailAndPassword(projectAuth, email, password);
    },
});