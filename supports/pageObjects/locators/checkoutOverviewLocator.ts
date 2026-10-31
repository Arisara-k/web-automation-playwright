import { BaseLocator } from "@index";
import type { Locator } from "@playwright/test";

/**
 * CheckoutOverviewLocator - Contains all element selectors for the Checkout "Overview" page
 */
export class CheckoutOverviewLocator extends BaseLocator {
  // Section: Header
  get header() {
    return {
      title: this.getByTestId("title")
    };
  }

  // Section: Order Item
  get item() {
    return {
      name: this.getByTestId("inventory-item-name"),
      description: this.getByTestId("inventory-item-desc"),
      price: this.getByTestId("inventory-item-price"),
      quantity: this.getByTestId("item-quantity")
    };
  }

  // Section: Price Summary
  get summary() {
    return {
      paymentInfoLabel: this.getByTestId("payment-info-label"),
      paymentInfoValue: this.getByTestId("payment-info-value"),
      shippingInfoLabel: this.getByTestId("shipping-info-label"),
      shippingInfoValue: this.getByTestId("shipping-info-value"),
      totalInfoLabel: this.getByTestId("total-info-label"),
      subtotalLabel: this.getByTestId("subtotal-label"),
      taxLabel: this.getByTestId("tax-label"),
      totalLabel: this.getByTestId("total-label")
    };
  }

  get finishButton(): Locator {
    return this.getByTestId("finish");
  }

  get cancelButton(): Locator {
    return this.getByTestId("cancel");
  }
}
