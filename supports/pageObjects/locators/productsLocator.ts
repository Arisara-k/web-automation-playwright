import { BaseLocator } from "@index";
import type { Locator } from "@playwright/test";

/**
 * ProductsLocator - Contains all element selectors for the Products (Inventory) page
 */
export class ProductsLocator extends BaseLocator {
  // Section: Header
  get header() {
    return {
      title: this.getByTestId("title"),
      sortDropdown: this.getByTestId("product-sort-container")
    };
  }

  // Section: Inventory List
  get list() {
    return {
      items: this.getByTestId("inventory-item"),
      itemNames: this.getByTestId("inventory-item-name"),
      itemPrices: this.getByTestId("inventory-item-price")
    };
  }

  addToCartButton(productSlug: string): Locator {
    return this.getByTestId(`add-to-cart-${productSlug}`);
  }

  removeFromCartButton(productSlug: string): Locator {
    return this.getByTestId(`remove-${productSlug}`);
  }
}
