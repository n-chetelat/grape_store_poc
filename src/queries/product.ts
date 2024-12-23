import prisma from "@/libs/prisma";

export async function getProducts() {
  return await prisma.product.findMany({
    where: { published: true, quantity: { gt: 0 } },
    take: 10,
  });
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
  });
}
