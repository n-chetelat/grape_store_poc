import prisma from "@/libs/prisma";
import { getCurrentMerchantId } from "@/queries/auth";

export async function getMerchantProducts() {
  const merchantId = await getCurrentMerchantId();
  if (!merchantId) {
    throw new Error("No merchant is currently logged in");
  }

  const products = await prisma.product.findMany({
    where: { merchantId },
  });

  if (products === null) {
    throw new Error(
      `There was a problem while fetching products for merchant ${merchantId}`
    );
  }

  return products;
}

export async function getMerchantOrders() {
  const merchantId = await getCurrentMerchantId();
  if (!merchantId) {
    throw new Error("No merchant is currently logged in");
  }

  const orders = await prisma.order.findMany({
    where: { orderItems: { every: { product: { merchantId } } } },
    include: { orderItems: { include: { product: true } } },
  });

  if (orders === null) {
    throw new Error(
      `There was a problem while fetching orders for merchant ${merchantId}`
    );
  }

  return orders;
}
