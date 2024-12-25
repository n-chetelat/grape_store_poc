import { createOrder } from "@/actions/customer";
import { getOrderItems } from "@/queries/orders";
import { TypographyH1 } from "@/components/ui/TypographyH1";
import { getCart } from "@/queries/cart";
import { OrderItemWithProduct, Order } from "@/libs/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function CheckoutdataPage({
  searchParams,
}: {
  searchParams: Promise<{
    payment_intent: string;
  }>;
}) {
  const cart = await getCart();
  const paymentIntentId = (await searchParams).payment_intent;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const isdata = paymentIntent.status === "succeeded";

  let order: { error: string | null; data: Order | null };
  let orderItems: {
    error: string | null;
    data: OrderItemWithProduct[] | null;
  } = { error: null, data: null };
  if (cart?.id && paymentIntent.metadata.cartId === cart.id) {
    order = await createOrder(paymentIntent.id);
    if (order.data) {
      orderItems = await getOrderItems(order.data.id);
    }
  }

  return (
    <div>
      <TypographyH1>{isdata ? "Order complete!" : "Order error"}</TypographyH1>
      <p>{JSON.stringify(orderItems)}</p>
      {orderItems?.data?.length
        ? orderItems.data.map((oi) => (
            <li key={oi.id}>
              <p>{oi.product.name}</p>
            </li>
          ))
        : "No order items to display"}
    </div>
  );
}
