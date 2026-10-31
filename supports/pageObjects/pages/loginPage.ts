import { BASE_URL, LOGIN_PAGE_EXPECTED } from "@globalVariable";
import { BasePage, LoginLocator, step } from "@index";
import { expect, type Page } from "@playwright/test";

/**
 * LoginPage Page Object - Encapsulates user actions and assertions for the Login page
 */
export class LoginPage extends BasePage {
  readonly locators: LoginLocator;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocator(page);
  }

  // Actions
  @step("Navigate to login page")
  async goto(): Promise<void> {
    await this.page.goto(BASE_URL);
  }

  @step((...args) => `Fill username > enter "${args[0]}"`)
  async fillUsername(username: string): Promise<void> {
    await this.fillAndVerify(this.locators.form.usernameField, username);
  }

  @step("Fill password")
  async fillPassword(password: string): Promise<void> {
    await this.fillAndVerify(this.locators.form.passwordField, password);
  }

  @step("Click login button")
  async clickLogin(): Promise<void> {
    await this.clickAndWait(this.locators.form.loginButton);
  }

  @step((...args) => `Login with username "${args[0]}"`)
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  @step("Click error message close button")
  async dismissError(): Promise<void> {
    await this.locators.feedback.errorCloseButton.click();
  }

  // Verifications (Named verify* - No raw expect in specs)
  @step("Verify login form elements are displayed properly")
  async verifyLoginFormVisible(): Promise<void> {
    await Promise.all([
      expect(this.locators.form.usernameField).toBeVisible(),
      expect(this.locators.form.passwordField).toBeVisible(),
      expect(this.locators.form.loginButton).toBeVisible()
    ]);
  }

  @step("Verify login succeeded and navigated to the inventory page")
  async verifyLoginSuccess(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${LOGIN_PAGE_EXPECTED.urlInventory}`);
  }

  @step((...args) => `Verify error message is "${args[0]}"`)
  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.locators.feedback.errorMessage).toBeVisible();
    await expect(this.locators.feedback.errorMessage).toHaveText(expectedMessage);
  }

  @step("Verify error message is dismissed")
  async verifyErrorDismissed(): Promise<void> {
    await expect(this.locators.feedback.errorMessage).toBeHidden();
  }
}
