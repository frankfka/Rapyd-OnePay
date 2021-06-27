import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native-ui-lib';
import NavigationBarButton from '../../components/NavigationBarButton';
import { UserContextProvider } from '../../context/UserContext';
import { ShoppingContextProvider } from '../../context/ShoppingContext';
import { AppColors } from '../../util/theme/colors';
import { AppSpacings } from '../../util/theme/spacing';
import CheckoutScreen from './CheckoutScreen/CheckoutScreen';
import ScannerScreen from '../ScannerScreen/ScannerScreen';
import ShoppingCartScreen from '../ShoppingCartScreen/ShoppingCartScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingFlowPaymentSuccessScreen from './ShoppingFlowPaymentSuccessScreen/ShoppingFlowPaymentSuccessScreen';
import { ShoppingFlowStackParamList } from './ShoppingFlowStackTypes';

const ShoppingFlowStack = createStackNavigator<ShoppingFlowStackParamList>();

const ShoppingFlowStackNavigator = () => {
  return (
    <UserContextProvider>
      <ShoppingContextProvider>
        <ShoppingFlowStack.Navigator
          initialRouteName="Scanner"
          screenOptions={{
            gestureEnabled: false, // Disable swiping back by default
            headerLeft: () => undefined, // Header left will be populated by the component itself
          }}
        >
          <ShoppingFlowStack.Screen
            name="Scanner"
            component={ScannerScreen}
            options={{
              headerShown: false,
            }}
          />

          <ShoppingFlowStack.Screen
            name="ShoppingCart"
            component={ShoppingCartScreen}
            options={{
              headerTitle: 'Your Cart',
            }}
          />

          <ShoppingFlowStack.Screen
            name="Checkout"
            component={CheckoutScreen}
          />

          <ShoppingFlowStack.Screen
            name="Success"
            component={ShoppingFlowPaymentSuccessScreen}
            options={{
              headerShown: false,
            }}
          />
        </ShoppingFlowStack.Navigator>
      </ShoppingContextProvider>
    </UserContextProvider>
  );
};

export default ShoppingFlowStackNavigator;
