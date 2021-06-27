import { MapById } from './GenericModels';

export type CartItem = {
  quantity: number;
};

export type Cart = MapById<CartItem>;
