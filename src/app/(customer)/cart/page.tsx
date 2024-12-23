import { TypographyH1 } from "@/components/ui/TypographyH1";
import { getCartItems } from "@/queries/cart";
import CartItemCard from "@/components/customer/CartItemCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/Card";

export default async function CartPage() {
  const cartItems = await getCartItems();

  const total = cartItems
    .map((ci) => ci.product.price)
    .reduce((sum, total) => sum + total, 0);

  return (
    <div>
      <TypographyH1>Check out</TypographyH1>
      <Card className="mt-8 lg:w-1/2">
        <CardHeader>
          <CardTitle>Your items:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-4 p-4 full-w">
            {cartItems.map((item) => (
              <li key={item.id}>
                <CartItemCard product={item.product} />
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end">
          <p className="font-bold text-2xl">Total: {total}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
