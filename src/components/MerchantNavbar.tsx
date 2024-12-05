import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LucideHome } from "lucide-react";

export default async function MerchantNavbar() {
  return (
    <nav className="flex flex-row justify-end">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button asChild variant="link" size="icon">
            <Link href="/merchant">
              <LucideHome />
            </Link>
          </Button>
          <Button asChild variant="link" size="icon">
            <Link href="/merchant/products">Products</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/merchant/orders">Orders</Link>
          </Button>
        </div>
        {"|"}
        <Button asChild variant="link">
          <Link href="/">Storefront</Link>
        </Button>
        <LogoutButton />
      </div>
    </nav>
  );
}
