import { MapById } from './GenericModels';
import Product from './Product';

type Merchant = {
  id: string;
  name: string;
  brandPhotoUrl: string;
  eWalletId: string;
  products: MapById<Product>;
};

export default Merchant;
