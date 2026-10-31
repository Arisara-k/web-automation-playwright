import { BASE_URL, CHECKOUT_INFO_EXPECTED, PRODUCTS_PAGE_EXPECTED } from "@globalVariable";
import { BasePage, CheckoutInfoLocator, step } from "@index";
import { expect, type Page } from "@playwright/test";

/**
 * CheckoutInfoPage Page Object - Encapsulates user actions and assertions for the Checkout "Your Information" page
 */
export class CheckoutInfoPage extends BasePage {
  readonly locators: CheckoutInfoLocator;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutInfoLocator(page);
  }

  // Actions (Verify immediate effect where practical - fail-fast)
  @step((...args) => `Fill first name > enter "${args[0]}"`)
  async fillFirstName(firstName: string): Promise<void> {
    await this.fillAndVerify(this.locators.form.firstNameField, firstName);
  }

  @step((...args) => `Fill last name > enter "${args[0]}"`)
  async fillLastName(lastName: string): Promise<void> {
    await this.fillAndVerify(this.locators.form.lastNameField, lastName);
  }

  @step((...args) => `Fill postal code > enter "${args[0]}"`)
  async fillPostalCode(postalCode: string): Promise<void> {
    await this.fillAndVerify(this.locators.form.postalCodeField, postalCode);
  }

  @step("Click Continue")
  async clickContinue(): Promise<void> {
    await this.clickAndWait(this.locators.form.continueButton);
  }

  @step("Click Cancel")
  async clickCancel(): Promise<void> {
    await this.clickAndWait(this.locators.form.cancelButton);
  }

  @step((...args) => `Fill customer info for "${args[0]} ${args[1]}" and continue`)
  async fillCustomerInfoAndContinue(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
    await this.clickContinue();
  }

  // Verifications (Named verify* - No raw expect in specs)
  @step("Verify checkout information page elements are displayed properly")
  async verifyPageVisible(): Promise<void> {
    await Promise.all([
      expect(this.locators.header.title).toBeVisible(),
      expect(this.locators.header.title).toHaveText(CHECKOUT_INFO_EXPECTED.txtTitle),
      expect(this.locators.form.firstNameField).toBeVisible(),
      expect(this.locators.form.lastNameField).toBeVisible(),
      expect(this.locators.form.postalCodeField).toBeVisible(),
      expect(this.locators.form.continueButton).toBeVisible(),
      expect(this.locators.form.cancelButton).toBeVisible()
    ]);
  }

  @step((...args) => `Verify error message is "${args[0]}"`)
  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.locators.feedback.errorMessage).toBeVisible();
    await expect(this.locators.feedback.errorMessage).toHaveText(expectedMessage);
  }

  @step("Verify navigated to the checkout overview page")
  async verifyNavigatedToOverview(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${CHECKOUT_INFO_EXPECTED.urlStepTwo}`);
  }

  @step("Verify navigated back to the cart page")
  async verifyNavigatedToCart(): Promise<void> {
    await this.verifyUrl(`${BASE_URL}${PRODUCTS_PAGE_EXPECTED.urlCart}`);
  }
}
