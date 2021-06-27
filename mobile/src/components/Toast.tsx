import React from 'react';
import { ColorValue } from 'react-native';
import { Toast as RNUIToast } from 'react-native-ui-lib';
import { AppColors } from '../util/theme/colors';

export type ToastType = 'success' | 'info' | 'error';

export type ToastContent = {
  message: string;
  type: ToastType;
};

export type ToastProps = {
  content?: ToastContent; // Shown when content is defined
  setContent(newContent?: ToastContent): void;
};

const Toast: React.FC<ToastProps> = ({ content, setContent }) => {
  let backgroundColor: ColorValue = 'white';
  let textColor: ColorValue = AppColors.textInverse;
  if (content != null) {
    switch (content.type) {
      case 'success':
        backgroundColor = AppColors.success;
        break;
      case 'error':
        backgroundColor = AppColors.error;
        break;
      case 'info':
        backgroundColor = AppColors.info;
        break;
    }
  }

  return (
    <RNUIToast
      visible={content != null}
      message={content?.message}
      onDismiss={() => setContent(undefined)}
      autoDismiss={3000}
      backgroundColor={backgroundColor}
      color={textColor}
    />
  );
};

export default Toast;
