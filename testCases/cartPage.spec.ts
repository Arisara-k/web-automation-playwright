/****
 * Test Tags:
 * Purpose: @functional (core feature), @regression (prevent regressions), @smoke (critical path)
 * Priority: @critical (high impact), @high (main flows), @medium (validations/filters), @low (minor UI/edges)
 */

import { CartPage, LoginPage, ProductsPage } from "@index";
import { test } from "@playwright/test";

let onLoginPage: LoginPage;
let onProductsPage: ProductsPage;
let onCartPage: CartPage;
const loginData = require("@resources/dataTest/loginPage.json");
const productsData = require("@resources/dataTest/productsPage.json");

test.describe("Verify component and functionality on Cart page", () => {
  test.beforeEach(async ({ page }) => {
    onLoginPage = new LoginPage(page);
    onProductsPage = new ProductsPage(page);
    onCartPage = new CartPage(page);

    await onLoginPage.goto();
    await onLoginPage.login(loginData.validUser.username, loginData.validUser.password);
    await onProductsPage.addToCart(productsData.targetProduct.slug);
    await onProductsPage.addToCart(productsData.secondProduct.slug);
    await onProductsPage.clickCartIcon();
  });

  test("Verify cart page elements and items match design", { tag: ["@smoke", "@high"] }, async () => {
    await onCartPage.verifyCartPageVisible();
    await onCartPage.verifyItemInCartList(
      productsData.targetProduct.name,
      productsData.targetProduct.price,
      productsData.defaultItemQuantity
    );
    await onCartPage.verifyItemInCartList(
      productsData.secondProduct.name,
      productsData.secondProduct.price,
      productsData.defaultItemQuantity
    );
  });

  test("Verify user can remove one item from the cart", { tag: ["@regression", "@high"] }, async () => {
    await onCartPage.removeItem(productsData.secondProduct.slug);
    await onCartPage.verifyItemRemovedFromCart(productsData.secondProduct.slug);
    await onCartPage.verifyCartBadgeCount(productsData.defaultItemQuantity);
  });

  test("Verify cart becomes empty after removing all items", { tag: ["@regression", "@medium"] }, async () => {
    await onCartPage.removeItem(productsData.targetProduct.slug);
    await onCartPage.removeItem(productsData.secondProduct.slug);
    await onCartPage.verifyCartEmpty();
  });

  test("Verify clicking Continue Shopping navigates back to the products page", {
    tag: ["@regression", "@medium"]
  }, async () => {
    await onCartPage.clickContinueShopping();
    await onCartPage.verifyNavigatedToInventory();
  });

  test("Verify clicking Checkout navigates to the checkout page", { tag: ["@smoke", "@critical"] }, async () => {
    await onCartPage.clickCheckout();
    await onCartPage.verifyNavigatedToCheckout();
  });
});
