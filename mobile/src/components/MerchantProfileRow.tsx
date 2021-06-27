import React from 'react';
import { Avatar, Text, View } from 'react-native-ui-lib';
import Merchant from '../models/Merchant';
import { AppColors } from '../util/theme/colors';

type Props = {
  merchant: Merchant;
};

const MerchantProfileRow: React.FC<Props> = ({ merchant }) => {
  return (
    <View
      row
      paddingH-medium
      paddingV-medium
      backgroundColor={AppColors.primary}
      centerV
    >
      <Text weightBold colorInverse>
        {merchant.name}
      </Text>
      <View flex />
      <Avatar source={{ uri: merchant.brandPhotoUrl }} />
    </View>
  );
};

export default MerchantProfileRow;
