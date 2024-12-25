import { OrderWithItemWithProduct } from "@/libs/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { formatDate } from "@/libs/utils";

type OrderCardProps = {
  order: OrderWithItemWithProduct;
};

export default function OrderCard({ order }: OrderCardProps) {
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
    </Card>
  );
}
