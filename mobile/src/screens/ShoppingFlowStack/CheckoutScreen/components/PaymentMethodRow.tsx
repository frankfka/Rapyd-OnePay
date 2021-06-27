import { ViewStyle } from 'react-native';
import { RapydWallet } from '../../../../models/RapydWallet';
import { RapydCardPaymentMethod } from '../../../../models/RapydPaymentMethod';
import React from 'react';
import { Text, View, Avatar } from 'react-native-ui-lib';
import { Image } from 'react-native';
import { AppColors } from '../../../../util/theme/colors';
import { AppSpacings } from '../../../../util/theme/spacing';

// Logo for Rapyd Payment method
const RAPYD_LOGO_URI =
  'https://www.rapyd.net/wp-content/uploads/2019/09/rapyd-logo-png.png';

/*
Util functions to get props from payment methods
 */

export const getPaymentMethodRowPropsFromRapydWallet = (
  rapydWalletData: RapydWallet
): PaymentMethodRowProps => {
  // Assume only 1 account in USD - in the future, we'd want to find the account that matches the
  // currency of the transaction
  const balance = rapydWalletData.accounts[0].balance;
  const currency = rapydWalletData.accounts[0].currency;
  return {
    id: rapydWalletData.walletId,
    imageUrl: RAPYD_LOGO_URI,
    mainText: `$${balance} ${currency}`,
    secondaryText: 'Current Balance',
  };
};

export const getPaymentMethodRowPropsFromCardPayment = (
  creditCardData: RapydCardPaymentMethod
): PaymentMethodRowProps => {
  return {
    id: creditCardData.id,
    imageUrl: creditCardData.imageUrl,
    mainText: `Ending in ${creditCardData.lastFourDigits}`,
    secondaryText: `Exp: ${creditCardData.expMonth}/${creditCardData.expYear}`,
  };
};

export const getPlaceholderPaymentMethodRowProps =
  (): PaymentMethodRowProps => {
    return {
      id: 'none-selected',
      imageUrl: RAPYD_LOGO_URI,
      mainText: `None Selected`,
    };
  };

/*
Main Component
 */

export type PaymentMethodRowProps = {
  id: string;
  imageUrl: string;
  mainText: string;
  secondaryText?: string;
  containerStyles?: ViewStyle;
};

const PaymentMethodRow: React.FC<PaymentMethodRowProps> = ({
  imageUrl,
  mainText,
  secondaryText,
  containerStyles,
}: PaymentMethodRowProps) => {
  return (
    <View
      row
      center
      paddingV-medium
      paddingH-medium
      backgroundColor={AppColors.background}
      style={{
        borderRadius: AppSpacings.borderRadiusSmall,
        ...containerStyles,
      }}
    >
      {/*Card Image*/}
      <View left centerV>
        <Avatar
          // @ts-ignore
          imageProps={{ resizeMode: 'contain' }}
          source={{
            uri: imageUrl,
          }}
          size={AppSpacings.iconLarge}
        />
      </View>
      {/*Middle Spacer*/}
      <View flexG />
      {/*Credit Card Info*/}
      <View right>
        <Text weightMedium>{mainText}</Text>
        {secondaryText && (
          <Text sizeSmall weightLight>
            {secondaryText}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PaymentMethodRow;
