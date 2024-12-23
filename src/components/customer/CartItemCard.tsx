import { Product } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";

type CartItemCartProps = {
  product: Product;
};

export default async function CartItemCard({ product }: CartItemCartProps) {
  return (
    <Card>
      <CardContent className="flex flex-row gap-8 justify-between p-6">
        {product.imageUrl && (
          <div className="relative aspect-square w-32 ">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-2">
          <p className="font-bold">{product.name}</p>
          <p>${product.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}
