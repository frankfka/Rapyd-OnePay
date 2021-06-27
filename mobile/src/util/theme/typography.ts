import { Typography } from 'react-native-ui-lib';
import { AppColors } from './colors';

export const AppTypography = {
  weightLight: {
    fontFamily: 'Raleway_300Light',
  },
  weightRegular: {
    fontFamily: 'Raleway_400Regular',
  },
  weightMedium: {
    fontFamily: 'Raleway_500Medium',
  },
  weightBold: {
    fontFamily: 'Raleway_600SemiBold',
  },
  weightExtraBold: {
    fontFamily: 'Raleway_700Bold',
  },

  sizeSmall: {
    fontSize: 12,
  },
  sizeRegular: {
    fontSize: 16,
  },
  sizeMedium: {
    fontSize: 18,
  },
  sizeLarge: {
    fontSize: 20,
  },
  sizeLarger: {
    fontSize: 24,
  },
  sizeLargest: {
    fontSize: 28,
  },

  colorRegular: {
    color: AppColors.text,
  },
  colorInverse: {
    color: AppColors.textInverse,
  },
  colorPrimary: {
    color: AppColors.textPrimary,
  },

  onPrimaryButton: {
    fontFamily: 'Raleway_600SemiBold',
    color: AppColors.textInverse,
  },
  onSecondaryButton: {
    fontFamily: 'Raleway_600SemiBold',
    color: AppColors.text,
  },
  onLinkButton: {
    fontFamily: 'Raleway_400Regular',
    color: AppColors.textPrimary,
  },
};

export const loadTypography = () => {
  Typography.loadTypographies(AppTypography);
};
