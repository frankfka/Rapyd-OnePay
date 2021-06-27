import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useShoppingContextWithMerchant } from '../../../context/ShoppingContext';
import PaymentSuccessScreen from '../../PaymentSuccessScreen/PaymentSuccessScreen';
import { PaymentSuccessScreenNavigationProp } from '../ShoppingFlowStackTypes';

const ShoppingFlowPaymentSuccessScreen = () => {
  const { getTotalWithTip, transactionId, resetShoppingContext } =
    useShoppingContextWithMerchant();
  const navigation = useNavigation<PaymentSuccessScreenNavigationProp>();

  return (
    <PaymentSuccessScreen
      totalCost={getTotalWithTip()}
      onBackToHomePressed={() => {
        // Reset back to home screen
        navigation.dangerouslyGetParent()?.goBack();
        // Reset shopping state
        resetShoppingContext();
      }}
      transactionId={transactionId}
    />
  );
};

export default ShoppingFlowPaymentSuccessScreen;
