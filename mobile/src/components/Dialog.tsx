import React from 'react';
import {
  Text,
  View,
  Dialog as RNUIDialog,
  DialogProps as RNUIDialogProps,
} from 'react-native-ui-lib';
import { AppSpacings } from '../util/theme/spacing';
import Divider from './Divider';

export type DialogProps = {
  title?: string;
  disableContentPadding?: boolean;
} & RNUIDialogProps;

const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  disableContentPadding,
  ...rest
}) => {
  const titleBar = title && (
    <>
      <View padding-medium center>
        <Text sizeLarge>{title}</Text>
      </View>
      <Divider width="95%" />
    </>
  );

  return (
    <RNUIDialog
      {...rest}
      containerStyle={{
        backgroundColor: 'white',
        borderRadius: AppSpacings.borderRadiusSmall,
      }}
    >
      {/*Header*/}
      {titleBar}
      {/*Content*/}
      <View padding-medium={!disableContentPadding}>{children}</View>
    </RNUIDialog>
  );
};

export default Dialog;
