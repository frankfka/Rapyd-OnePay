import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import BarcodeMask from 'react-native-barcode-mask';

import { Button, LoaderScreen, Text, View } from 'react-native-ui-lib';
import Screen from '../../components/Screen';
import Toast, { ToastContent } from '../../components/Toast';
import { ShoppingContext } from '../../context/ShoppingContext';
import apiService from '../../services/apiService';
import { AppColors } from '../../util/theme/colors';
import { AppSpacings } from '../../util/theme/spacing';

const ScannerScreen: React.FC = () => {
  const { setMerchant, setCart, setTipEnabled, setShoppingType } =
    useContext(ShoppingContext);
  const navigation = useNavigation();
  const isScreenFocused = useIsFocused();

  const [hasScannedBarcode, setHasScannedBarcode] = useState(false);
  const [isLoadingBarcode, setIsLoadingBarcode] = useState(false);

  const [toastContent, setToastContent] = useState<ToastContent | undefined>();

  const onMerchantBarcodeScanned = async (merchantId: string) => {
    const merchantResponse = await apiService.getMerchantDetails(merchantId);
    console.log('Retrieved merchant with result', merchantResponse);

    if (
      merchantResponse != null &&
      merchantResponse.eWalletId &&
      merchantResponse.products
    ) {
      // Merchant found
      setShoppingType('shop');
      setMerchant({ id: merchantId, ...merchantResponse });
      navigation.navigate('ShoppingCart');
    } else {
      throw Error('Merchant response is invalid');
    }
  };

  const onOrderBarcodeScanned = async (orderId: string) => {
    const orderResponse = await apiService.getOrderDetails(orderId);
    console.log('Retrieved order with result', orderResponse);

    if (
      orderResponse != null &&
      Object.keys(orderResponse.items).length > 0 &&
      orderResponse.merchant.eWalletId
    ) {
      // Valid order found
      setShoppingType('order');
      setMerchant({ id: orderResponse.merchantId, ...orderResponse.merchant });
      setCart(orderResponse.items);
      setTipEnabled(orderResponse.tipEnabled);
      navigation.navigate('Checkout');
    } else {
      throw Error('Order response is invalid');
    }
  };

  const onBarcodeScanned: BarCodeScannedCallback = useCallback(
    async (barcodeData) => {
      if (!isScreenFocused || hasScannedBarcode || isLoadingBarcode) {
        return;
      }

      if (barcodeData.type === 'org.iso.QRCode') {
        setIsLoadingBarcode(true);
        setHasScannedBarcode(true);

        const encodedData = barcodeData.data;
        console.log('QR - getting details for barcode', barcodeData.data);

        try {
          const jsonBarcodeData = JSON.parse(encodedData);

          if (jsonBarcodeData.type === 'shop' && jsonBarcodeData.merchantId) {
            // Merchant
            await onMerchantBarcodeScanned(jsonBarcodeData.merchantId);
          } else if (
            jsonBarcodeData.type === 'order' &&
            jsonBarcodeData.orderId
          ) {
            // Order
            await onOrderBarcodeScanned(jsonBarcodeData.orderId);
          }
        } catch (err) {
          // Not a correct barcode
        }

        // Reset state
        setIsLoadingBarcode(false);
        setHasScannedBarcode(false);
      }
    },
    [
      setHasScannedBarcode,
      isScreenFocused,
      isLoadingBarcode,
      onMerchantBarcodeScanned,
    ]
  );

  // Test shim to navigate to shopping cart
  const onTestMerchantPressed = () => {
    onBarcodeScanned({
      type: 'org.iso.QRCode',
      data: '{   "type": "shop",   "merchantId": "64ab7cab-0766-4235-819f-7abc96c69c9b" }',
    });
  };
  const onTestRestaurantPressed = () => {
    onBarcodeScanned({
      type: 'org.iso.QRCode',
      data: '{   "type": "order",   "orderId": "52aa3441-7d18-4ca9-b96e-a2a0d52c1c79" }',
    });
  };

  // If not focused, return an empty screen so we don't keep the camera alive
  if (!isScreenFocused) {
    return <Screen />;
  }

  return (
    <Screen>
      {/*Loader*/}
      {isLoadingBarcode && (
        <LoaderScreen overlay backgroundColor={AppColors.overlay} />
      )}
      {/*Toast*/}
      <Toast setContent={setToastContent} content={toastContent} />
      {/*Barcode Scanner*/}
      <BarCodeScanner onBarCodeScanned={onBarcodeScanned} style={{ flex: 1 }}>
        {/*Mask Overlay*/}
        <BarcodeMask
          showAnimatedLine={false}
          backgroundColor={AppColors.overlay}
          outerMaskOpacity={1} // Overlay uses rbga color
          edgeColor={AppColors.background}
        />

        {/*Close Button*/}
        <View right useSafeArea marginT-largest marginR-large>
          <View
            margin-medium
            padding-small
            backgroundColor={AppColors.overlayPrimary}
            style={{ borderRadius: AppSpacings.borderRadiusSmall }}
          >
            <Button
              link
              linkColor={AppColors.textInverse}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="close"
                color={AppColors.textInverse}
                size={AppSpacings.iconRegular}
              />
            </Button>
          </View>
        </View>

        {/*Helper Text*/}
        <View flex bottom centerH useSafeArea>
          <View
            padding-medium
            marginB-large
            backgroundColor={AppColors.overlayPrimary}
            style={{ borderRadius: AppSpacings.borderRadiusSmall }}
          >
            <Text
              color={AppColors.textInverse}
              textAlign="center"
              weightExtraBold
              sizeLarge
              center
            >
              Scan Rapyd QR to Begin
            </Text>
          </View>
        </View>
      </BarCodeScanner>
      <View useSafeArea marginB-large row center>
        <Button
          onPress={onTestMerchantPressed}
          margin-small
          label="Shop"
          onPrimaryButton
        />
        <Button
          onPress={onTestRestaurantPressed}
          margin-small
          label="Restaurant Order"
          onPrimaryButton
        />
      </View>
    </Screen>
  );
};

export default ScannerScreen;
