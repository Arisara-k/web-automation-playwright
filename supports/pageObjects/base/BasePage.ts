import { step } from "@index";
import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Base Page Object class that provides common functionality for all page objects
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for page to load completely (network idle)
   */
  @step("Wait for page to load completely")
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get element by test id using Playwright's getByTestId (mapped to data-test attribute)
   */
  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /**
   * Click element and optionally wait for network idle navigation
   */
  protected async clickAndWait(locator: Locator, waitForNavigation = false): Promise<void> {
    if (waitForNavigation) {
      await Promise.all([this.page.waitForLoadState("networkidle"), locator.click()]);
    } else {
      await locator.click();
    }
  }

  /**
   * Fill input field and immediately verify value
   */
  protected async fillAndVerify(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
    await expect(locator).toHaveValue(value);
  }

  /**
   * Verify current browser URL
   */
  @step((...args) => `Verify current URL > URL should be ${args[0]}`)
  async verifyUrl(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
