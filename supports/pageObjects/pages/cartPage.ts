import { BASE_URL, CART_PAGE_EXPECTED, PRODUCTS_PAGE_EXPECTED } from "@globalVariable";
import { BasePage, CartLocator, HeaderComponent, step } from "@index";
import { expect, type Page } from "@playwright/test";

/**
 * CartPage Page Object - Encapsulates user actions and assertions for the Cart page
 */
export class CartPage extends BasePage {
  readonly locators: CartLocator;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.locators = new CartLocator(page);
    this.header = new HeaderComponent(page);
  }

  // Actions (Verify immediate effect where practical - fail-fast)
  @step((...args) => `Remove "${args[0]}" from cart`)
  async removeItem(productSlug: string): Promise<void> {
    await this.clickAndWait(this.locators.removeButton(productSlug));
    await expect(this.locators.removeButton(productSlug)).toBeHidden();
  }

  @step("Click Continue Shopping")
  async clickContinueShopping(): Promise<void> {
    await this.clickAndWait(this.locators.continueShoppingButton);
  }

  @step("Click Checkout")
  async clickCheckout(): Promise<void> {
    await this.clickAndWait(this.locators.checkoutButton);
  }

  // Verifications (Named verify* - No raw expect in specs)
  @step("Verify cart page elements are displayed properly")
  async verifyCartPageVisible(): Promise<void> {
    await Promise.all([
      expect(this.locators.header.title).toBeVisible(),
      expect(this.locators.header.title).toHaveText(CART_PAGE_EXPECTED.txtTitle),
      expect(this.locators.continueShoppingButton).toBeVisible(),
      expect(this.locators.checkoutButton).toBeVisible()
    ]);
  }

  @step((...args) => `Verify "${args[0]}" is in the cart list with price "${args[1]}" and quantity "${args[2]}"`)
  async verifyItemInCartList(name: string, price: string, quantity: string): Promise<void> {
    const item = this.locators.cartItem(name);
    await Promise.all([
      expect(item).toBeVisible(),
      expect(item.getByTestId("inventory-item-price")).toHaveText(price),
      expect(item.getByTestId("item-quantity")).toHaveText(quantity)
    ]);
  }

  @step((...args) => `Verify "${args[0]}" is removed from the cart`)
  async verifyItemRemovedFromCart(productSlug: string): Promise<void> {
    await expect(this.locators.removeButton(productSlug)).toBeHidden();
  }

  @step("Verify cart is empty")
  async verifyCartEmpty(): Promise<void> {
    await Promise.all([expect(this.locators.list.items).toHaveCount(0), expect(this.header.cartBadge).toBeHidden()]);
  }

  @step((...args) => `Verify cart badge shows "${args[0]}"`)
  async verifyCartBadgeCount(expectedCount: string): Promise<void> {
    await expect(this.header.cartBadge).toHaveText(expectedCount);
  }

  @step("Verify navigated back to the products page")
  async verifyNavigatedToInventory(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${PRODUCTS_PAGE_EXPECTED.urlInventory}`);
  }

  @step("Verify navigated to the checkout page")
  async verifyNavigatedToCheckout(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${CART_PAGE_EXPECTED.urlCheckoutStepOne}`);
  }
}
