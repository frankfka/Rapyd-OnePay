import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, Button, View } from 'react-native-ui-lib';
import Screen from '../../components/Screen';
import Cost from '../../models/Cost';
import getFormattedCostAmount from '../../util/getFormattedCostAmount';
import { AppColors } from '../../util/theme/colors';

type Props = {
  totalCost: Cost;
  transactionId: string;
  onBackToHomePressed(): void;
};

const PaymentSuccessScreen: React.FC<Props> = ({
  totalCost,
  transactionId,
  onBackToHomePressed,
}) => {
  return (
    <Screen useSafeArea center>
      <View center>
        {/*Success icon*/}
        <MaterialIcons
          name="check-circle"
          color={AppColors.success}
          size={128}
        />

        {/*Success Text*/}
        <View margin-large center>
          <Text sizeLarger weightExtraBold>
            Payment Complete
          </Text>
          <Text marginT-small>
            Your payment of {getFormattedCostAmount(totalCost.amount)} was
            approved.
          </Text>
          <Text weightLight sizeSmall marginT-medium center>
            Transaction ID: {transactionId}
          </Text>
        </View>

        {/*Reset button*/}
        <Button label="Back to Home" onPress={onBackToHomePressed} />
      </View>
    </Screen>
  );
};

export default PaymentSuccessScreen;
