import prisma from "@/libs/prisma";
import { getCurrentUser } from "./auth";
import { CartItemWithProduct } from "@/libs/types";

export async function getCartItems() {
  const user = await getCurrentUser();
  if (!user || !user.customer?.id) {
    throw Error("No customer is currently logged in");
  }

  const cart = await prisma.cart.findUnique({
    where: { customerId: user?.customer.id },
  });

  let cartItems: CartItemWithProduct[] = [];
  if (cart) {
    cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: {
        product: true,
      },
    });

    if (cartItems?.length > 0) {
      return cartItems;
    }
  }

  return [];
}
