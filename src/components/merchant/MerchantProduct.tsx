import { Product } from "@/libs/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";

type MerchantProductType = {
  product: Product;
};

export default function MerchantProduct({ product }: MerchantProductType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>${product.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold">In stock:</span> {product.quantity}
        </p>
        <p>
          <span className="font-bold">Published:</span>{" "}
          {product.published ? (
            <CircleCheck color="green" className="inline" size={16} />
          ) : (
            <CircleX color="red" className="inline" size={16} />
          )}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          className="text-sm text-muted-foreground hover:underline"
          href={`/products/${product.id}`}
        >
          See product
        </Link>
      </CardFooter>
    </Card>
  );
}
