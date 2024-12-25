import { inngest } from "@/libs/inngest";

type EventData = {
  stripeEvent: any;
};

export const HANDLED_EVENTS = [
  "payment_intent.succeeded",
  "payment_intent.processing",
  "payment_intent.payment_failed",
];

export const handleStripeEvent = inngest.createFunction(
  { id: "stripe-handler" },
  { event: "stripe/handle-event" },
  async ({ event, step }) => {
    const eventData = event.data;
    switch (eventData.stripeEvent.type) {
      case "payment_intent.succeeded":
      case "payment_intent.processing":
        handlePaymentIntentEvent(eventData);
        break;
      case "payment_intent.payment_failed":
        handlePaymentIntentError(eventData);
        break;
      default:
        console.log(`Unhandled event type ${eventData.stripeEvent.type}`);
    }
    return { event };
  }
);

function handlePaymentIntentEvent(eventData: EventData) {
  console.log(
    `Successfully handled stripe event of type "${eventData.stripeEvent.type}"`
  );
}

function handlePaymentIntentError(eventData: EventData) {
  console.log(
    `Could not handle stripe event of type "${eventData.stripeEvent.type}"`
  );
}
