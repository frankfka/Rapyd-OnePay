import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, ButtonSize, View } from 'react-native-ui-lib';
import Stepper from 'react-native-ui-lib/stepper';
import Dialog, { DialogProps } from '../../../components/Dialog';
import { AppColors } from '../../../util/theme/colors';
import { AppSpacings } from '../../../util/theme/spacing';

type AdjustQuantityDialogProps = {
  initialQuantity: number;
  onSaveNewQuantityPressed(newQuantity: number): void;
  onDeleteItemPressed(): void;
} & DialogProps;

const AdjustQuantityDialog: React.FC<AdjustQuantityDialogProps> = ({
  initialQuantity,
  onSaveNewQuantityPressed,
  onDeleteItemPressed,
  visible,
  onDismiss,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(initialQuantity);
  return (
    <Dialog visible={visible} onDismiss={onDismiss} title="Adjust Quantity">
      <View center>
        <Stepper
          min={0}
          label={currentQuantity === 1 ? 'Item' : 'Items'}
          initialValue={initialQuantity}
          onValueChange={setCurrentQuantity}
        />
        <View center row marginT-medium>
          <View flexG>
            <Button
              onPrimaryButton
              size={'medium' as ButtonSize}
              label="Save"
              onPress={() => onSaveNewQuantityPressed(currentQuantity)}
            />
          </View>
          <Button onPress={onDeleteItemPressed} link>
            <MaterialIcons
              name="delete"
              size={AppSpacings.iconRegular}
              color={AppColors.error}
              style={{
                paddingRight: AppSpacings.small,
                paddingLeft: AppSpacings.medium,
              }}
            />
          </Button>
        </View>
      </View>
    </Dialog>
  );
};

export default AdjustQuantityDialog;
