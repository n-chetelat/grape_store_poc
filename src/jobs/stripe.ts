import { inngest } from "@/libs/inngest";
import prisma from "@/libs/prisma";

export const handleStripeEvent = inngest.createFunction(
  { id: "stripe-handler" },
  { event: "stripe/handle-event" },
  async ({ event, step }) => {
    const eventData = event.data;
    switch (eventData.stripeEvent.type) {
      case "payment_intent.succeeded":
      case "payment_intent.processing":
      case "payment_intent.payment_failed":
        handlePaymentIntentEvent(eventData);
        break;
        //   case "account.application.authorized":
        // handle
        break;
      default:
        console.log(`Unhandled event type ${eventData.stripeEvent.type}`); // Don't do that only. Return something informative.
    }
    return { event };
  }
);

async function handlePaymentIntentEvent(eventData: EventData) {
  //   try {
  //     const account = eventData.stripeEvent.data.object;
  //     await prisma.stripeAccount.update({
  //       where: {
  //         stripeAccountId: account?.id,
  //       },
  //       data: {
  //         chargesEnabled: account.charges_enabled,
  //         payoutsEnabled: account.payouts_enabled,
  //         onboardingComplete: account.details_submitted,
  //       },
  //     });
  //     console.log(
  //       `Successfully handled stripe event "${eventData.stripeEvent.type}"`
  //     );
  //   } catch (error) {
  //     console.log(error); // Don't do that only. Return something informative.
  //   }
}

type EventData = {
  stripeEvent: any;
};
