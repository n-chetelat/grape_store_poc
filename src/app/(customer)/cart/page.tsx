import { getCart, getCartItems } from "@/queries/cart";
import CartItemCard from "@/components/customer/CartItemCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/Card";
import CheckoutForm from "@/components/customer/CheckoutForm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function CartPage() {
  const cart = await getCart();
  const cartItems = await getCartItems();
  const total = cartItems
    .map((ci) => ci.product.price)
    .reduce((sum, total) => sum + total, 0);

  const totalInCents = Math.floor(total * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalInCents,
    currency: "CAD",
    metadata: {
      cartId: cart?.id || null,
    },
  });

  if (paymentIntent.client_secret === null) {
    throw Error("Error while creating payment intent");
  }

  return (
    <div className="flex">
      <Card className="flex-1">
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
          <p className="font-bold text-2xl">Total: ${total}</p>
        </CardFooter>
      </Card>
      <div className="flex-1">
        <CheckoutForm
          clientSecret={paymentIntent.client_secret}
          total={total}
        />
      </div>
    </div>
  );
}
