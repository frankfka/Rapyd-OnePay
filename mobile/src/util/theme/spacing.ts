import { Spacings } from 'react-native-ui-lib';

export const AppSpacings = {
  small: Spacings.s1,
  medium: Spacings.s3,
  large: Spacings.s5,
  largest: Spacings.s10,

  iconSmall: 18,
  iconRegular: 24,
  iconLarge: 36,

  borderRadiusSmall: 12,
  borderRadiusMedium: 24,
};

export const loadSpacings = () => {
  Spacings.loadSpacings(AppSpacings);
};
