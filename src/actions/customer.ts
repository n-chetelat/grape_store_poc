"use server";

import prisma from "@/libs/prisma";
import { getCurrentUser } from "@/queries/auth";
import { redirect } from "next/navigation";

export async function addToCart(prevState: any, formData: FormData) {
  const productId = formData.get("productId");

  const user = await getCurrentUser();

  if (!user || !user.customer) {
    return {
      error: "No customer is currently logged in",
    };
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
      data: { cartId: cart.id, productId: productId as string },
    });

    if (!cartItem) {
      return {
        error: `Could not add item to card: ID ${productId}.`,
      };
    }
  } catch (error) {
    return {
      error: "There was a problem while adding an item to customer's cart",
    };
  }

  redirect("/cart");
}
