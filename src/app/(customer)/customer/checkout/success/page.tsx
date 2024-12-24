import { createOrder, getOrderItems } from "@/actions/customer";
import { TypographyH1 } from "@/components/ui/TypographyH1";
import { getCart } from "@/queries/cart";
import { OrderItemWithProduct } from "@/libs/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    payment_intent: string;
  }>;
}) {
  const cart = await getCart();
  const paymentIntentId = (await searchParams).payment_intent;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const isSuccess = paymentIntent.status === "succeeded";

  let orderCreated: { error: string | null; success: boolean };
  let orderItems: {
    error: string | null;
    data: OrderItemWithProduct[] | null;
  } = { error: null, data: null };
  if (cart?.id && paymentIntent.metadata.cartId === cart.id) {
    orderCreated = await createOrder();
    if (orderCreated.success) {
      orderItems = await getOrderItems();
    }
  }

  return (
    <div>
      <TypographyH1>
        {isSuccess ? "Order complete!" : "Order error"}
      </TypographyH1>
      {orderItems?.data?.length &&
        orderItems.data.map((oi) => (
          <li>
            <p>{oi.product.name}</p>
          </li>
        ))}
    </div>
  );
}
