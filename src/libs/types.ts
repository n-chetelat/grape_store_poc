import { type CartItem, type Product } from "@prisma/client";
export { type Product } from "@prisma/client";

export type CartItemWithProduct = CartItem & {
  product: Product;
};
