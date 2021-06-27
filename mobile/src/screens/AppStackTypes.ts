import { StackNavigationProp } from '@react-navigation/stack';

export type AppStackParamList = {
  Home: undefined;
  ShopNavigator: undefined;
};

export type AppStackScreenName = keyof AppStackParamList;

/*
Stack screen navigation props
 */
export type HomeScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Home'
>;

export type ShopNavigatorNavigationProp = StackNavigationProp<
  AppStackParamList,
  'ShopNavigator'
>;
