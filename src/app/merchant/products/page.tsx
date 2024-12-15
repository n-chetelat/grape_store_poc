import { TypographyH1 } from "@/components/ui/TypographyH1";
import { Product } from "@/libs/types";
import MerchantProduct from "@/components/merchant/MerchantProduct";
import { getMerchantProducts } from "@/queries/merchant";

export default async function MerchantProductsPage() {
  const products: Product[] = await getMerchantProducts();
  return (
    <>
      <TypographyH1>Your Products</TypographyH1>

      <ul className="flex flex-col gap-4 p-4 full-w mt-4 lg:w-1/2 md:w-5/6 md:m-auto md:mt-8">
        {products.map((product) => (
          <li key={product.id} className="">
            <MerchantProduct product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
