import { decrypt } from "@/libs/session";
import prisma from "@/libs/prisma";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (session?.userId) {
    const user = await prisma.user.findUnique({
      where: { id: session?.userId as string },
      include: {
        merchant: { select: { id: true } },
        customer: { select: { id: true } },
      },
    });

    if (user) return user;
  }
  return null;
}

export async function isLoggedIn() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (session?.userId) return true;
  return false;
}

export async function getCurrentMerchantId() {
  const user = await getCurrentUser();
  if (!user || !user?.merchant?.id) return null;
  return user.merchant.id;
}

export async function getCurrentCustomerId() {
  const user = await getCurrentUser();
  if (!user || !user?.customer?.id) return null;
  return user.customer.id;
}
