// Environment constants
export const ENV = process.env;

// Base URL of the Application Under Test (SauceDemo)
export const BASE_URL = ENV.BASE_URL || "https://www.saucedemo.com";

// Storage state paths for authenticated sessions
export const STANDARD_USER_AUTH = ".auth/user/standardUser.json";

export { CART_PAGE_EXPECTED } from "@constants/cartPageConstants";
export {
  CHECKOUT_COMPLETE_EXPECTED,
  CHECKOUT_INFO_EXPECTED,
  CHECKOUT_OVERVIEW_EXPECTED
} from "@constants/checkoutPageConstants";
export { LOGIN_PAGE_EXPECTED } from "@constants/loginPageConstants";
export { PRODUCTS_PAGE_EXPECTED } from "@constants/productsPageConstants";
