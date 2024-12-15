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
import Image from "next/image";

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
      <CardContent className="flex flex-col sm:flex-row gap-8 justify-between">
        {product.imageUrl && (
          <div className="relative aspect-square w-56 lg:w-36 flex-1">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1">
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
          <p className="text-sm mt-4">{product.description}</p>
        </div>
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
