/**
 * Static expected UI copy for the Login page (SauceDemo)
 * Declare as `as const` to preserve strict literal types.
 */
export const LOGIN_PAGE_EXPECTED = {
  txtErrorUsernameRequired: "Epic sadface: Username is required",
  txtErrorPasswordRequired: "Epic sadface: Password is required",
  txtErrorInvalidCredentials: "Epic sadface: Username and password do not match any user in this service",
  txtErrorLockedOut: "Epic sadface: Sorry, this user has been locked out."
} as const;
