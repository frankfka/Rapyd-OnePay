import { MapById } from './GenericModels';
import OrderItem from './OrderItem';

type Order = {
  merchantId: string;
  tipEnabled: boolean;
  items: MapById<OrderItem>;
};

export default Order;
