import type { Locator, Page } from "@playwright/test";

/**
 * ProductsLocator - Contains all element selectors for the Products (Inventory) page
 */
export class ProductsLocator {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  // Section: Header
  get header() {
    return {
      title: this.getByTestId("title"),
      sortDropdown: this.getByTestId("product-sort-container"),
      cartIcon: this.getByTestId("shopping-cart-link"),
      cartBadge: this.getByTestId("shopping-cart-badge")
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
