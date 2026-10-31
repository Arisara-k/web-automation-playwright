/****
 * Test Tags:
 * Purpose: @functional (core feature), @regression (prevent regressions), @smoke (critical path)
 * Priority: @critical (high impact), @high (main flows), @medium (validations/filters), @low (minor UI/edges)
 */

import {
  CartPage,
  CheckoutCompletePage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  LoginPage,
  ProductsPage
} from "@index";
import { test } from "@playwright/test";

let onLoginPage: LoginPage;
let onProductsPage: ProductsPage;
let onCartPage: CartPage;
let onCheckoutInfoPage: CheckoutInfoPage;
let onCheckoutOverviewPage: CheckoutOverviewPage;
let onCheckoutCompletePage: CheckoutCompletePage;
const loginData = require("@resources/dataTest/loginPage.json");
const productsData = require("@resources/dataTest/productsPage.json");
const checkoutData = require("@resources/dataTest/checkoutPage.json");

test.describe("Verify component and functionality on Checkout Complete page", () => {
  test.beforeEach(async ({ page }) => {
    onLoginPage = new LoginPage(page);
    onProductsPage = new ProductsPage(page);
    onCartPage = new CartPage(page);
    onCheckoutInfoPage = new CheckoutInfoPage(page);
    onCheckoutOverviewPage = new CheckoutOverviewPage(page);
    onCheckoutCompletePage = new CheckoutCompletePage(page);

    await onLoginPage.goto();
    await onLoginPage.login(loginData.validUser.username, loginData.validUser.password);
    await onProductsPage.addToCart(productsData.targetProduct.slug);
    await onProductsPage.clickCartIcon();
    await onCartPage.clickCheckout();
    await onCheckoutInfoPage.fillCustomerInfoAndContinue(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );
    await onCheckoutOverviewPage.clickFinish();
  });

  test("Verify checkout complete page shows the thank you message", { tag: ["@smoke", "@high"] }, async () => {
    await onCheckoutCompletePage.verifyCompletePageVisible();
  });

  test("Verify clicking Back Home navigates to the products page", { tag: ["@regression", "@medium"] }, async () => {
    await onCheckoutCompletePage.clickBackHome();
    await onCheckoutCompletePage.verifyNavigatedToInventory();
  });
});
