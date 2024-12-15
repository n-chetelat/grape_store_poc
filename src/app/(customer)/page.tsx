import ProductCard from "@/components/customer/ProductCard";
import { TypographyH1 } from "@/components/ui/TypographyH1";
import { Product } from "@/libs/types";
import { getProducts } from "@/queries/product";

export default async function Home() {
  const products: Product[] = await getProducts();
  return (
    <>
      <TypographyH1>Welcome to the Grape Store</TypographyH1>
      <ul className="flex flex-col gap-4 p-4 full-w mt-4 lg:w-1/2 md:w-5/6 md:m-auto md:mt-8">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
