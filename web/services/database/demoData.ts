import DatabaseSchema from './databaseSchema';

const demoData: DatabaseSchema = {
  merchants: {
    // Shopping flow
    '64ab7cab-0766-4235-819f-7abc96c69c9b': {
      name: 'Neighbourhood Grocer',
      brandPhotoUrl:
        'https://i.pinimg.com/originals/b2/d2/d8/b2d2d8c091b581e5c0d7298b805d18c0.png',
      eWalletId: 'ewallet_a284fc97f67e2805a4aeee7244516f72',
      products: {
        'd29a53fb-322b-463c-99dd-13d955f3b5c2': {
          name: 'OurBrand Oatmeal',
          cost: {
            amount: 2.99,
            currency: 'USD',
          },
        },
        '5f575ad3-4832-4df3-a3e4-462b09f0eb42': {
          name: 'Striploin Steak (492g)',
          cost: {
            amount: 13.32,
            currency: 'USD',
          },
        },
        '2f79f446-a78c-404f-8ae5-b979c27997fe': {
          name: 'Organics Marinara Sauce',
          cost: {
            amount: 4.99,
            currency: 'USD',
          },
        },
        '62a8991f-d283-4bfd-b02f-e91f3ec9d76a': {
          name: 'Whole Wheat Pasta',
          cost: {
            amount: 8.99,
            currency: 'USD',
          },
        },
      },
    },
    // Restaurant flow
    '29377d26-2b59-4dcb-b1f1-6139bdb8c039': {
      name: 'Gotham Steakhouse',
      brandPhotoUrl:
        'https://gothamsteakhouse.com/-/media/gotham-opengraph.jpg',
      eWalletId: 'ewallet_a284fc97f67e2805a4aeee7244516f72',
      products: {
        '615d1d67-3507-4fc7-937d-b9b4300e79bf': {
          name: 'Pasta Bolognese',
          cost: {
            amount: 20,
            currency: 'USD',
          },
        },
        '5f0b1ef3-73a0-4041-8072-ff09c472a0d2': {
          name: 'Roasted Vegetables',
          cost: {
            amount: 18,
            currency: 'USD',
          },
        },
        '7f077a4a-571f-4554-bd3e-e2765840d2b7': {
          name: '12 oz. Rib-Eye Steak',
          cost: {
            amount: 48,
            currency: 'USD',
          },
        },
      },
    },
  },
  customers: {
    '447364c7-36f9-4a45-b424-ffde62bfaee4': {
      rapydCustomerId: 'cus_a9afcf0ffd1cd7020d2650df9514397c',
      name: 'Frank Jia',
      email: 'jiafrank98@gmail.com',
    },
  },
  orders: {
    '52aa3441-7d18-4ca9-b96e-a2a0d52c1c79': {
      merchantId: '29377d26-2b59-4dcb-b1f1-6139bdb8c039',
      tipEnabled: true,
      items: {
        '7f077a4a-571f-4554-bd3e-e2765840d2b7': {
          quantity: 2,
        },
        '615d1d67-3507-4fc7-937d-b9b4300e79bf': {
          quantity: 2,
        },
        '5f0b1ef3-73a0-4041-8072-ff09c472a0d2': {
          quantity: 2,
        },
      },
    },
  },
};

export default demoData;
