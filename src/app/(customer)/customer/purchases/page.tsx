import OrderCard from "@/components/customer/OrderCard";
import { TypographyH1 } from "@/components/ui/TypographyH1";
import { getOrders } from "@/queries/orders";

export default async function PurchasesPaage() {
  const orders = (await getOrders()).data;

  return (
    <div>
      <TypographyH1 className="mb-4">Your orders</TypographyH1>
      {orders?.length ? (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      ) : (
        "No orders to display"
      )}
    </div>
  );
}
