import { inngest } from "@/libs/inngest";

type EventData = {
  stripeEvent: any;
};

export const HANDLED_EVENTS = [
  "payment_intent.succeeded",
  "payment_intent.processing",
  "payment_intent.payment_failed",
  "refund.created",
  "refund.updated",
  "refund.failed",
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
      case "refund.created":
      case "refund.updated":
        handleRefundEvent(eventData);
        break;
      case "refund.failed":
        hanldeRefundFailedEvent(eventData);
        break;
      default:
        console.log(`Unhandled event type ${eventData.stripeEvent.type}`);
    }
    return { event };
  }
);

function handlePaymentIntentEvent(eventData: EventData) {
  console.log(
    `Successfully handled stripe payment intent event of type "${eventData.stripeEvent.type}"`
  );
}

function handlePaymentIntentError(eventData: EventData) {
  console.log(`Could not handle stripe payment intent event"`);
}

function handleRefundEvent(eventData: EventData) {
  console.log(
    `Successfully handled refund event of type "${eventData.stripeEvent.type}`
  );
}

function hanldeRefundFailedEvent(eventData: EventData) {
  console.log(`Could not handle stripe refund event"`);
}
