import React from 'react';

import { View, ViewProps, Colors } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { AppColors } from '../util/theme/colors';

type Props = ViewProps & {
  scrollable?: boolean;
};

const Screen: React.FC<Props> = ({ children, scrollable, ...rest }) => {
  const ScreenWrapper = scrollable ? ScrollView : View;
  return (
    <View height="100%" backgroundColor="white">
      <ScreenWrapper>
        <View height="100%" {...rest} backgroundColor={AppColors.background}>
          {children}
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default Screen;
