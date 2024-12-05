"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/Button";

export default function LogoutButton() {
  return (
    <Button variant="link" onClick={() => logout()}>
      Logout
    </Button>
  );
}
