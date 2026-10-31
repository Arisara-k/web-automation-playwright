import test from "@playwright/test";

export { BaseLocator } from "@pageObjects/base/BaseLocator";
export { BasePage } from "@pageObjects/base/BasePage";
export { HeaderComponent } from "@pageObjects/components/headerComponent";
export { CartLocator } from "@pageObjects/locators/cartLocator";
export { LoginLocator } from "@pageObjects/locators/loginLocator";
export { ProductsLocator } from "@pageObjects/locators/productsLocator";
export { CartPage } from "@pageObjects/pages/cartPage";
export { LoginPage } from "@pageObjects/pages/loginPage";
export { ProductsPage } from "@pageObjects/pages/productsPage";

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
