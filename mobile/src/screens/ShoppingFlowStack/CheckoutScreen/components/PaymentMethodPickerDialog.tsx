import React from 'react';
import { TouchableOpacity } from 'react-native';
import Dialog from '../../../../components/Dialog';
import Divider from '../../../../components/Divider';
import { AppColors } from '../../../../util/theme/colors';
import PaymentMethodRow, { PaymentMethodRowProps } from './PaymentMethodRow';
import { View } from 'react-native-ui-lib';

type PaymentMethodPickerDialogProps = {
  isVisible: boolean;
  setIsVisible(isVisible: boolean): void;
  paymentMethodItems: PaymentMethodRowProps[];
  setSelectedPaymentMethodId(newPaymentMethodId: string): void;
};

const PaymentMethodPickerDialog: React.FC<PaymentMethodPickerDialogProps> = ({
  isVisible,
  setIsVisible,
  paymentMethodItems,
  setSelectedPaymentMethodId,
}: PaymentMethodPickerDialogProps) => {
  return (
    <Dialog
      title="Select Payment Method"
      visible={isVisible}
      onDismiss={() => setIsVisible(false)}
    >
      {paymentMethodItems.map((paymentMethodProps) => (
        <View key={paymentMethodProps.id} marginB-small>
          <TouchableOpacity
            onPress={() => setSelectedPaymentMethodId(paymentMethodProps.id)}
          >
            <PaymentMethodRow {...paymentMethodProps} />
          </TouchableOpacity>
        </View>
      ))}
    </Dialog>
  );
};

export default PaymentMethodPickerDialog;
