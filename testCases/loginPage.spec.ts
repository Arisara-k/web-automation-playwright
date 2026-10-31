/****
 * Test Tags:
 * Purpose: @functional (core feature), @regression (prevent regressions), @smoke (critical path)
 * Priority: @critical (high impact), @high (main flows), @medium (validations/filters), @low (minor UI/edges)
 */

import { LOGIN_PAGE_EXPECTED } from "@globalVariable";
import { LoginPage } from "@index";
import { test } from "@playwright/test";

let onLoginPage: LoginPage;
const testData = require("@resources/dataTest/loginPage.json");

test.describe("Verify component and functionality on Login page", () => {
  test.beforeEach(async ({ page }) => {
    onLoginPage = new LoginPage(page);
    await onLoginPage.goto();
  });

  test("Verify login form elements match design", { tag: ["@smoke", "@high"] }, async () => {
    await onLoginPage.verifyLoginFormVisible();
  });

  test("Verify error when username and password are blank", { tag: ["@functional", "@high"] }, async () => {
    await onLoginPage.clickLogin();
    await onLoginPage.verifyErrorMessage(LOGIN_PAGE_EXPECTED.txtErrorUsernameRequired);
  });

  test("Verify error when password is blank", { tag: ["@functional", "@medium"] }, async () => {
    await onLoginPage.fillUsername(testData.validUser.username);
    await onLoginPage.clickLogin();
    await onLoginPage.verifyErrorMessage(LOGIN_PAGE_EXPECTED.txtErrorPasswordRequired);
  });

  test("Verify user can login successfully with valid credentials", { tag: ["@smoke", "@critical"] }, async () => {
    await onLoginPage.login(testData.validUser.username, testData.validUser.password);
    await onLoginPage.verifyLoginSuccess();
  });

  test("Verify error when credentials do not match any user", { tag: ["@regression", "@medium"] }, async () => {
    await onLoginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    await onLoginPage.verifyErrorMessage(LOGIN_PAGE_EXPECTED.txtErrorInvalidCredentials);
  });

  test("Verify locked out user cannot login", { tag: ["@regression", "@high"] }, async () => {
    await onLoginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password);
    await onLoginPage.verifyErrorMessage(LOGIN_PAGE_EXPECTED.txtErrorLockedOut);
  });

  test("Verify error message can be dismissed", { tag: ["@functional", "@low"] }, async () => {
    await onLoginPage.clickLogin();
    await onLoginPage.verifyErrorMessage(LOGIN_PAGE_EXPECTED.txtErrorUsernameRequired);
    await onLoginPage.dismissError();
    await onLoginPage.verifyErrorDismissed();
  });
});
