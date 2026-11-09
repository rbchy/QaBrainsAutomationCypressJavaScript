// ============================================================
// RegistrationPage.js
// Equivalent to: pages/RegistrationPage.java
// ============================================================

class RegistrationPage {
  // Selectors
  get registerLink() { return cy.get('#registration span'); }
  get nameField()    { return cy.get('#name'); }
  get countryDropdown()     { return cy.get('#country'); }
  get accountTypeDropdown() { return cy.get('#account'); }
  get emailField()   { return cy.get('#email'); }
  get passwordField()        { return cy.get('#password'); }
  get confirmPasswordField() { return cy.get('#confirm_password'); }
  get registerBtn()  { return cy.get("button[type='submit']"); }

  // Actions
  openRegistrationPage() {
    cy.url().then((url) => {
      if (!url.includes('registration')) {
        // Try the nav link first; fall back to direct URL navigation
        cy.get('body').then(($body) => {
          if ($body.find('#registration span').length > 0) {
            cy.get('#registration span').click();
          } else if ($body.find("a:contains('Register'), a:contains('Sign Up'), a[href*='registration']").length > 0) {
            cy.get("a:contains('Register'), a:contains('Sign Up'), a[href*='registration']")
              .first()
              .click();
          } else {
            cy.visit('/registration');
          }
        });
      }
    });
    cy.url().should('include', 'registration');
  }

  enterRegistrationDetails(fullName, country, accountType, email, password, confirmPassword) {
    // Generate a unique email to avoid "already registered" errors
    const finalEmail =
      email === 'chyranajit@gmail.com'
        ? `testuser${Date.now()}@mailtest.com`
        : email;

    cy.log(`Registering with email: ${finalEmail}`);

    this.nameField.clear().type(fullName);
    this.countryDropdown.select(country);
    this.accountTypeDropdown.select(accountType);
    this.emailField.clear().type(finalEmail);
    this.passwordField.clear().type(password);
    this.confirmPasswordField.clear().type(confirmPassword);
  }

  clickRegister() {
    this.registerBtn.click();
    // Allow redirect or DOM update to settle
    cy.wait(2000);
  }

  // Assertions
  verifyRegistrationSuccessful() {
    cy.contains(/successfully/i, { timeout: 15000 }).should('be.visible');
  }

  verifyEmailValidationError() {
    // The browser blocks the submit and reports why on the field itself
    cy.get('#email').then(($email) => {
      expect($email[0].validity.valid, 'e-mail field is valid').to.be.false;
      expect($email[0].validationMessage, 'browser validation message').to.contain('@');
    });
  }
}

export default new RegistrationPage();
