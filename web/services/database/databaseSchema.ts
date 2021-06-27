import { MapById } from '../../models/GenericModels';
import Merchant from '../../models/Merchant';
import Customer from '../../models/Customer';
import Order from '../../models/Order';

type DatabaseSchema = {
  merchants: MapById<Merchant>;
  customers: MapById<Customer>;
  orders: MapById<Order>;
};

export default DatabaseSchema;
