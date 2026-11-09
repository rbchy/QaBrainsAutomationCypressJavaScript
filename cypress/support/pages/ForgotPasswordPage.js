// ============================================================
// ForgotPasswordPage.js
// Equivalent to: pages/ForgotPasswordPage.java
// ============================================================

class ForgotPasswordPage {
  get emailField() { return cy.get('#email'); }

  get submitBtn() {
    return cy.get(
      "#inner-body form button[type='submit'], " +
      "form button[type='submit'], " +
      "button:contains('Submit'), " +
      "button:contains('Reset'), " +
      "input[type='submit']"
    ).first();
  }

  enterEmail(email) {
    this.emailField.clear().type(email);
  }

  clickSubmit() {
    this.submitBtn.click();
    cy.wait(1500);
  }

  // ── Success verification ──────────────────────────────────────
  // Site behaviour: after submitting a VALID email the URL becomes
  // /forgot-password?forgot=true (same path, query param appended).
  // Use cy.url().should() — it RETRIES until the URL updates or times
  // out, so we never capture a stale URL with .then().
  verifySuccessMessage() {
    cy.url({ timeout: 10000 }).should('include', 'forgot=true');
    cy.get('#success-msg').should('be.visible').invoke('text').should('match', /success/i);
  }

  // ── Error verification ────────────────────────────────────────
  // Called for an email with no @ symbol — HTML5 validation fires
  // before submit, keeping the user on /forgot-password (no ?forgot=true).
  verifyErrorMessage(expected) {
    cy.get('#email').then(($email) => {
      expect($email[0].validationMessage, 'browser validation message').to.contain(expected);
    });
    cy.url().should('not.include', 'forgot=true');
  }
}

export default new ForgotPasswordPage();
