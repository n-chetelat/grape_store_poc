"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { login } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  return (
    <form action={loginAction} className="flex flex-col gap-4">
      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" id="email" />
      {state?.errors.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <Label htmlFor="password">Passowrd</Label>
      <Input type="password" name="password" id="password" />
      {state?.errors.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Login
    </Button>
  );
}
