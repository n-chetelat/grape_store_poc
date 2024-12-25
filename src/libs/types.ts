import {
  type CartItem,
  type Product,
  type OrderItem,
  Order,
} from "@prisma/client";
export { type Product, type Order } from "@prisma/client";

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export type OrderItemWithProduct = OrderItem & {
  product: Product;
};

export type OrderWithItemWithProduct = Order & {
  orderItems: (OrderItem & {
    product: Product;
  })[];
};
