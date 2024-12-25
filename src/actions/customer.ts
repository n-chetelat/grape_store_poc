"use server";

import prisma from "@/libs/prisma";
import { getCurrentCustomerId, getCurrentUser } from "@/queries/auth";
import { getCartItems } from "@/queries/cart";
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

export async function createOrder(paymentIntentId: string) {
  const customerId = await getCurrentCustomerId();
  if (!customerId) {
    return {
      error: "No customer is currently logged in",
      data: null,
    };
  }

  const order = await prisma.order.create({
    data: { customerId, paymentIntentId },
  });

  const cartItems = await getCartItems();
  const orderItemData = cartItems.map((ci) => ({
    orderId: order.id,
    productId: ci.productId,
    pricePaid: ci.product.price,
  }));

  await prisma.orderItem.createMany({
    data: orderItemData,
  });

  // delete the cart when the order is done
  await prisma.cart.delete({
    where: { id: cartItems[0].cartId },
  });

  return { error: null, data: order };
}
