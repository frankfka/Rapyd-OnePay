import {
  useFonts,
  Raleway_100Thin,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light,
  Raleway_300Light_Italic,
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_500Medium,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black,
  Raleway_900Black_Italic,
} from '@expo-google-fonts/raleway';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Text, View} from "react-native-ui-lib";
import ErrorScreen from './src/components/ErrorScreen';
import AppStackNavigator from './src/screens/AppStackNavigator';
import initTheme from './src/util/theme/theme';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light,
    Raleway_300Light_Italic,
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_500Medium,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black,
    Raleway_900Black_Italic,
  });
  const [hasScannerPermissions, setHasScannerPermissions] = useState(false);

  // Demo setup - permissions for camera
  useEffect(() => {
    (async () => {
      const status = await BarCodeScanner.requestPermissionsAsync();
      if (status.granted) {
        setHasScannerPermissions(true);
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return (<View><Text>Please Wait</Text></View>);
  }

  if (!hasScannerPermissions) {
    return <ErrorScreen message="No scanner permissions were given." />;
  }

  initTheme();
  // Main Demo app
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default App;
