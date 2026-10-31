import { BASE_URL, CHECKOUT_COMPLETE_EXPECTED, PRODUCTS_PAGE_EXPECTED } from "@globalVariable";
import { BasePage, CheckoutCompleteLocator, step } from "@index";
import { expect, type Page } from "@playwright/test";

/**
 * CheckoutCompletePage Page Object - Encapsulates user actions and assertions for the Checkout "Complete" page
 */
export class CheckoutCompletePage extends BasePage {
  readonly locators: CheckoutCompleteLocator;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutCompleteLocator(page);
  }

  // Actions
  @step("Click Back Home")
  async clickBackHome(): Promise<void> {
    await this.clickAndWait(this.locators.backHomeButton);
  }

  // Verifications (Named verify* - No raw expect in specs)
  @step("Verify checkout complete page elements are displayed properly")
  async verifyCompletePageVisible(): Promise<void> {
    await Promise.all([
      expect(this.locators.header.title).toBeVisible(),
      expect(this.locators.header.title).toHaveText(CHECKOUT_COMPLETE_EXPECTED.txtTitle),
      expect(this.locators.content.completeHeader).toHaveText(CHECKOUT_COMPLETE_EXPECTED.txtCompleteHeader),
      expect(this.locators.content.completeText).toHaveText(CHECKOUT_COMPLETE_EXPECTED.txtCompleteText),
      expect(this.locators.backHomeButton).toBeVisible()
    ]);
  }

  @step("Verify navigated back to the products page")
  async verifyNavigatedToInventory(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${PRODUCTS_PAGE_EXPECTED.urlInventory}`);
  }
}
