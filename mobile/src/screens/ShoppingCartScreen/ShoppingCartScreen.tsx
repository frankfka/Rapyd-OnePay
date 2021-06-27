import React, { useCallback, useLayoutEffect, useState } from 'react';
import BottomFloatingButton from '../../components/BottomFloatingButton';
import MerchantProfileRow from '../../components/MerchantProfileRow';
import NavigationBarButton from '../../components/NavigationBarButton';
import Toast, { ToastContent } from '../../components/Toast';
import TotalCostHeader from '../../components/TotalCostHeader';
import { useShoppingContextWithMerchant } from '../../context/ShoppingContext';
import Screen from '../../components/Screen';
import { ImageStyle, ScrollView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { MaterialIcons } from '@expo/vector-icons';
import Divider from '../../components/Divider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import getFormattedCostAmount from '../../util/getFormattedCostAmount';
import { AppColors } from '../../util/theme/colors';
import { AppSpacings } from '../../util/theme/spacing';
import { ShoppingCartScreenNavigationProp } from '../ShoppingFlowStack/ShoppingFlowStackTypes';
import AddItemScannerDialog from './components/AddItemScannerDialog';
import AdjustQuantityDialog from './components/AdjustQuantityDialog';
import ShoppingCartSection from './components/ShoppingCartSection';

const ShoppingCartScreen: React.FC = () => {
  // Setup navigation
  const navigation = useNavigation<ShoppingCartScreenNavigationProp>();

  // Toast
  const [toastContent, setToastContent] = useState<ToastContent | undefined>();

  // Dialogs
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);

  const shoppingContext = useShoppingContextWithMerchant();
  const {
    merchant,
    cart,
    getProduct,
    updateCart,
    getCartQuantity,
    getTotal,
    resetShoppingContext,
  } = shoppingContext;

  // Setup header buttons for moving back
  useLayoutEffect(() => {
    const navigationOptions: Partial<StackNavigationOptions> = {
      headerLeft: () => (
        <NavigationBarButton
          marginL-s3
          label="Cancel"
          onPress={() => {
            resetShoppingContext();
            navigation.goBack();
          }}
        />
      ),
    };
    navigation.setOptions(navigationOptions);
  }, [navigation]);

  // Add checkout button when we have items
  useLayoutEffect(() => {
    const navigationOptions: Partial<StackNavigationOptions> = {
      headerRight: () =>
        Object.keys(cart).length > 0 ? (
          <NavigationBarButton
            label="Checkout"
            onPress={() => navigation.navigate('Checkout')}
          >
            <View marginR-small>
              <MaterialIcons
                name="payment"
                size={AppSpacings.iconSmall}
                color={AppColors.textPrimary}
              />
            </View>
          </NavigationBarButton>
        ) : null,
    };
    navigation.setOptions(navigationOptions);
  }, [navigation, Object.keys(cart).length > 0]);

  const onBarcodeScanned = (barcodeData: string) => {
    // Barcode data is the ID
    if (getProduct(barcodeData) != null) {
      // Product exists
      updateCart(barcodeData, getCartQuantity(barcodeData) + 1);
      setToastContent({
        message: 'Item added to cart.',
        type: 'success',
      });
    } else {
      setToastContent({
        message: 'Item was not found. Please try again.',
        type: 'error',
      });
    }
    setShowAddItemDialog(false);
  };

  // Adjust quantity dialog
  const [adjustQuantityDialogProductId, setAdjustQuantityDialogProductId] =
    useState<string>();
  const onCartItemPressed = (productId: string) => {
    setAdjustQuantityDialogProductId(productId);
  };
  const onSaveNewQuantityPressed = (newQuantity: number) => {
    if (!adjustQuantityDialogProductId) {
      console.error('Attempting to save new quantity without product ID state');
      return;
    }
    updateCart(adjustQuantityDialogProductId, newQuantity);
    setAdjustQuantityDialogProductId(undefined);
    setToastContent({
      message: 'Quantity updated.',
      type: 'success',
    });
  };
  const onDeleteItemPressed = () => {
    if (!adjustQuantityDialogProductId) {
      console.error('Attempting to delete product without product ID state');
      return;
    }
    updateCart(adjustQuantityDialogProductId, 0);
    setAdjustQuantityDialogProductId(undefined);
    setToastContent({
      message: 'Item deleted.',
      type: 'success',
    });
  };

  return (
    <Screen height="100%" useSafeArea>
      {/*Toast*/}
      <Toast content={toastContent} setContent={setToastContent} />
      {/*Adjust Qty Dialog*/}
      <AdjustQuantityDialog
        visible={!!adjustQuantityDialogProductId}
        onDismiss={() => setAdjustQuantityDialogProductId(undefined)}
        initialQuantity={
          adjustQuantityDialogProductId
            ? getCartQuantity(adjustQuantityDialogProductId)
            : 0
        }
        onSaveNewQuantityPressed={onSaveNewQuantityPressed}
        onDeleteItemPressed={onDeleteItemPressed}
      />
      {/*Add Item scanner dialog*/}
      <AddItemScannerDialog
        visible={showAddItemDialog}
        onDismiss={() => setShowAddItemDialog(false)}
        onBarcodeScanned={onBarcodeScanned}
      />
      {/*Scrollable Content*/}
      <ScrollView>
        <MerchantProfileRow merchant={merchant} />
        <Divider width="100%" />
        <View padding-medium paddingB-largest>
          {/*Header with Total*/}
          <TotalCostHeader totalAmount={getTotal().amount} />
          {/*Cart View, with extra bottom padding for checkout button*/}
          <View paddingB-largest>
            <ShoppingCartSection onCartItemPressed={onCartItemPressed} />
          </View>
        </View>
      </ScrollView>
      {/*Bottom action button for adding items*/}
      <BottomFloatingButton
        visible
        onButtonPress={() => setShowAddItemDialog(true)}
      >
        <View row center>
          <MaterialIcons
            name="add"
            size={AppSpacings.iconSmall}
            color={AppColors.text}
            style={{ marginRight: 4 }}
          />
          <Text onSecondaryButton>Add Item</Text>
        </View>
      </BottomFloatingButton>
    </Screen>
  );
};

export default ShoppingCartScreen;
