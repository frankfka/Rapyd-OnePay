import React, { useState } from 'react';
import { ColorValue, StyleSheet } from 'react-native';
import { View, Chip, Text } from 'react-native-ui-lib';
import getFormattedCostAmount from '../../../../util/getFormattedCostAmount';
import { AppColors } from '../../../../util/theme/colors';
import { AppSpacings } from '../../../../util/theme/spacing';

const tipPercentages = [0.1, 0.15, 0.2, 0.25];

type Props = {
  totalAmount: number;
  tipAmountSelected(amount: number): void;
};

const TipSelect: React.FC<Props> = ({ totalAmount, tipAmountSelected }) => {
  const [selectedTipIndex, setSelectedTipIndex] = useState<number>();
  const totalTipAmount =
    (selectedTipIndex != null ? tipPercentages[selectedTipIndex] : 0) *
    totalAmount;

  return (
    <View
      style={{
        borderRadius: AppSpacings.borderRadiusSmall,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: AppColors.divider,
      }}
      row
      centerV
      spread
      backgroundColor="white"
      paddingH-large
      paddingV-medium
    >
      {tipPercentages.map((tipPercentage, index) => {
        const isChipSelected = selectedTipIndex === index;

        const backgroundColor: ColorValue = isChipSelected
          ? AppColors.primary
          : 'transparent';
        const textColor: ColorValue = isChipSelected
          ? AppColors.textInverse
          : AppColors.primary;

        const onChipPressed = () => {
          if (index === selectedTipIndex) {
            // Unselect
            tipAmountSelected(0);
            setSelectedTipIndex(undefined);
          } else {
            tipAmountSelected(tipPercentages[index] * totalAmount);
            setSelectedTipIndex(index);
          }
        };

        return (
          <Chip
            key={tipPercentage}
            borderRadius={AppSpacings.borderRadiusSmall}
            containerStyle={{ borderColor: AppColors.primary }}
            label={`${(tipPercentage * 100).toFixed(0)}%`}
            marginH-small
            onPress={onChipPressed}
            backgroundColor={backgroundColor}
            labelStyle={{ color: textColor }}
          />
        );
      })}
      <View
        backgroundColor={AppColors.divider}
        width={StyleSheet.hairlineWidth}
        height="100%"
        marginH-medium
      />
      <Text weightMedium>{getFormattedCostAmount(totalTipAmount)}</Text>
    </View>
  );
};

export default TipSelect;
