/****
 * Test Tags:
 * Purpose: @functional (core feature), @regression (prevent regressions), @smoke (critical path)
 * Priority: @critical (high impact), @high (main flows), @medium (validations/filters), @low (minor UI/edges)
 */

import { CHECKOUT_INFO_EXPECTED } from "@globalVariable";
import { CartPage, CheckoutInfoPage, LoginPage, ProductsPage } from "@index";
import { test } from "@playwright/test";

let onLoginPage: LoginPage;
let onProductsPage: ProductsPage;
let onCartPage: CartPage;
let onCheckoutInfoPage: CheckoutInfoPage;
const loginData = require("@resources/dataTest/loginPage.json");
const productsData = require("@resources/dataTest/productsPage.json");
const checkoutData = require("@resources/dataTest/checkoutPage.json");

test.describe("Verify component and functionality on Checkout Information page", () => {
  test.beforeEach(async ({ page }) => {
    onLoginPage = new LoginPage(page);
    onProductsPage = new ProductsPage(page);
    onCartPage = new CartPage(page);
    onCheckoutInfoPage = new CheckoutInfoPage(page);

    await onLoginPage.goto();
    await onLoginPage.login(loginData.validUser.username, loginData.validUser.password);
    await onProductsPage.addToCart(productsData.targetProduct.slug);
    await onProductsPage.clickCartIcon();
    await onCartPage.clickCheckout();
  });

  test("Verify checkout information form elements match design", { tag: ["@smoke", "@high"] }, async () => {
    await onCheckoutInfoPage.verifyPageVisible();
  });

  test("Verify error when all fields are blank", { tag: ["@functional", "@high"] }, async () => {
    await onCheckoutInfoPage.clickContinue();
    await onCheckoutInfoPage.verifyErrorMessage(CHECKOUT_INFO_EXPECTED.txtErrorFirstNameRequired);
  });

  test("Verify error when last name is blank", { tag: ["@functional", "@medium"] }, async () => {
    await onCheckoutInfoPage.fillFirstName(checkoutData.validCustomer.firstName);
    await onCheckoutInfoPage.clickContinue();
    await onCheckoutInfoPage.verifyErrorMessage(CHECKOUT_INFO_EXPECTED.txtErrorLastNameRequired);
  });

  test("Verify error when zip/postal code is blank", { tag: ["@functional", "@medium"] }, async () => {
    await onCheckoutInfoPage.fillFirstName(checkoutData.validCustomer.firstName);
    await onCheckoutInfoPage.fillLastName(checkoutData.validCustomer.lastName);
    await onCheckoutInfoPage.clickContinue();
    await onCheckoutInfoPage.verifyErrorMessage(CHECKOUT_INFO_EXPECTED.txtErrorPostalCodeRequired);
  });

  test("Verify user can continue to the overview page with valid information", {
    tag: ["@smoke", "@critical"]
  }, async () => {
    await onCheckoutInfoPage.fillCustomerInfoAndContinue(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );
    await onCheckoutInfoPage.verifyNavigatedToOverview();
  });

  test("Verify clicking Cancel navigates back to the cart page", { tag: ["@regression", "@medium"] }, async () => {
    await onCheckoutInfoPage.clickCancel();
    await onCheckoutInfoPage.verifyNavigatedToCart();
  });
});
