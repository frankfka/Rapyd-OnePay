import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { find } from 'lodash';
import {
  Text,
  View,
  TouchableOpacity,
  LoaderScreen,
  ExpandableSection,
} from 'react-native-ui-lib';
import BottomFloatingButton from '../../../components/BottomFloatingButton';
import CartItemRow, { CartItemRowProps } from '../../../components/CartItemRow';
import MerchantProfileRow from '../../../components/MerchantProfileRow';
import NavigationBarButton from '../../../components/NavigationBarButton';
import Screen from '../../../components/Screen';
import Divider from '../../../components/Divider';
import Toast, { ToastContent } from '../../../components/Toast';
import TotalCostHeader from '../../../components/TotalCostHeader';
import { useShoppingContextWithMerchant } from '../../../context/ShoppingContext';
import { UserContext } from '../../../context/UserContext';
import Cost from '../../../models/Cost';
import { RapydCardPaymentMethod } from '../../../models/RapydPaymentMethod';
import apiService from '../../../services/apiService';
import getFormattedCostAmount from '../../../util/getFormattedCostAmount';
import { AppColors } from '../../../util/theme/colors';
import { AppSpacings } from '../../../util/theme/spacing';
import { CheckoutScreenNavigationProp } from '../ShoppingFlowStackTypes';
import PaymentMethodRow, {
  getPaymentMethodRowPropsFromCardPayment,
  getPaymentMethodRowPropsFromRapydWallet,
  getPlaceholderPaymentMethodRowProps,
  PaymentMethodRowProps,
} from './components/PaymentMethodRow';
import PaymentMethodPickerDialog from './components/PaymentMethodPickerDialog';
import TipSelect from './components/TipSelect';

/**
 * Main checkout screen
 * TODO: Tips
 */
const CheckoutScreen = () => {
  const {
    shoppingType,
    tipEnabled,
    setTipAmount,
    getTotal,
    getTotalWithTip,
    getProduct,
    merchant,
    cart,
    setTransactionId,
    resetShoppingContext,
  } = useShoppingContextWithMerchant();
  const totalCost = getTotal();
  const totalCostWithTip = getTotalWithTip();

  const navigation = useNavigation<CheckoutScreenNavigationProp>();

  // Change header button depending on shopping type
  useLayoutEffect(() => {
    if (shoppingType === 'order') {
      navigation.setOptions({
        gestureEnabled: false,
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
      });
    } else {
      navigation.setOptions({
        gestureEnabled: true,
        headerLeft: () => (
          <NavigationBarButton
            marginL-s3
            label="Cart"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={AppSpacings.iconSmall}
                color={AppColors.primary}
              />
            </View>
          </NavigationBarButton>
        ),
      });
    }
  }, [shoppingType]);

  const {
    fetchLatestCustomerData,
    latestCustomerData,
    customerId,
    isFetchingLatestCustomerData,
  } = useContext(UserContext);

  // Toast
  const [toastContent, setToastContent] = useState<ToastContent | undefined>();

  // Expandable cart
  const [isCartSectionExpanded, setIsCartSectionExpanded] = useState(true);
  const toggleIsCartSectionExpanded = () => setIsCartSectionExpanded((v) => !v);

  // Payment status
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  // Hide title and swipe back when processing payment
  useLayoutEffect(() => {
    const enableNavigation = !isProcessingPayment;

    navigation.setOptions({
      headerShown: enableNavigation,
      gestureEnabled: enableNavigation && shoppingType === 'shop',
    });
  }, [navigation, isProcessingPayment]);

  // Fetch latest user data on load
  useEffect(() => {
    fetchLatestCustomerData();
  }, []);

  // State for payment method selection
  const [showSelectPaymentMethodDialog, setShowSelectPaymentMethodDialog] =
    useState(false);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(
    latestCustomerData?.eWallet?.walletId
  );
  // On load, set default payment ID to the eWallet
  useEffect(() => {
    if (latestCustomerData) {
      setSelectedPaymentMethodId(latestCustomerData.eWallet.walletId);
    }
  }, [latestCustomerData]);

  // Generic loading screen for fetching initial customer data
  if (isFetchingLatestCustomerData || latestCustomerData == null) {
    return <LoaderScreen message="Loading..." />;
  }

  // Parse payment methods into picker options props
  const paymentMethods = latestCustomerData.paymentMethods;
  const eWalletData = latestCustomerData.eWallet;
  const paymentMethodPickerOptions = [
    getPaymentMethodRowPropsFromRapydWallet(eWalletData),
    ...paymentMethods.map((paymentMethod) =>
      getPaymentMethodRowPropsFromCardPayment(
        paymentMethod as RapydCardPaymentMethod
      )
    ),
  ];
  const selectPaymentMethodProps: PaymentMethodRowProps = find(
    paymentMethodPickerOptions,
    (paymentMethodProps) => paymentMethodProps.id === selectedPaymentMethodId
  ) || {
    ...getPlaceholderPaymentMethodRowProps(),
    secondaryText: 'Tap to Select',
  };

  // Calls backend to create a payment request
  const initiatePayment = () => {
    if (selectedPaymentMethodId != null && !isProcessingPayment) {
      setIsProcessingPayment(true);

      apiService
        .createPayment(
          customerId,
          merchant.id,
          totalCostWithTip,
          selectedPaymentMethodId,
          // Hacky check here for payment method
          latestCustomerData.eWallet.walletId === selectedPaymentMethodId
            ? 'rapyd'
            : 'standard'
        )
        .then((result) => {
          console.log('Payment result', result);

          if (!result.paymentId) {
            throw Error('No payment ID in payment result');
          }

          setIsProcessingPayment(false);
          setTransactionId(result.paymentId);
          navigation.navigate('Success');
        })
        .catch((err) => {
          console.error('Payment error', err);
          setToastContent({
            message: 'Something went wrong. Please try again.',
            type: 'error',
          });
          setIsProcessingPayment(false);
        });
    } else {
      console.error('No selected payment method ID');
    }
  };

  return (
    <Screen>
      {/*Payment loader*/}
      {isProcessingPayment && (
        <LoaderScreen
          overlay
          backgroundColor="white"
          message="Processing Your Payment..."
        />
      )}
      {/*Toast*/}
      <Toast setContent={setToastContent} content={toastContent} />
      {/*Select payment method dialog*/}
      <PaymentMethodPickerDialog
        setSelectedPaymentMethodId={(newId) => {
          setSelectedPaymentMethodId(newId);
          setShowSelectPaymentMethodDialog(false);
        }}
        paymentMethodItems={paymentMethodPickerOptions}
        isVisible={showSelectPaymentMethodDialog}
        setIsVisible={setShowSelectPaymentMethodDialog}
      />

      {/*Scrollable content with bottom padding for action button)*/}
      <ScrollView>
        {/*Merchant Profile*/}
        <MerchantProfileRow merchant={merchant} />
        <Divider width="100%" />
        <View padding-s3 paddingB-s10>
          {/*Total Section*/}
          <TotalCostHeader totalAmount={totalCost.amount} />

          {/*Tips*/}
          {tipEnabled && (
            <View marginB-medium>
              <Text weightBold sizeMedium marginB-medium>
                Add a Tip
              </Text>
              <TipSelect
                tipAmountSelected={setTipAmount}
                totalAmount={totalCost.amount}
              />
            </View>
          )}

          {/*Payment Methods*/}
          <View>
            <Text weightBold sizeMedium marginB-medium>
              Payment Method
            </Text>
            <TouchableOpacity
              onPress={() => setShowSelectPaymentMethodDialog(true)}
            >
              <View
                style={{
                  borderRadius: AppSpacings.borderRadiusSmall,
                  borderStyle: 'solid',
                  borderColor: AppColors.divider,
                  borderWidth: StyleSheet.hairlineWidth,
                }}
              >
                <PaymentMethodRow
                  {...selectPaymentMethodProps}
                  containerStyles={{
                    backgroundColor: 'white',
                    paddingVertical: AppSpacings.medium,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/*Cart Section*/}
          <View marginV-large>
            <ExpandableSection
              expanded={isCartSectionExpanded}
              onPress={toggleIsCartSectionExpanded}
              sectionHeader={
                <View marginB-medium>
                  <View row center>
                    <Text weightBold sizeMedium>
                      Your Items
                    </Text>
                    <View flex />
                    <MaterialIcons
                      name={
                        isCartSectionExpanded
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={AppSpacings.iconRegular}
                      color={AppColors.primary}
                    />
                  </View>
                </View>
              }
            >
              {Object.keys(cart).map((productId, index) => {
                const product = getProduct(productId)!;
                const rowProps: CartItemRowProps = {
                  name: product.name,
                  price: product.cost.amount,
                  quantity: cart[productId].quantity,
                };

                return (
                  <CartItemRow
                    {...rowProps}
                    key={productId}
                    containerStyles={{
                      marginBottom: AppSpacings.small,
                    }}
                  />
                );
              })}
            </ExpandableSection>
          </View>
        </View>
      </ScrollView>

      {/*Bottom Action Button to Pay*/}
      <BottomFloatingButton
        visible={selectedPaymentMethodId != null}
        onButtonPress={initiatePayment}
        buttonLabel={`Pay Now | ${getFormattedCostAmount(
          totalCostWithTip.amount
        )}`}
        disabled={isProcessingPayment}
      />
    </Screen>
  );
};

export default CheckoutScreen;
