"use client";
import { useActionState } from "react";
import { addToCart } from "@/actions/customer";
import { Button } from "@/components/ui/Button";
import { Product } from "@/libs/types";

type CartButtonProps = {
  product: Product;
};

export default function CartButton({ product }: CartButtonProps) {
  // On add to cart:
  // - Create a cart if none exists
  // - Add product to cart
  // - Redirect to cart page
  // - Show badge on cart icon
  const [state, action, pending] = useActionState(addToCart, undefined);
  return (
    <form action={action}>
      <input type="hidden" value={product.id} name="productId" />
      <Button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="w-full"
      >
        {!pending ? `Add to Cart` : "Adding..."}
      </Button>
    </form>
  );
}
