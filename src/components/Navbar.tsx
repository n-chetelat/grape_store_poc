import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/Button";
import { isLoggedIn, getCurrentMerchantId } from "@/queries/auth";
import Link from "next/link";
import { ShoppingCart, LucideHome } from "lucide-react";

export default async function Navbar() {
  const loggedIn = await isLoggedIn();
  const isMerchant = !!(await getCurrentMerchantId());

  return (
    <nav className="flex flex-row justify-end">
      {loggedIn ? (
        <div className="flex justify-between items-center">
          <Button asChild variant="link" size="icon">
            <Link href="/">
              <LucideHome />
            </Link>
          </Button>
          <Button asChild variant="link" size="icon">
            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/customer/purchases">Orders</Link>
          </Button>
          {"|"}
          {isMerchant && (
            <Button asChild variant="link">
              <Link href="/merchant">My Store</Link>
            </Button>
          )}
          <LogoutButton />
        </div>
      ) : (
        <>
          <Button asChild variant="link">
            <Link href="/login">Sign in</Link>
          </Button>
        </>
      )}
    </nav>
  );
}
