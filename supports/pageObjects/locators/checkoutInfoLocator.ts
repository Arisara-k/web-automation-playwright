import { BaseLocator } from "@index";

/**
 * CheckoutInfoLocator - Contains all element selectors for the Checkout "Your Information" page
 */
export class CheckoutInfoLocator extends BaseLocator {
  // Section: Header
  get header() {
    return {
      title: this.getByTestId("title")
    };
  }

  // Section: Form Elements
  get form() {
    return {
      firstNameField: this.getByTestId("firstName"),
      lastNameField: this.getByTestId("lastName"),
      postalCodeField: this.getByTestId("postalCode"),
      continueButton: this.getByTestId("continue"),
      cancelButton: this.getByTestId("cancel")
    };
  }

  // Section: Feedback & Alerts
  get feedback() {
    return {
      errorMessage: this.getByTestId("error")
    };
  }
}
