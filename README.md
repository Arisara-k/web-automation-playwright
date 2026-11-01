# Web UI Automation Framework with Playwright & TypeScript

[![CI](https://github.com/Arisara-k/web-automation-playwright/actions/workflows/ci.yml/badge.svg)](https://github.com/Arisara-k/web-automation-playwright/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-v24+-green.svg)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-v1.64+-blue.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7+-blue.svg)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Linter-Biome-orange.svg)](https://biomejs.dev/)
[![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-D97757?logo=claude&logoColor=white)](https://claude.com/claude-code)

An enterprise-grade, end-to-end Web UI test automation framework built with **Playwright** and **TypeScript** against the [SauceDemo](https://www.saucedemo.com) demo storefront. Features a strict **4-Tier Page Object Model** (Spec → Page → Component → Locator), data-driven test fixtures, a shared `@step`-traced Page Object layer, and automated CI/CD pipelines via GitHub Actions.

---

## 📑 Table of Contents

- [Key Architecture & Features](#-key-architecture--features)
- [Project Directory Structure](#-project-directory-structure)
- [Prerequisites & Environment Setup](#-prerequisites--environment-setup)
- [Installation](#-installation)
- [Test Execution Commands](#-test-execution-commands)
- [Pages Covered](#-pages-covered)
- [Test Tagging Strategy](#-test-tagging-strategy)
- [Reporting & Artifacts](#-reporting--artifacts)
- [Code Quality & Linting](#-code-quality--linting)
- [CI/CD Pipeline (GitHub Actions)](#-cicd-pipeline-github-actions)
- [AI Pair Programming & Attribution](#-ai-pair-programming--attribution)

---

## 🌟 Key Architecture & Features

1. **Strict 4-Tier Page Object Model (POM)**:
   - **Spec layer (`testCases/`):** Orchestrates scenarios only — zero direct `expect()` calls, every assertion goes through a Page Object `verify*` method.
   - **Page Object layer (`supports/pageObjects/pages/`):** Encapsulates user actions and assertions; every public method is traced with a `@step(...)` decorator for readable HTML reports.
   - **Component layer (`supports/pageObjects/components/`):** Shared cross-page widgets (e.g. `HeaderComponent` for the cart icon/badge) to avoid duplicating locators.
   - **Locator layer (`supports/pageObjects/locators/`):** Pure selector getters via `getByTestId(...)` — zero actions or assertions allowed.
2. **Single Barrel Re-export (`@index`)**:
   - Every Page Object, Locator, Component, and the `@step` decorator is imported from one place (`index.ts`), never from deep relative paths.
3. **Data-Driven Testing (DDT)**:
   - Test inputs and expected UI copy are externalized into `resources/dataTest/*.json` and `supports/constants/*Constants.ts` — zero hardcoded literals in specs.
4. **Deterministic & Flakiness-Free**:
   - Zero fixed timeouts (`page.waitForTimeout()`); relies entirely on Playwright's web-first auto-waiting assertions.
5. **Dynamic Business-Logic Assertions**:
   - Checkout tax/total are computed from the live item price at runtime and compared against the rendered values — never hardcoded dollar amounts.
6. **Strict Code Quality**:
   - Configured with **Biome** for fast formatting/linting and strict **TypeScript** compiler settings.

---

## 📁 Project Directory Structure

```plaintext
web-automation-playwright/
├── .github/
│   └── workflows/
│       └── ci.yml                      # GitHub Actions CI workflow configuration
├── configs/                            # Reserved for environment/config files
├── resources/
│   └── dataTest/                       # Input test data fixtures (JSON)
├── supports/
│   ├── pageObjects/
│   │   ├── base/                       # BasePage, BaseLocator — shared base classes
│   │   ├── components/                 # Cross-page shared widgets (e.g. HeaderComponent)
│   │   ├── locators/                   # Pure getByTestId selector classes
│   │   └── pages/                      # Page Object classes (actions + verify* methods)
│   └── constants/                      # Expected UI copy per page, declared `as const`
├── testCases/
│   ├── loginPage.spec.ts
│   ├── productsPage.spec.ts
│   ├── cartPage.spec.ts
│   ├── checkoutInfoPage.spec.ts
│   ├── checkoutOverviewPage.spec.ts
│   ├── checkoutCompletePage.spec.ts
│   └── E2E/
│       └── purchaseFlow.spec.ts        # Full Login → Products → Cart → Checkout journey
├── biome.json                          # Biome linter and formatter settings
├── globalVariables.ts                  # ENV, BASE_URL, and centralized constants re-exports
├── index.ts                            # Single barrel export for the whole POM
├── package.json                        # NPM dependencies and runner scripts
├── playwright.config.ts                # Playwright Test configuration
└── tsconfig.json                       # TypeScript compiler options & path aliases
```

---

## ⚙️ Prerequisites & Environment Setup

- **Node.js**: `v24.x` or higher (LTS recommended)
- **npm**: bundled with Node.js

No database, API keys, or `.env` file are required — the suite drives the public [SauceDemo](https://www.saucedemo.com) demo site directly. To point the suite at a different base URL, override it at run time:

```bash
BASE_URL=https://your-staging-url.example.com npm test
```

---

## 📦 Installation

Clone the repository and install all dependencies:

```bash
git clone https://github.com/Arisara-k/web-automation-playwright.git
cd web-automation-playwright
npm install
npx playwright install --with-deps
```

---

## 🚀 Test Execution Commands

Run tests using the predefined npm scripts:

| Script                    | Command                                                              | Purpose                                              |
| ------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------- |
| `npm test`                | `npx playwright test`                                                  | Executes every spec across all 3 browser projects     |
| `npm run test:ui`         | `npx playwright test --ui`                                             | Opens Playwright's interactive UI mode                |
| `npm run test:headed`     | `npx playwright test --headed`                                         | Runs with the browser window visible                  |
| `npm run test:smoke`      | `npx playwright test --grep "@smoke"`                                  | Runs only the critical-path smoke suite                |
| `npm run test:regression` | `npx playwright test --grep "(@regression\|@smoke)" --grep-invert "@low"` | Runs the full regression suite (excludes `@low`)       |

---

## 📄 Pages Covered

| Page                        | Spec                              | Scope                                                                 |
| ---------------------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| Login                        | `loginPage.spec.ts`                | Successful/failed login, field validation, locked-out user, dismiss error |
| Products (Inventory)         | `productsPage.spec.ts`             | Product listing, add/remove cart, sort by name/price, cart navigation |
| Cart                         | `cartPage.spec.ts`                 | Cart contents, remove items, Continue Shopping, Checkout               |
| Checkout: Your Information   | `checkoutInfoPage.spec.ts`         | Customer info form, 3-field validation, Cancel                         |
| Checkout: Overview           | `checkoutOverviewPage.spec.ts`     | Order summary, dynamic tax/total calculation, Finish, Cancel           |
| Checkout: Complete           | `checkoutCompletePage.spec.ts`     | Thank-you confirmation, return to Products                             |
| **E2E**                      | `E2E/purchaseFlow.spec.ts`         | Full journey: Login → Products → Cart → Checkout → Complete           |

---

## 🏷️ Test Tagging Strategy

Every test case carries exactly one **Purpose** tag and one **Priority** tag for flexible filtering:

- **Purpose Tags**:
  - `@smoke`: Critical-path happy flows
  - `@regression`: Guards against breaking existing behavior
  - `@functional`: Core feature / field-level validation logic
- **Priority Tags**:
  - `@critical`: Primary business paths (e.g. successful checkout)
  - `@high`: Main flows (e.g. page layout, add/remove cart)
  - `@medium`: Filters, validations, secondary navigation
  - `@low`: Minor UI edges (e.g. dismissing a toast)

---

## 📊 Reporting & Artifacts

Playwright generates detailed reports after every test execution:

```bash
# Open the interactive HTML test report in your browser
npx playwright show-report
```

Output directories:
- `playwright-report/`: Interactive HTML report with execution details, timestamps, and error stacks.
- `test-results/test-results.json`: Machine-readable JSON summary for CI test parsing.

---

## 🧹 Code Quality & Linting

The project uses **Biome** for fast linting/formatting alongside the TypeScript compiler:

```bash
# Run the formatter
npm run format

# Run the linter (path-scoped to avoid the nested configs under .claude/skills/**)
npx @biomejs/biome check ./testCases ./supports ./resources ./globalVariables.ts ./index.ts

# Run TypeScript static type checking
npm run typecheck
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Continuous Integration is automated via [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

### Workflow Triggers

- **Pull Request targeting `main`:** Runs type-check, lint, and the full cross-browser test suite as a quality gate before merge.
- **Push to `main`:** Automatically re-runs the full suite when changes land on `main`, including after a PR merge.

### Accessing CI Reports

1. Go to the **Actions** tab on GitHub.
2. Select the latest workflow run.
3. Under the **Artifacts** section, download `playwright-report` to review detailed execution logs and traces (uploaded automatically on failure).

---

## 🤖 AI Pair Programming & Attribution

This project was designed, implemented, and reviewed with the pair-programming collaboration of **Claude Code** (powered by Claude models from Anthropic), assisting in POM architecture design, test case matrix design, page object/locator implementation, and CI/CD workflow automation.
