import { type CartItem, type Product, type OrderItem } from "@prisma/client";
export { type Product } from "@prisma/client";

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export type OrderItemWithProduct = OrderItem & {
  product: Product;
};
