import prisma from "@/libs/prisma";
import { getCurrentCustomerId } from "@/queries/auth";

export async function getOrders() {
  const customerId = await getCurrentCustomerId();
  if (!customerId) {
    return {
      error: "No customer is currently logged in",
      data: null,
    };
  }

  const orders = await prisma.order.findMany({
    where: { customerId },
    include: { orderItems: { include: { product: true } } },
  });

  return {
    error: null,
    data: orders,
  };
}

export async function getOrderItems(orderId: string) {
  const customerId = await getCurrentCustomerId();
  if (!customerId) {
    return {
      error: "No customer is currently logged in",
      data: null,
    };
  }

  const orderItems = await prisma.orderItem.findMany({
    where: { orderId },
    include: { product: true },
  });

  return {
    error: null,
    data: orderItems || [],
  };
}
