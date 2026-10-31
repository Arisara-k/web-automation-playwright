import { BASE_URL, CHECKOUT_OVERVIEW_EXPECTED, PRODUCTS_PAGE_EXPECTED } from "@globalVariable";
import { BasePage, CheckoutOverviewLocator, HeaderComponent, step } from "@index";
import { expect, type Page } from "@playwright/test";

/**
 * CheckoutOverviewPage Page Object - Encapsulates user actions and assertions for the Checkout "Overview" page
 */
export class CheckoutOverviewPage extends BasePage {
  readonly locators: CheckoutOverviewLocator;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutOverviewLocator(page);
    this.header = new HeaderComponent(page);
  }

  // Actions
  @step("Click Finish")
  async clickFinish(): Promise<void> {
    await this.clickAndWait(this.locators.finishButton);
  }

  @step("Click Cancel")
  async clickCancel(): Promise<void> {
    await this.clickAndWait(this.locators.cancelButton);
  }

  // Verifications (Named verify* - No raw expect in specs)
  @step((...args) => `Verify order summary for "${args[0]}"`)
  async verifyOverviewDetails(
    itemName: string,
    itemDescription: string,
    itemPrice: string,
    itemQuantity: string
  ): Promise<void> {
    const subtotal = Number.parseFloat(itemPrice.replace("$", ""));
    const tax = Math.round(subtotal * CHECKOUT_OVERVIEW_EXPECTED.taxRate * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    await Promise.all([
      expect(this.locators.header.title).toBeVisible(),
      expect(this.locators.header.title).toHaveText(CHECKOUT_OVERVIEW_EXPECTED.txtTitle),
      expect(this.locators.item.name).toHaveText(itemName),
      expect(this.locators.item.description).toHaveText(itemDescription),
      expect(this.locators.item.price).toHaveText(itemPrice),
      expect(this.locators.item.quantity).toHaveText(itemQuantity),
      expect(this.locators.summary.paymentInfoLabel).toHaveText(CHECKOUT_OVERVIEW_EXPECTED.txtPaymentInfoLabel),
      expect(this.locators.summary.paymentInfoValue).toHaveText(CHECKOUT_OVERVIEW_EXPECTED.txtPaymentInfoValue),
      expect(this.locators.summary.shippingInfoLabel).toHaveText(CHECKOUT_OVERVIEW_EXPECTED.txtShippingInfoLabel),
      expect(this.locators.summary.shippingInfoValue).toHaveText(CHECKOUT_OVERVIEW_EXPECTED.txtShippingInfoValue),
      expect(this.locators.summary.totalInfoLabel).toHaveText(CHECKOUT_OVERVIEW_EXPECTED.txtTotalInfoLabel),
      expect(this.locators.summary.subtotalLabel).toHaveText(
        `${CHECKOUT_OVERVIEW_EXPECTED.txtSubtotalPrefix}${subtotal.toFixed(2)}`
      ),
      expect(this.locators.summary.taxLabel).toHaveText(`${CHECKOUT_OVERVIEW_EXPECTED.txtTaxPrefix}${tax.toFixed(2)}`),
      expect(this.locators.summary.totalLabel).toHaveText(
        `${CHECKOUT_OVERVIEW_EXPECTED.txtTotalPrefix}${total.toFixed(2)}`
      ),
      expect(this.locators.finishButton).toBeVisible(),
      expect(this.locators.cancelButton).toBeVisible()
    ]);
  }

  @step("Verify navigated to the checkout complete page")
  async verifyNavigatedToComplete(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${CHECKOUT_OVERVIEW_EXPECTED.urlComplete}`);
  }

  @step("Verify navigated back to the products page")
  async verifyNavigatedToInventory(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${PRODUCTS_PAGE_EXPECTED.urlInventory}`);
  }

  @step("Verify cart badge is cleared")
  async verifyCartCleared(): Promise<void> {
    await expect(this.header.cartBadge).toBeHidden();
  }
}
