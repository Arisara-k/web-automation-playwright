import { BaseLocator } from "@index";
import type { Locator } from "@playwright/test";

/**
 * CheckoutCompleteLocator - Contains all element selectors for the Checkout "Complete" page
 */
export class CheckoutCompleteLocator extends BaseLocator {
  // Section: Header
  get header() {
    return {
      title: this.getByTestId("title")
    };
  }

  // Section: Content
  get content() {
    return {
      completeHeader: this.getByTestId("complete-header"),
      completeText: this.getByTestId("complete-text")
    };
  }

  get backHomeButton(): Locator {
    return this.getByTestId("back-to-products");
  }
}
