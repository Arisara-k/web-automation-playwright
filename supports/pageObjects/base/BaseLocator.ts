import type { Locator, Page } from "@playwright/test";

/**
 * Base class for Locator and Component classes that provides the shared
 * getByTestId resolver (mapped to the data-test attribute)
 */
export abstract class BaseLocator {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}
