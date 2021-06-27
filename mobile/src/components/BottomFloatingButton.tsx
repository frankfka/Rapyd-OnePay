import React from 'react';
import { FloatingButton } from 'react-native-ui-lib';
import { AppColors } from '../util/theme/colors';
import { AppSpacings } from '../util/theme/spacing';

export type BottomFloatingButtonProps = {
  visible: boolean;
  disabled?: boolean;
  buttonLabel?: string;
  onButtonPress?(): void;
};

const BottomFloatingButton: React.FC<BottomFloatingButtonProps> = ({
  visible,
  disabled,
  buttonLabel,
  onButtonPress,
  children,
}) => {
  return (
    <FloatingButton
      visible={visible}
      button={{
        label: buttonLabel,
        children,
        onPress: onButtonPress,
        disabled,
        color: AppColors.text,
        backgroundColor: AppColors.secondary,
      }}
      bottomMargin={AppSpacings.large * 1.5}
    />
  );
};

export default BottomFloatingButton;
