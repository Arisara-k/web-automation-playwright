/****
 * Test Tags:
 * Purpose: @functional (core feature), @regression (prevent regressions), @smoke (critical path)
 * Priority: @critical (high impact), @high (main flows), @medium (validations/filters), @low (minor UI/edges)
 */

import { CartPage, CheckoutInfoPage, CheckoutOverviewPage, LoginPage, ProductsPage } from "@index";
import { test } from "@playwright/test";

let onLoginPage: LoginPage;
let onProductsPage: ProductsPage;
let onCartPage: CartPage;
let onCheckoutInfoPage: CheckoutInfoPage;
let onCheckoutOverviewPage: CheckoutOverviewPage;
const loginData = require("@resources/dataTest/loginPage.json");
const productsData = require("@resources/dataTest/productsPage.json");
const checkoutData = require("@resources/dataTest/checkoutPage.json");

test.describe("Verify component and functionality on Checkout Overview page", () => {
  test.beforeEach(async ({ page }) => {
    onLoginPage = new LoginPage(page);
    onProductsPage = new ProductsPage(page);
    onCartPage = new CartPage(page);
    onCheckoutInfoPage = new CheckoutInfoPage(page);
    onCheckoutOverviewPage = new CheckoutOverviewPage(page);

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
  });

  test("Verify order summary displays correct item, payment, shipping and price details", {
    tag: ["@functional", "@high"]
  }, async () => {
    await onCheckoutOverviewPage.verifyOverviewDetails(
      productsData.targetProduct.name,
      productsData.targetProduct.description,
      productsData.targetProduct.price,
      productsData.defaultItemQuantity
    );
  });

  test("Verify user can finish the order and cart is cleared", { tag: ["@smoke", "@critical"] }, async () => {
    await onCheckoutOverviewPage.clickFinish();
    await onCheckoutOverviewPage.verifyNavigatedToComplete();
    await onCheckoutOverviewPage.verifyCartCleared();
  });

  test("Verify clicking Cancel navigates back to the products page", { tag: ["@regression", "@medium"] }, async () => {
    await onCheckoutOverviewPage.clickCancel();
    await onCheckoutOverviewPage.verifyNavigatedToInventory();
  });
});
