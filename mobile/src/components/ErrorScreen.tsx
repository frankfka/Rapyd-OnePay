import React from 'react';

import Screen from './Screen';
import { Text } from 'react-native-ui-lib/core';

type Props = {
  message: string;
};

const ErrorScreen: React.FC<Props> = ({ message }) => {
  return (
    <Screen center>
      <Text text10>Error</Text>
      <Text>{message}</Text>
    </Screen>
  );
};

export default ErrorScreen;
