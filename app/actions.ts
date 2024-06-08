"use server";

import { signIn } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google", {
    redirectTo: process.env.SIGN_IN_REDIRECT_URI,
  });
}
