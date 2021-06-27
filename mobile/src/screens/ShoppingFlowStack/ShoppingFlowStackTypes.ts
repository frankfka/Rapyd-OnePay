import { StackNavigationProp } from '@react-navigation/stack';

export type ShoppingFlowStackParamList = {
  Scanner: undefined;
  ShoppingCart: undefined;
  Checkout: undefined;
  Success: undefined;
};

export type ShoppingFlowScreenName = keyof ShoppingFlowStackParamList;

/*
Stack screen navigation props
 */
export type ScannerScreenNavigationProp = StackNavigationProp<
  ShoppingFlowStackParamList,
  'Scanner'
>;

export type ShoppingCartScreenNavigationProp = StackNavigationProp<
  ShoppingFlowStackParamList,
  'ShoppingCart'
>;

export type CheckoutScreenNavigationProp = StackNavigationProp<
  ShoppingFlowStackParamList,
  'Checkout'
>;

export type PaymentSuccessScreenNavigationProp = StackNavigationProp<
  ShoppingFlowStackParamList,
  'Success'
>;
