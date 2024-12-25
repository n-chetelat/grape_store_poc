import { TypographyH1 } from "@/components/ui/TypographyH1";
import { getMerchantOrders } from "@/queries/merchant";
import MerchantOrderCard from "@/components/merchant/MerchantOrderCard";

export default async function OrdersPage() {
  const orders = await getMerchantOrders();

  return (
    <div>
      <TypographyH1>Orders</TypographyH1>
      {orders?.length ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <MerchantOrderCard order={order} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders to display</p>
      )}
    </div>
  );
}
