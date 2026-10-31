import { BASE_URL, PRODUCTS_PAGE_EXPECTED } from "@globalVariable";
import { BasePage, ProductsLocator, step } from "@index";
import { expect, type Page } from "@playwright/test";

/**
 * ProductsPage Page Object - Encapsulates user actions and assertions for the Products page
 */
export class ProductsPage extends BasePage {
  readonly locators: ProductsLocator;

  constructor(page: Page) {
    super(page);
    this.locators = new ProductsLocator(page);
  }

  private async getNumericPrices(): Promise<number[]> {
    const priceTexts = await this.locators.list.itemPrices.allTextContents();
    return priceTexts.map((text) => Number.parseFloat(text.replace("$", "")));
  }

  // Actions (Verify immediate effect where practical - fail-fast)
  @step((...args) => `Add "${args[0]}" to cart`)
  async addToCart(productSlug: string): Promise<void> {
    await this.clickAndWait(this.locators.addToCartButton(productSlug));
    await expect(this.locators.removeFromCartButton(productSlug)).toBeVisible();
  }

  @step((...args) => `Remove "${args[0]}" from cart`)
  async removeFromCart(productSlug: string): Promise<void> {
    await this.clickAndWait(this.locators.removeFromCartButton(productSlug));
    await expect(this.locators.addToCartButton(productSlug)).toBeVisible();
  }

  @step((...args) => `Select sort option "${args[0]}"`)
  async selectSort(value: string): Promise<void> {
    await this.locators.header.sortDropdown.selectOption(value);
    await expect(this.locators.header.sortDropdown).toHaveValue(value);
  }

  @step("Click shopping cart icon")
  async clickCartIcon(): Promise<void> {
    await this.clickAndWait(this.locators.header.cartIcon);
  }

  // Verifications (Named verify* - No raw expect in specs)
  @step("Verify products page elements are displayed properly")
  async verifyProductsPageVisible(): Promise<void> {
    await Promise.all([
      expect(this.locators.header.title).toBeVisible(),
      expect(this.locators.header.title).toHaveText(PRODUCTS_PAGE_EXPECTED.txtTitle),
      expect(this.locators.header.sortDropdown).toBeVisible(),
      expect(this.locators.header.cartIcon).toBeVisible(),
      expect(this.locators.list.items.first()).toBeVisible()
    ]);
  }

  @step((...args) => `Verify "${args[0]}" is in cart with badge count "${args[1]}"`)
  async verifyItemInCart(productSlug: string, expectedBadgeCount: string): Promise<void> {
    await Promise.all([
      expect(this.locators.removeFromCartButton(productSlug)).toBeVisible(),
      expect(this.locators.header.cartBadge).toHaveText(expectedBadgeCount)
    ]);
  }

  @step((...args) => `Verify "${args[0]}" is not in cart`)
  async verifyItemNotInCart(productSlug: string): Promise<void> {
    await Promise.all([
      expect(this.locators.addToCartButton(productSlug)).toBeVisible(),
      expect(this.locators.header.cartBadge).toBeHidden()
    ]);
  }

  @step("Verify products sorted by name ascending (A to Z)")
  async verifySortedByNameAscending(): Promise<void> {
    const names = await this.locators.list.itemNames.allTextContents();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  }

  @step("Verify products sorted by name descending (Z to A)")
  async verifySortedByNameDescending(): Promise<void> {
    const names = await this.locators.list.itemNames.allTextContents();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  }

  @step("Verify products sorted by price ascending (low to high)")
  async verifySortedByPriceAscending(): Promise<void> {
    const prices = await this.getNumericPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  @step("Verify products sorted by price descending (high to low)")
  async verifySortedByPriceDescending(): Promise<void> {
    const prices = await this.getNumericPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  }

  @step("Verify navigated to the cart page")
  async verifyNavigatedToCart(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${PRODUCTS_PAGE_EXPECTED.urlCart}`);
  }
}
