"use client";

import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormEvent, useState } from "react";

type CheckoutFormProps = {
  clientSecret: string;
  total: number;
};

export default function CheckoutForm({
  clientSecret,
  total,
}: CheckoutFormProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUSHIABLE_KEY as string
  );

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#7340bf",
    },
  };
  return (
    <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
      <Form total={total} />
    </Elements>
  );
}

function Form({ total }: { total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null) {
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/customer/checkout/success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message as string);
        } else {
          setErrorMessage("Unknown error while processing payment");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6 flex-1">
        <CardHeader>
          <CardTitle>Check out</CardTitle>
          <CardDescription className="text-destructive">
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <LinkAuthenticationElement />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={stripe == null || elements == null || isLoading}
          >
            Purchase - ${total}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
