import React from 'react';

import { Text, View } from 'react-native-ui-lib';
import CartItemRow, { CartItemRowProps } from '../../../components/CartItemRow';
import { useShoppingContextWithMerchant } from '../../../context/ShoppingContext';
import { AppSpacings } from '../../../util/theme/spacing';

// Placeholder when there are no current items
const EmptyCartPromptView = () => {
  return (
    <View height="100%" center paddingH-largest>
      <Text center sizeLarge>
        Add items to your cart by scanning their barcode.
      </Text>
    </View>
  );
};

type Props = {
  onCartItemPressed?(productId: string): void;
};

const ShoppingCartSection: React.FC<Props> = ({ onCartItemPressed }) => {
  const { cart, getCartQuantity, getProduct } =
    useShoppingContextWithMerchant();
  const cartProductIds = Object.keys(cart);

  if (cartProductIds.length === 0) {
    return <EmptyCartPromptView />;
  }

  return (
    <View>
      <Text weightBold sizeMedium marginB-medium>
        Your Cart
      </Text>
      {cartProductIds.map((productId, index) => {
        const product = getProduct(productId)!; // Assume that we only add items to cart when they exist as a product
        const quantity = getCartQuantity(productId);

        const rowProps: CartItemRowProps = {
          name: product.name,
          quantity,
          price: product.cost.amount,
          onPress() {
            onCartItemPressed?.(productId);
          },
        };

        // Render row component
        return (
          <CartItemRow
            key={productId}
            {...rowProps}
            containerStyles={{
              marginBottom: AppSpacings.small,
            }}
          />
        );
      })}
    </View>
  );
};

export default ShoppingCartSection;
