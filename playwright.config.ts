import { BASE_URL, ENV } from "@globalVariable";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./testCases",
  testMatch: "**/*.spec.ts",
  timeout: 30_000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!ENV.CI,
  /* Retry on CI only */
  retries: ENV.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: ENV.CI ? 1 : undefined,
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }], ["json", { outputFile: "./test-results/test-results.json" }]],
  use: {
    baseURL: BASE_URL,
    /* SauceDemo already exposes data-test attributes on its elements. */
    testIdAttribute: "data-test",
    screenshot: "only-on-failure",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }
    }
  ]
});
