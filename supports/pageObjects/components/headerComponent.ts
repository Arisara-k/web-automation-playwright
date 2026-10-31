import { BaseLocator } from "@index";
import type { Locator } from "@playwright/test";

/**
 * HeaderComponent - Shared header widget (cart icon, cart badge) reused across authenticated pages
 */
export class HeaderComponent extends BaseLocator {
  get cartIcon(): Locator {
    return this.getByTestId("shopping-cart-link");
  }

  get cartBadge(): Locator {
    return this.getByTestId("shopping-cart-badge");
  }
}
