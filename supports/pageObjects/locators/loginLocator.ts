import { BaseLocator } from "@index";

/**
 * LoginLocator - Contains all element selectors for the Login page
 */
export class LoginLocator extends BaseLocator {
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
