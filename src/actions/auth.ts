"use server";

import { createSession, decrypt, deleteSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { compareSync } from "bcrypt-ts";
import prisma from "@/libs/prisma";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  const user = await prisma.user.findFirst({
    where: { email },
  });
  const passwordValid = compareSync(password, user?.hashedPassword || "");

  if (user === null || !passwordValid) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getCurrentUser() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (session?.userId) {
    const user = await prisma.user.findUnique({
      where: { id: session?.userId as string },
    });

    if (user) return user;
  }
  return null;
}

export async function isLoggedIn() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  console.log("sesion is", session?.userId);
  if (session?.userId) return true;
  return false;
}
