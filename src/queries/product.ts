import prisma from "@/libs/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany({
    where: { published: true, quantity: { gt: 0 } },
    take: 10,
  });

  return products;
}
