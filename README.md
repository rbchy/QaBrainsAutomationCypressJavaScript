# QaBrainsAutomaion JavaScript Cypress — BDD Cucumber Test Framework

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Cypress](https://img.shields.io/badge/Cypress-13.17.0-04C38E?logo=cypress&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-brightgreen?logo=cucumber)
![Node](https://img.shields.io/badge/Node.js-v26-339933?logo=node.js)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

**Author:** Ranajit Baran Chowdhury — QA Automation Engineer  
**Email:** chyranajit@gmail.com  
**GitHub:** [@ranajitchowdhury](https://github.com/ranajitchowdhury)

A production-grade end-to-end test automation framework for the **QaBrains e-commerce application** using **Behavior-Driven Development (BDD)** principles. Built with Cypress 13 + Cucumber, following the Page Object Model pattern with full JSON and HTML reporting.

🌐 **Live Application:** [practice.qabrains.com/ecommerce](https://practice.qabrains.com/ecommerce)

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Language** | JavaScript (ES6+) | Core programming language |
| **Test Tool** | Cypress 13.17.0 | Browser automation & assertions |
| **BDD Framework** | Cucumber (`@badeball/cypress-cucumber-preprocessor`) | Gherkin-based feature files |
| **Bundler** | esbuild (`@bahmutov/cypress-esbuild-preprocessor`) | Fast spec compilation |
| **Reporter** | `multiple-cucumber-html-reporter` | Rich HTML test dashboard |
| **Runtime** | Node.js v26 | JavaScript runtime |

---

## 📁 Project Structure

```
QaBrainsCypress/
│
├── cypress/
│   ├── e2e/
│   │   ├── features/                  ← BDD Gherkin feature files
│   │   │   ├── CartCheckout.feature
│   │   │   ├── ForgotPassword.feature
│   │   │   ├── Login.feature
│   │   │   ├── Logout.feature
│   │   │   ├── Registration.feature
│   │   │   ├── RegressionTests.feature
│   │   │   └── SmokeTests.feature
│   │   │
│   │   └── step_definitions/          ← Cucumber step implementations
│   │       ├── CartSteps.js
│   │       ├── CommonSteps.js
│   │       ├── ForgotPasswordSteps.js
│   │       ├── LoginSteps.js
│   │       ├── LogoutSteps.js
│   │       ├── RegistrationSteps.js
│   │       ├── RegressionSteps.js
│   │       └── SmokeSteps.js
│   │
│   ├── fixtures/
│   │   └── config.json                ← Test configuration data
│   │
│   ├── reports/                       ← Generated after test run
│   │   ├── cucumber-json/             ← Per-feature JSON outputs ([hash].json)
│   │   ├── cucumber-html/             ← Built-in Cucumber HTML report
│   │   └── html/                      ← Rich HTML dashboard (index.html) ← open this
│   │
│   ├── screenshots/                   ← Auto-captured on test failure
│   │
│   └── support/
│       ├── commands.js                ← Custom Cypress commands
│       ├── e2e.js                     ← Global support configuration
│       └── pages/                     ← Page Object Model (POM) classes
│           ├── CartPage.js
│           ├── ForgotPasswordPage.js
│           ├── HomePage.js
│           ├── LoginPage.js
│           ├── LogoutPage.js
│           ├── RegistrationPage.js
│           └── SearchPage.js
│
├── cypress.config.js                  ← Cypress + Cucumber configuration
├── reporter.js                        ← HTML report generator script
└── package.json                       ← Dependencies & npm scripts
```

---

## 🎯 Test Coverage

### 🔐 Authentication — `Login.feature`
- Login with valid credentials — successful redirect verification
- Login with invalid credentials — error message assertion

### 🚪 Logout — `Logout.feature`
- Logged-in user can log out — session termination and redirect check

### 📝 Registration — `Registration.feature`
- Successful user registration with a valid email address
- Registration failure with an invalid email format

### 🔑 Forgot Password — `ForgotPassword.feature`
- Registered user can request a password reset — success message verification
- Unregistered user cannot reset password — error/validation check

### 🛒 Cart & Checkout — `CartCheckout.feature`
- Add a product to the cart — button state and cart confirmation
- Remove a product from the cart — state reset and empty cart verification

### 💨 Smoke Tests — `SmokeTests.feature`
- S-01: Verify Home page loads successfully
- S-02: Verify navigation links (Catalog, About, Blog)
- S-03: Verify Wishlist and Refer a Friend functionality

### 🔁 Regression Tests — `RegressionTests.feature`
- R-01: Add multiple products to the cart
- R-02: Update product quantity
- R-03: Search for an invalid item — no results displayed

---

## ✨ Framework Features

| Feature | Description |
|---------|-------------|
| ✅ BDD with Cucumber | Gherkin syntax for human-readable, stakeholder-friendly scenarios |
| ✅ Page Object Model | Locators and actions separated per page class for maintainability |
| ✅ Reusable Step Definitions | Shared steps across feature files to eliminate duplication |
| ✅ Tag-based Execution | Run only `@smoke` or `@regression` tests independently |
| ✅ Auto Screenshot on Failure | Cypress captures a screenshot automatically on any test failure |
| ✅ JSON Reports | Per-feature Cucumber JSON output generated after every run |
| ✅ HTML Dashboard Report | Rich visual report via `multiple-cucumber-html-reporter` |
| ✅ esbuild Compilation | Fast spec bundling — no slow Webpack/Browserify overhead |
| ✅ Cross-scenario State Handling | Robust reset logic guards against test-isolation side effects |

---

## 📋 Prerequisites

Ensure the following are installed before running the tests:

- ✅ **Node.js v18+** — [nodejs.org](https://nodejs.org)
- ✅ **npm** — bundled with Node.js
- ✅ **Git** — for cloning the repository
- ✅ **Chrome / Electron** — Cypress uses Electron headless by default

---

## ⚙️ Installation & Setup

**1. Clone the repository:**
```bash
git clone https://github.com/ranajitchowdhury/QaBrainsCypress.git
cd QaBrainsCypress
```

**2. Install all dependencies:**
```bash
npm install
```

---

## ▶️ Running the Tests

### Run all tests (headless)
```bash
npm test
```

### Run all tests + generate HTML report
```bash
npm run test:report
```

### Run in headed (visible browser) mode
```bash
npm run test:headed
```

### Run only Smoke tests
```bash
npm run test:smoke
```

### Run only Regression tests
```bash
npm run test:regression
```

### Open Cypress interactive UI
```bash
npm run open
```

### Generate HTML report from existing JSON (no re-run)
```bash
npm run report
```

---

## 📊 Test Reports

After running `npm run test:report` (or `npm test` followed by `npm run report`), two report types are generated:

### 1. Rich HTML Dashboard
```
cypress/reports/html/index.html
```
Open this file in any browser. Shows a full visual summary — feature results, scenario pass/fail, execution time, browser/platform metadata, and per-step detail.

### 2. Built-in Cucumber HTML
```
cypress/reports/cucumber-html/cucumber-report.html
```

### 3. Cucumber JSON (raw data)
```
cypress/reports/cucumber-json/[hash].json   ← one file per feature
```
These JSON files are the source data for the HTML dashboard. They can also be consumed by CI/CD tools (Jenkins, GitHub Actions).

### Screenshot on Failure
Any failing test automatically captures a screenshot saved to:
```
cypress/screenshots/<FeatureName>/<Scenario> (failed).png
```

---

## 🏷️ Tags

Run specific subsets of tests using Cucumber tags:

| Tag | Description |
|-----|-------------|
| `@smoke` | Critical path — build verification (fast) |
| `@regression` | Full regression suite |
| `@Login` | Login-specific scenarios |
| `@ForgotPassword` | Password reset scenarios |

**Example — run by tag via CLI:**
```bash
npx cypress run --env tags=@smoke
npx cypress run --env tags=@Login
```

---

## 🏗️ Framework Architecture

```
Feature Files (.feature — Gherkin)
            ↓
Step Definitions (step_definitions/*.js)
            ↓
Page Object Model (support/pages/*.js)
            ↓
Cypress Commands + WebDriver API
            ↓
Electron / Chrome Browser (headless)
            ↓
QaBrains Application (practice.qabrains.com)
```

### Design Patterns Applied

- **Page Object Model (POM)** — each page class owns its selectors and actions; tests stay clean
- **BDD (Gherkin / Cucumber)** — Given / When / Then for non-technical stakeholder readability
- **Shared Background Steps** — common setup (launch app, verify URL) defined once and reused
- **esbuild Preprocessor** — replaces Webpack for near-instant spec compilation
- **Cross-test State Reset** — `addProductToCart` detects cart state before acting, preventing flaky failures across sequential scenarios

---

## 🧩 npm Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `cypress run` | Run all specs headless |
| `test:headed` | `cypress run --headed` | Run all specs with visible browser |
| `test:smoke` | `cypress run --env tags=@smoke` | Smoke suite only |
| `test:regression` | `cypress run --env tags=@regression` | Regression suite only |
| `open` | `cypress open` | Launch Cypress interactive UI |
| `report` | `node reporter.js` | Generate HTML from existing JSON |
| `test:report` | `cypress run && node reporter.js` | Full run + report in one command |

---

## 📈 Roadmap & Future Enhancements

- [ ] CI/CD Integration — GitHub Actions pipeline with automatic report publishing
- [ ] Allure Reports — enhanced reporting with screenshots embedded per step
- [ ] Parallel Execution — multi-spec parallelism via Cypress Cloud
- [ ] Cross-Browser Testing — Firefox and Edge support
- [ ] Data-Driven Testing — JSON / fixture-driven parameterised scenarios
- [ ] API Testing — `cy.request()` for backend contract validation
- [ ] Accessibility Testing — `cypress-axe` integration
- [ ] Docker Support — containerised test execution

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your branch: `git checkout -b feature/improvement`
3. Commit your changes: `git commit -m 'Add improvement'`
4. Push to the branch: `git push origin feature/improvement`
5. Open a Pull Request

---

## 📄 License

This project is provided as-is for **educational and professional QA automation** purposes.

---

## 👤 Author

**Ranajit Baran Chowdhury**  
Software Programmer & QA Automation Engineer

- 📧 Email: chyranajit@gmail.com
- 🐙 GitHub: [@ranajitchowdhury](https://github.com/ranajitchowdhury)

---

**Version:** 1.0.0  
**Last Updated:** June 2026
