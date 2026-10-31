import test from "@playwright/test";

// Base Page
export { BasePage } from "@pageObjects/base/BasePage";

// Components (uncomment as you create them)
// export { HeaderComponent } from "@pageObjects/components/headerComponent";

// Locators (uncomment as you create them)
// export { LoginLocator } from "@pageObjects/locators/loginLocator";

// Pages (uncomment as you create them)
// export { LoginPage } from "@pageObjects/pages/loginPage";

// Utils (uncomment as you create them)
// export { onDataUtils } from "@utils/dataUtils";

/**
 * Decorator function for wrapping Page Object Model methods in Playwright test.step.
 *
 * Supports:
 * - Default step name from method: `@step()`
 * - Custom static step name: `@step("Search records")`
 * - Dynamic parameter step name: `@step((...args) => `Fill username with: ${args[0]}`)`
 */
export function step(stepName?: string | ((...args: any[]) => string)) {
  // biome-ignore lint/complexity/noBannedTypes: generic decorator must accept any method shape
  return function decorator(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(this: any, ...args: any) {
      let name: string;
      if (typeof stepName === "function") {
        name = `${stepName(...args)}`;
      } else {
        name = `${stepName || (context.name as string)} (${this.constructor.name})`;
      }
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
