# Rapyd OnePay

A unified checkout solution for seamless brick & mortar commerce. This is a hackathon submission
to the [Rapyd Fintech Grand Prix Hackathon](https://rapydhack.devpost.com/).

[Devpost Submission Page](https://devpost.com/software/rapyd-onepay)

[Youtube Demo](https://youtu.be/6Bm5xdSjMv8)

#### Demo Application

**Mobile**

The `mobile/` directory hosts a React Native application for the Rapyd OnePay demo. It is bootstrapped with [Expo](https://expo.io/).
Test barcodes can be found in the `test-barcodes/` directory.

**Web (REST API)**

This is a [Next.js](https://nextjs.org/) project serving as a REST API for the Rapyd OnePay
mobile app. It is currently hosted on Vercel.

To run the project locally, create a `.env` file in the root of `web/`, with the following keys:
`RAPYD_ACCESS_KEY`, `RAPYD_SECRET_KEY`.

## Why?

Online eCommerce is rewarding and seamless. Technologies developed by companies such as Rapyd have enabled digital checkout to be optimized for speed and customer satisfaction.

But brick & mortar shopping is a completely different story. Think back to the last time that you've waited _way_ too long at the checkout queue, or the drawn-out delay for the next available credit card machine when paying for your restaurant bill. Compared to digital payments, in-person commerce seems antiquated and slow.

It doesn't have to be. By integrating physical experiences with digital tools, retailers & service providers have the opportunity to streamline the in-person experience. This process starts with a **global** payments company - one such as Rapyd.

eCommerce makes up only [20% of total retail sales](https://www.statista.com/statistics/534123/e-commerce-share-of-retail-sales-worldwide/), making in-person retail a large opportunity space for growing technology companies. The COVID-19 pandemic has also accelerated the adoption of digital tools. With the transition back into physical retail, this is a unique time to reimagine in-person commerce.

So instead of attempting to introduce yet _another_ product into the ever-crowded eCommerce space. I asked - how can we reinvent physical checkout?

## How?

Rapyd OnePay is a unified and cross-platform payment solution. Users create a Rapyd OnePay account and link their preferred payment methods (including the ability to create and fund a Rapyd eWallet). They can then use the OnePay app to checkout at **all** participating physical locations and online stores.

**Shopping In-Store?**

Scan a store's QR code to begin shopping -> Scan product barcodes with your phone -> Checkout directly in app

**Dining out?**

Get a Rapyd QR code with the bill -> Scan the QR code within the app -> Add a tip, and pay right away

**Shopping online?**

Login with your OnePay account to pay directly, or scan the QR on the checkout page to send a payment instantly

Integration with Rapyd ensures that customers have a familiar payment interface regardless of which website they visit or where they travel. Rapyd's payment API's also enable automatic FX - so users can pay with any linked payment method, no matter if they're dining out on a vacation to Italy or buying groceries at their neighbourhood Trader Joe's.

## What's Next?

Making Rapyd OnePay a reality is more than building an application on top of existing Rapyd API's. I would love to work with the Rapyd team to enable the ability for customers to access a unified & streamlined checkout experience **across** Rapyd merchants.

OnePay has the opportunity to grow beyond a checkout-only workflow. For example, retailers could integrate with their own rewards system, or offer exclusive discounts to Rapyd customers. There are also opportunities to augment the current in-store shopping experience, such as leveraging user data to enable in-app product recommendations.

## App Demos

The Expo-published project connects to a Next.js REST server deployed on Vercel. On each scanner screen, test buttons are added to simulate scanning certain barcodes - this is so that you can demo the app on an emulator (which doesn't support camera functions).

