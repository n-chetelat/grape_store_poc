import { Product } from "@/libs/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CircleCheck } from "lucide-react";

type MerchantProductType = {
  product: Product;
};

export default function ProductCard({ product }: MerchantProductType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-8 justify-between">
        {product.imageUrl && (
          <div className="relative aspect-square w-56 flex-1">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-8 justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-2xl">${product.price}</p>
            <p className="text-sm line-clamp-6">{product.description}</p>
            <p className="flex items-center gap-2">
              In Stock
              <CircleCheck color="green" className="inline" size={16} />
            </p>
          </div>
          <Button asChild>
            <Link
              className="text-sm text-muted-foreground hover:underline"
              href={`/products/${product.id}`}
            >
              See product
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
