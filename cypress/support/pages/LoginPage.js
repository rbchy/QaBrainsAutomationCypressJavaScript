// ============================================================
// LoginPage.js
// Equivalent to: pages/LoginPage.java
// ============================================================

class LoginPage {
  // Selectors
  get emailField() {
    return cy.get("#email, input[type='email'], input[name='email']").first();
  }

  get passwordField() {
    return cy.get("#password, input[type='password']").first();
  }

  get loginBtn() {
    return cy.get(
      "button[type='submit'], button:contains('Login'), button:contains('Sign In')"
    ).first();
  }

  // Actions
  login(email, password) {
    // Navigate to the login page only if not already on it.
    // Prefer clicking a visible Login link (preserves any session/cookie state
    // set by prior page loads — direct cy.visit bypasses that and can break
    // the form submission on some server setups).
    // Fallback: cy.visit the correct login URL (was '/login' — wrong; fixed to '/ecommerce/login').
    cy.url().then((url) => {
      if (!url.includes('login') && !url.includes('sign-in')) {
        cy.get('body').then(($body) => {
          const link = $body.find(
            "a:contains('Login'), a:contains('Sign In'), a:contains('Log In')"
          ).filter(':visible');
          if (link.length > 0) {
            cy.wrap(link.first()).click();
          } else {
            cy.visit('/ecommerce/login');
          }
        });
      }
    });

    this.emailField.clear().type(email);
    this.passwordField.clear().type(password);
    this.loginBtn.click();
    // Allow redirect / session to establish
    cy.wait(1000);
  }

  // Assertions
  verifyLoginSuccessful() {
    // The practice site shows a success banner after a valid login
    cy.get('#success-msg', { timeout: 15000 }).should('be.visible').invoke('text').should('not.be.empty');
  }

  verifyErrorDisplayed() {
    cy.contains('Your email and password both are invalid', { timeout: 15000 }).should('be.visible');
    cy.get('#success-msg').should('not.exist');
  }
}

export default new LoginPage();
