import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import getFormattedCostAmount from '../util/getFormattedCostAmount';
import Divider from './Divider';

type Props = {
  totalAmount: number;
};

const TotalCostHeader: React.FC<Props> = ({ totalAmount }) => {
  return (
    <View paddingV-medium center>
      <Text sizeLarge>Your Total</Text>
      <Text sizeLargest weightExtraBold marginT-small colorPrimary>
        {getFormattedCostAmount(totalAmount)}
      </Text>
      <Divider width="100%" marginT-medium marginH-medium />
    </View>
  );
};

export default TotalCostHeader;
