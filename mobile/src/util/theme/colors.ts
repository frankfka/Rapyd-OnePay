import { Colors } from 'react-native-ui-lib';

// Theme colors
const primary = '#2962ff';
const primaryDark = '#0039cb';
const secondary = '#ffc400';

// Text colors
const text = '#000';
const textPrimary = primary;
const textInverse = '#fff';

// Background
const background = Colors.rgba(primary, 0.08);

// Other
const divider = '#BDBDBD';
const overlay = Colors.rgba('#000', 0.5);
const overlayPrimary = Colors.rgba(primary, 0.2);

const error = '#f44336';
const success = '#4caf50';
const info = primaryDark;

// App color map
export const AppColors = {
  primary,
  primaryDark,
  secondary,

  text,
  textPrimary,
  textInverse,

  background,

  divider,
  overlay,
  overlayPrimary,

  error,
  success,
  info,
};

export const loadColors = () => {
  Colors.loadColors(AppColors);
};
