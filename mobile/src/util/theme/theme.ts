import { ThemeManager } from 'react-native-ui-lib';
import { loadColors } from './colors';
import { loadSpacings, AppSpacings } from './spacing';
import { loadTypography } from './typography';

const initTheme = () => {
  loadColors();
  loadTypography();
  loadSpacings();

  ThemeManager.setComponentTheme('Text', {
    sizeRegular: true,
    weightRegular: true,
    colorRegular: true,
  });
  ThemeManager.setComponentTheme('Button', {
    borderRadius: AppSpacings.borderRadiusMedium,
  });
};

export default initTheme;
