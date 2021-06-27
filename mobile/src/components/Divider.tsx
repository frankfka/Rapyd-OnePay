import React from 'react';
import { StyleSheet } from 'react-native';
import { View, ViewProps } from 'react-native-ui-lib';
import { AppColors } from '../util/theme/colors';

const Divider: React.FC<ViewProps> = ({ height, ...rest }) => {
  return (
    <View center width="100%">
      <View
        height={height ?? StyleSheet.hairlineWidth}
        backgroundColor={AppColors.divider}
        {...rest}
      />
    </View>
  );
};

export default Divider;
