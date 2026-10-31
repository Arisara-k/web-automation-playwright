import type { Locator, Page } from "@playwright/test";

/**
 * LoginLocator - Contains all element selectors for the Login page
 */
export class LoginLocator {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  // Section: Form Elements
  get form() {
    return {
      usernameField: this.getByTestId("username"),
      passwordField: this.getByTestId("password"),
      loginButton: this.getByTestId("login-button")
    };
  }

  // Section: Feedback & Alerts
  get feedback() {
    return {
      errorMessage: this.getByTestId("error"),
      errorCloseButton: this.getByTestId("error-button")
    };
  }
}
