import Merchant from '../models/Merchant';

export const mockMerchant: Merchant = {
  id: '64ab7cab-0766-4235-819f-7abc96c69c9b',
  name: 'Neighbourhood Grocer',
  brandPhotoUrl:
    'https://i.pinimg.com/originals/b2/d2/d8/b2d2d8c091b581e5c0d7298b805d18c0.png',
  eWalletId: 'ewallet_a284fc97f67e2805a4aeee7244516f72',
  products: {
    'd29a53fb-322b-463c-99dd-13d955f3b5c2': {
      name: 'OurBrand Oatmeal',
      price: 2.99,
      currency: 'USD',
    },
    '5f575ad3-4832-4df3-a3e4-462b09f0eb42': {
      name: 'Striploin Steak (492g)',
      price: 13.32,
      currency: 'USD',
    },
    '2f79f446-a78c-404f-8ae5-b979c27997fe': {
      name: 'Organics Marinara Sauce',
      price: 4.99,
      currency: 'USD',
    },
    '62a8991f-d283-4bfd-b02f-e91f3ec9d76a': {
      name: 'Whole Wheat Pasta',
      price: 8.99,
      currency: 'USD',
    },
  },
};
