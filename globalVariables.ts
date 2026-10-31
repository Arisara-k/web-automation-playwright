// Environment constants
export const ENV = process.env;

// Base URL of the Application Under Test (SauceDemo)
export const BASE_URL = ENV.BASE_URL || "https://www.saucedemo.com";

// Storage state paths for authenticated sessions
export const STANDARD_USER_AUTH = ".auth/user/standardUser.json";

// Re-export page expected constants
export { LOGIN_PAGE_EXPECTED } from "@constants/loginPageConstants";
