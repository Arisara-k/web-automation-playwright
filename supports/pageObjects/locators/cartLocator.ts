import { BaseLocator } from "@index";
import type { Locator } from "@playwright/test";

/**
 * CartLocator - Contains all element selectors for the Cart ("Your Cart") page
 */
export class CartLocator extends BaseLocator {
  // Section: Header
  get header() {
    return {
      title: this.getByTestId("title")
    };
  }

  // Section: Cart List
  get list() {
    return {
      items: this.getByTestId("inventory-item")
    };
  }

  cartItem(productName: string): Locator {
    return this.list.items.filter({ hasText: productName });
  }

  removeButton(productSlug: string): Locator {
    return this.getByTestId(`remove-${productSlug}`);
  }

  get continueShoppingButton(): Locator {
    return this.getByTestId("continue-shopping");
  }

  get checkoutButton(): Locator {
    return this.getByTestId("checkout");
  }
}
