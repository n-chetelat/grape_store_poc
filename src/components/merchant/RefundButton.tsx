"use client";

import { Button } from "@/components/ui/Button";
import { issueRefund } from "@/actions/merchant";
import { useState } from "react";

type RefundButtonProps = {
  paymentIntentId: string;
};

export default function RefundButton({ paymentIntentId }: RefundButtonProps) {
  const [message, setMessage] = useState<string>();
  const handleGetRefund = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const refunded = await issueRefund(paymentIntentId);
    if (refunded) {
      setMessage("Refund completed");
    } else setMessage("Unable to refund");
  };

  return (
    <>
      <Button onClick={handleGetRefund}>Issue refund</Button>
      <p>{message}</p>
    </>
  );
}
