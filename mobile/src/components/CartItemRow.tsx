import React from 'react';
import { ListItem, Text } from 'react-native-ui-lib';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import getFormattedCostAmount from '../util/getFormattedCostAmount';
import { AppColors } from '../util/theme/colors';
import { AppSpacings } from '../util/theme/spacing';

/*
A row to show a specific item in a shopping cart
 */
export type CartItemRowProps = {
  name: string;
  quantity: number;
  price: number;
  onPress?(): void;
  containerStyles?: ViewStyle;
};

const CartItemRow: React.FC<CartItemRowProps> = ({
  name,
  quantity,
  price,
  onPress,
  containerStyles,
}) => {
  const totalPrice = quantity * price;

  return (
    <ListItem
      onPress={onPress}
      paddingH-medium
      containerStyle={{
        backgroundColor: 'white',
        borderRadius: AppSpacings.borderRadiusSmall,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: AppColors.divider,
        ...containerStyles,
      }}
    >
      <ListItem.Part left column containerStyle={{ flex: 1 }}>
        <Text weightMedium>{name}</Text>
        <Text weightLight sizeSmall>
          {quantity} x {getFormattedCostAmount(price)}
        </Text>
      </ListItem.Part>

      <ListItem.Part right>
        <Text sizeLarge colorPrimary>
          {getFormattedCostAmount(totalPrice)}
        </Text>
      </ListItem.Part>
    </ListItem>
  );
};

export default CartItemRow;
