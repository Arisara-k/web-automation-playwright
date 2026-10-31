/****
 * Test Tags:
 * Purpose: @functional (core feature), @regression (prevent regressions), @smoke (critical path)
 * Priority: @critical (high impact), @high (main flows), @medium (validations/filters), @low (minor UI/edges)
 */

import { LoginPage, ProductsPage } from "@index";
import { test } from "@playwright/test";

let onLoginPage: LoginPage;
let onProductsPage: ProductsPage;
const loginData = require("@resources/dataTest/loginPage.json");
const productsData = require("@resources/dataTest/productsPage.json");

test.describe("Verify component and functionality on Products page", () => {
  test.beforeEach(async ({ page }) => {
    onLoginPage = new LoginPage(page);
    onProductsPage = new ProductsPage(page);
    await onLoginPage.goto();
    await onLoginPage.login(loginData.validUser.username, loginData.validUser.password);
  });

  test("Verify products page elements match design", { tag: ["@smoke", "@high"] }, async () => {
    await onProductsPage.verifyProductsPageVisible();
  });

  test("Verify user can add a product to the cart", { tag: ["@smoke", "@critical"] }, async () => {
    await onProductsPage.addToCart(productsData.targetProduct.slug);
    await onProductsPage.verifyItemInCart(
      productsData.targetProduct.slug,
      productsData.targetProduct.cartCountAfterAdd
    );
  });

  test("Verify user can remove a product from the cart", { tag: ["@regression", "@high"] }, async () => {
    await onProductsPage.addToCart(productsData.targetProduct.slug);
    await onProductsPage.removeFromCart(productsData.targetProduct.slug);
    await onProductsPage.verifyItemNotInCart(productsData.targetProduct.slug);
  });

  test("Verify products can be sorted by name (A to Z)", { tag: ["@functional", "@medium"] }, async () => {
    await onProductsPage.selectSort(productsData.sortOptions.nameAsc);
    await onProductsPage.verifySortedByNameAscending();
  });

  test("Verify products can be sorted by name (Z to A)", { tag: ["@functional", "@medium"] }, async () => {
    await onProductsPage.selectSort(productsData.sortOptions.nameDesc);
    await onProductsPage.verifySortedByNameDescending();
  });

  test("Verify products can be sorted by price (low to high)", { tag: ["@functional", "@medium"] }, async () => {
    await onProductsPage.selectSort(productsData.sortOptions.priceAsc);
    await onProductsPage.verifySortedByPriceAscending();
  });

  test("Verify products can be sorted by price (high to low)", { tag: ["@functional", "@medium"] }, async () => {
    await onProductsPage.selectSort(productsData.sortOptions.priceDesc);
    await onProductsPage.verifySortedByPriceDescending();
  });

  test("Verify clicking the cart icon navigates to the cart page", { tag: ["@regression", "@medium"] }, async () => {
    await onProductsPage.clickCartIcon();
    await onProductsPage.verifyNavigatedToCart();
  });
});
