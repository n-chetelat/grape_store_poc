import { Button } from "@/components/ui/Button";
import { TypographyH1 } from "@/components/ui/TypographyH1";
import { getProduct } from "@/queries/product";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProduct(id);

  // const handleAddToCart = async (e: React.SyntheticEvent) => {
  //   // On add to cart:
  //   // - Create a cart if none exists
  //   // - Add product to cart
  //   // - Redirect to cart page
  //   // - Show badge on cart icon
  //   e.preventDefault();
  //   try {
  //     const added = await addToCart(id);
  //     if (!added) {

  //     }
  //   } catch (error) {}
  // };

  return (
    <>
      {product ? (
        <div className="flex gap-16 w-full lg:w-10/12 m-auto mt-8">
          <div className="relative aspect-square w-56 flex-1">
            <Image
              src={product.imageUrl as string}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-4">
              <TypographyH1 className="text-3xl lg:text-4xl">
                {product.name}
              </TypographyH1>
              <p className="text-2xl font-bold">${product.price}</p>
              <p className="flex gap-2 items-center">
                In Stock
                <CircleCheck color="green" className="inline" size={16} />
              </p>
              <p>{product.description}</p>
            </div>

            <Button type="submit">Add to Cart</Button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
