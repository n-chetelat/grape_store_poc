"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { login } from "@/actions/auth";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  return (
    <form action={loginAction}>
      <input type="email" name="email" />
      {state?.errors.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <input type="password" name="password" />
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
    <button disabled={pending} type="submit">
      Login
    </button>
  );
}
