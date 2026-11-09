// ============================================================
// LogoutPage.js
// Equivalent to: pages/LogoutPage.java
//
// Multi-strategy logout.
// Each strategy is attempted in the same cy.get('body').then() tick
// so Cypress queues them correctly.
// ============================================================

class LogoutPage {

  // ── Main logout entry point ──────────────────────────────────
  clickLogout() {
    cy.get('body').then(($body) => {

      // ── Strategy 1: direct href/class/id logout element ──
      const directSel =
        "a[href*='logout'], a[href*='signout'], a[href*='sign-out'], " +
        "[class*='logout'], [id*='logout']";
      const directEl = $body.find(directSel).filter(':visible');
      if (directEl.length > 0) {
        cy.wrap(directEl.first()).click();
        return;
      }

      // ── Strategy 2: visible link/button whose text IS "logout" etc. ──
      const byText = $body.find('a, button, li').filter((_, el) => {
        const t = Cypress.$(el).text().trim().toLowerCase();
        return ['logout', 'log out', 'sign out', 'signout'].includes(t) &&
               Cypress.$(el).is(':visible');
      });
      if (byText.length > 0) {
        cy.wrap(byText.first()).click();
        return;
      }

      // ── Strategy 3: open a user/account dropdown then find logout ──
      const dropdownSel =
        "[class*='user-menu'], [class*='user-dropdown'], [class*='account-menu'], " +
        "[class*='user-avatar'], [class*='avatar'], [class*='user-name'], " +
        "[class*='nav-user'], [data-toggle='dropdown'], [data-bs-toggle='dropdown'], " +
        "button[aria-haspopup='true']";
      const dropdownTrigger = $body.find(dropdownSel).filter(':visible');
      if (dropdownTrigger.length > 0) {
        cy.wrap(dropdownTrigger.first()).click();
        cy.wait(800);
        // After the dropdown opens, look for a logout text element
        cy.get('body').then(($b2) => {
          const afterOpen = $b2.find('a, button, li').filter((_, el) => {
            const t = Cypress.$(el).text().trim().toLowerCase();
            return ['logout', 'log out', 'sign out', 'signout'].includes(t) &&
                   Cypress.$(el).is(':visible');
          });
          if (afterOpen.length > 0) {
            cy.wrap(afterOpen.first()).click();
          } else {
            // Dropdown didn't reveal logout — try URL fallback
            cy.visit('/logout', { failOnStatusCode: false });
          }
        });
        return;
      }

      // ── Strategy 4: navigate directly to /logout ──
      cy.visit('/logout', { failOnStatusCode: false });
    });
  }

  // ── Assertion: user is now logged out ────────────────────────
  verifyLoggedOut() {
    // Logged in = ?logged=true in the URL; after logout the login form is back
    cy.url({ timeout: 15000 }).should('not.include', 'logged=true');
    cy.contains('form button[type="submit"]', 'Login').should('be.visible');
    cy.get('#success-msg').should('not.exist');
  }
}

export default new LogoutPage();
