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

test.describe("Verify end-to-end purchase flow from Login to Checkout", () => {
  test.beforeEach(async ({ page }) => {
    onLoginPage = new LoginPage(page);
    onProductsPage = new ProductsPage(page);
    onCartPage = new CartPage(page);
    onCheckoutInfoPage = new CheckoutInfoPage(page);
    onCheckoutOverviewPage = new CheckoutOverviewPage(page);
    onCheckoutCompletePage = new CheckoutCompletePage(page);

    await onLoginPage.goto();
    await onLoginPage.login(loginData.validUser.username, loginData.validUser.password);
  });

  test("Verify user can complete a full purchase journey and return to the products page", {
    tag: ["@smoke", "@critical"]
  }, async () => {
    await onProductsPage.addToCart(productsData.targetProduct.slug);
    await onProductsPage.clickCartIcon();
    await onCartPage.clickCheckout();
    await onCheckoutInfoPage.fillCustomerInfoAndContinue(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );
    await onCheckoutOverviewPage.clickFinish();
    await onCheckoutCompletePage.verifyCompletePageVisible();
    await onCheckoutCompletePage.clickBackHome();
    await onCheckoutCompletePage.verifyNavigatedToInventory();
  });

  test("Verify item remains in the cart after cancelling checkout midway", {
    tag: ["@regression", "@medium"]
  }, async () => {
    await onProductsPage.addToCart(productsData.targetProduct.slug);
    await onProductsPage.clickCartIcon();
    await onCartPage.clickCheckout();
    await onCheckoutInfoPage.clickCancel();
    await onCartPage.verifyItemInCartList(
      productsData.targetProduct.name,
      productsData.targetProduct.price,
      productsData.defaultItemQuantity
    );
  });
});
