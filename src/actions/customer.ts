import prisma from "@/libs/prisma";
import { getCurrentUser } from "@/queries/auth";

export async function addToCart(productId: string) {
  const user = await getCurrentUser();

  if (!user || !user.customer) {
    throw Error("No customer is currently logged in");
  }

  try {
    let cart = await prisma.cart.findUnique({
      where: { customerId: user.customer.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { customerId: user.customer.id },
      });
    }

    const cartItem = await prisma.cartItem.create({
      data: { cartId: cart.id, productId },
    });

    if (!cartItem) {
      throw Error(`Could not add item to card: ID ${productId}.`);
    }

    return !!cartItem;
  } catch (error) {
    throw Error("There was a problem while adding an item to customer's cart");
  }
}
