import React, { createContext, useContext, useState } from 'react';
import Cost from '../models/Cost';
import Merchant from '../models/Merchant';
import { Cart } from '../models/Cart';

import { get } from 'lodash';
import Product from '../models/Product';

export type ShoppingContextData = {
  shoppingType: ShoppingType;
  setShoppingType(newVal: ShoppingType): void;
  tipEnabled: boolean;
  setTipEnabled(newVal: boolean): void;
  tipAmount: number;
  setTipAmount(newVal: number): void;
  merchant?: Merchant; // Read only
  setMerchant(merchant?: Merchant): void;
  getProduct(productId: string): Product | undefined;
  cart: Cart; // Read only
  getCartQuantity(productId: string): number;
  updateCart(productId: string, newQuantity: number): void;
  setCart(newCart: Cart): void;
  resetShoppingContext(): void;
  getTotal(): Cost;
  getTotalWithTip(): Cost;
  transactionId?: string;
  setTransactionId(transactionId: string): void;
};

const defaultShoppingContext: ShoppingContextData = {
  shoppingType: 'shop',
  setShoppingType() {},
  tipEnabled: false,
  setTipEnabled() {},
  tipAmount: 0,
  setTipAmount() {},
  setMerchant() {},
  getProduct() {
    return undefined;
  },
  cart: {},
  updateCart() {},
  setCart() {},
  getCartQuantity() {
    return 0;
  },
  getTotal(): Cost {
    return {
      amount: 0,
      currency: '',
    };
  },
  getTotalWithTip(): Cost {
    return {
      amount: 0,
      currency: '',
    };
  },
  resetShoppingContext() {},
  setTransactionId() {},
};
export const ShoppingContext = createContext<ShoppingContextData>(
  defaultShoppingContext
);

type ShoppingType = 'shop' | 'order';

export const ShoppingContextProvider: React.FC = ({ children }) => {
  const [shoppingType, setShoppingType] = useState<ShoppingType>('shop');
  const [tipEnabled, setTipEnabled] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [merchant, setMerchant] = useState<Merchant>();
  const [cart, setCart] = useState<Cart>({});
  const [transactionId, setTransactionId] = useState<string>();

  const getProduct = (productId: string): Product | undefined => {
    console.log('Getting product with ID', productId);
    return get(merchant, ['products', productId]);
  };

  const updateCart = (productId: string, newQuantity: number) => {
    // Only update if the product exists in the merchant products mapping
    if (!getProduct(productId)) {
      return;
    }

    if (newQuantity > 0) {
      // Update quantity, keeping old items
      setCart((prevCart) => {
        return {
          ...prevCart,
          [productId]: {
            quantity: newQuantity,
          },
        };
      });
    } else {
      // Deleting the item from the cart
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      });
    }
  };

  const getCartQuantity = (productId: string): number => {
    console.debug('Getting cart quantity with product ID', productId);
    return get(cart, [productId, 'quantity'], 0);
  };

  const getTotal = (): Cost => {
    // Assumes all in USD
    const totalAmount = Object.keys(cart).reduce(
      (currAmount: number, productIdKey) => {
        const product = getProduct(productIdKey);
        const cartItem = cart[productIdKey];

        if (product) {
          return currAmount + product.cost.amount * cartItem.quantity;
        }

        return currAmount;
      },
      0
    );

    return {
      amount: totalAmount,
      currency: 'USD',
    };
  };

  const getTotalWithTip = (): Cost => {
    const totalCost = getTotal();
    return {
      ...totalCost,
      amount: tipAmount + totalCost.amount,
    };
  };

  // Resets shopping context, conditionally setting merchant to null to ensure that useShoppingContextWithMerchant works
  const resetShoppingContext = (resetMerchant: boolean = false) => {
    setCart({});
    resetMerchant && setMerchant(undefined);
    setTransactionId(undefined);
  };

  return (
    <ShoppingContext.Provider
      value={{
        ...defaultShoppingContext,
        shoppingType,
        setShoppingType,
        tipEnabled,
        setTipEnabled,
        tipAmount,
        setTipAmount,
        merchant,
        setMerchant,
        getProduct,
        cart,
        updateCart,
        setCart,
        resetShoppingContext,
        getCartQuantity,
        getTotal,
        getTotalWithTip,
        transactionId,
        setTransactionId,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShoppingContextWithMerchant =
  (): Required<ShoppingContextData> => {
    const shoppingContext = useContext(ShoppingContext);
    if (shoppingContext.merchant == null) {
      throw Error('Merchant is null!');
    }
    return shoppingContext as Required<ShoppingContextData>;
  };
