/**
 * Static expected UI copy for the Checkout flow (SauceDemo)
 * Declare as `as const` to preserve strict literal types.
 */
export const CHECKOUT_INFO_EXPECTED = {
  txtTitle: "Checkout: Your Information",
  txtErrorFirstNameRequired: "Error: First Name is required",
  txtErrorLastNameRequired: "Error: Last Name is required",
  txtErrorPostalCodeRequired: "Error: Postal Code is required",
  urlStepTwo: "/checkout-step-two.html"
} as const;

export const CHECKOUT_OVERVIEW_EXPECTED = {
  txtTitle: "Checkout: Overview",
  txtPaymentInfoLabel: "Payment Information:",
  txtPaymentInfoValue: "SauceCard #31337",
  txtShippingInfoLabel: "Shipping Information:",
  txtShippingInfoValue: "Free Pony Express Delivery!",
  txtTotalInfoLabel: "Price Total",
  txtSubtotalPrefix: "Item total: $",
  txtTaxPrefix: "Tax: $",
  txtTotalPrefix: "Total: $",
  taxRate: 0.08,
  urlComplete: "/checkout-complete.html"
} as const;

export const CHECKOUT_COMPLETE_EXPECTED = {
  txtTitle: "Checkout: Complete!",
  txtCompleteHeader: "Thank you for your order!",
  txtCompleteText: "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
} as const;
