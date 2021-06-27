import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { TabBar, TouchableOpacity, View } from 'react-native-ui-lib';
import { AppColors } from '../util/theme/colors';
import { AppSpacings } from '../util/theme/spacing';
import { AppStackParamList, HomeScreenNavigationProp } from './AppStackTypes';
import Screen from '../components/Screen';
import { Button, Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import ShoppingFlowStackNavigator from './ShoppingFlowStack/ShoppingFlowStackNavigator';

// @ts-ignore
import AppIcon from '../../assets/icon.png';

type TabNavItemProps = {
  name: string;
  isSelected: boolean;
  iconName: string;
};
const TabNavItem: React.FC<TabNavItemProps> = ({
  name,
  isSelected,
  iconName,
}) => {
  const color = isSelected ? AppColors.textPrimary : AppColors.text;

  return (
    <View center>
      <MaterialIcons
        // @ts-ignore
        name={iconName}
        size={AppSpacings.iconRegular}
        color={color}
      />
      <Text
        color={color}
        style={{
          marginTop: 2,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const MockTabBar: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<0 | 2>(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const onTabSelected = (tabIndex: number) => {
    if (tabIndex === 0 || tabIndex === 2) {
      // Allowed tabs
      setSelectedTabIndex(tabIndex);
    } else {
      // Scan CTA
      navigation.navigate('ShopNavigator');
    }
  };

  return (
    <View useSafeArea backgroundColor="white">
      <TabBar
        height={64}
        selectedIndex={selectedTabIndex}
        // @ts-ignore (this disables selected indicator for tab bar)
        indicatorStyle={{ backgroundColor: 'none' }}
        onTabSelected={onTabSelected}
      >
        <TabBar.Item>
          <TabNavItem
            name="Wallet"
            iconName="account-balance-wallet"
            isSelected={selectedTabIndex === 0}
          />
        </TabBar.Item>

        {/*Scan Button*/}
        <TabBar.Item
          backgroundColor={AppColors.primary}
          style={{
            borderRadius: AppSpacings.borderRadiusSmall,
            margin: AppSpacings.small,
          }}
        >
          <View center>
            <MaterialIcons
              name="qr-code-scanner"
              size={AppSpacings.iconLarge}
              color="white"
            />
          </View>
        </TabBar.Item>

        <TabBar.Item>
          <TabNavItem
            name="History"
            iconName="history"
            isSelected={selectedTabIndex === 2}
          />
        </TabBar.Item>
      </TabBar>
    </View>
  );
};

// Home Component
const DemoRootScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Screen center>
      <View flex center padding-large>
        <View
          backgroundColor="white"
          style={{ borderRadius: AppSpacings.borderRadiusMedium }}
          padding-large
          center
        >
          <Image
            source={AppIcon}
            style={{ width: 128, height: 128 }}
            resizeMode="contain"
          />
          <Text marginV-medium sizeLarge weightExtraBold>
            Welcome to RapydOne.
          </Text>
          <Text center>
            This screen will usually contain the latest updates and wallet
            information for the user.
            {'\n'}
            {'\n'}
            To get started with the demo, press the scanner icon below and scan
            the provided barcodes.
          </Text>
        </View>
      </View>
      <MockTabBar />
    </Screen>
  );
};

// Navigation stack
const AppStack = createStackNavigator<AppStackParamList>();

const AppStackNavigator: React.FC = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        gestureEnabled: false, // Disable swiping back for all navigators
      }}
      mode="modal"
    >
      <AppStack.Screen
        name={'Home'}
        component={DemoRootScreen}
        options={{ title: 'Wallet' }}
      />
      <AppStack.Screen
        name={'ShopNavigator'}
        component={ShoppingFlowStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
