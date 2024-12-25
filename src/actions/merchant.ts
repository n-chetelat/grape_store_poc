"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function issueRefund(paymentIntentId: string) {
  const refund = await stripe.refunds.create({
    // amount: amountInCents, -> setting this amount gives partial refund, otherwise full refund
    payment_intent: paymentIntentId,
  });

  if (refund) {
    return true;
  }
  return false;
}
