export type RapydPaymentMethodCategory = 'ewallet' | 'card'; // Only consider these for now
export type RapydPaymentMethod = {
  id: string;
  type: string;
  category: RapydPaymentMethodCategory;
  imageUrl: string;
};

export type RapydCardPaymentMethodData = {
  name: string;
  lastFourDigits: string;
  expYear: string;
  expMonth: string;
};

export type RapydCardPaymentMethod = RapydPaymentMethod &
  RapydCardPaymentMethodData;
