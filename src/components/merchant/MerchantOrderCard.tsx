import { OrderWithItemWithProduct } from "@/libs/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { formatDate } from "@/libs/utils";
import RefundButton from "./RefundButton";

type MerchantOrderCardProps = {
  order: OrderWithItemWithProduct;
};

export default function MerchantOrderCard({ order }: MerchantOrderCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatDate(order.createdAt)}</CardTitle>
        <CardDescription>{order.orderItems.length} item(s)</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {order.orderItems.map((item) => (
            <li key={item.id}>
              <p>
                {item.product.name} - <span>${item.pricePaid}</span>
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <RefundButton paymentIntentId={order.paymentIntentId} />
      </CardFooter>
    </Card>
  );
}
