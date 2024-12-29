import prisma from "@/libs/prisma";
import { getCurrentCustomerId } from "@/queries/auth";

export async function getCart() {
  const customerId = await getCurrentCustomerId();
  if (!customerId) {
    throw Error("No customer is currently logged in");
  }

  const cart = await prisma.cart.findUnique({
    where: { customerId },
  });

  return cart;
}

export async function getCartItems() {
  const customerId = await getCurrentCustomerId();
  if (!customerId) return [];

  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: { cartItems: { include: { product: true } } },
  });

  return cart?.cartItems || [];
}

export async function getCartItemCount() {
  const customerId = await getCurrentCustomerId();
  if (!customerId) return 0;

  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: { _count: { select: { cartItems: true } } },
  });

  return cart?._count.cartItems || 0;
}
