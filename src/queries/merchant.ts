import prisma from "@/libs/prisma";
import { getCurrentUser } from "@/queries/auth";

export async function getMerchantProducts() {
  const user = await getCurrentUser();
  if (!user || !user.merchant) {
    throw new Error("No merchant is currently logged in");
  }

  const products = await prisma.product.findMany({
    where: { merchantId: user.merchant.id },
  });

  if (products === null) {
    throw new Error(
      `There was a problem while fetching products for merchant ${user.merchant.id}`
    );
  }

  return products;
}
