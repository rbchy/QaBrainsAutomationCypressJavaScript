// ============================================================
// SmokeSteps.js — sidebar demo modules open from the menu
// ============================================================

import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('User opens each demo module from the menu', (dataTable) => {
  dataTable.raw().forEach(([label, expectedInUrl]) => {
    cy.visit('/');
    // menu items are rendered client-side; cy.contains retries until they appear
    cy.contains('[role="menuitem"], a', new RegExp(`^\\s*${label}\\s*$`), { timeout: 15000 })
      .first()
      .then(($el) => {
        // keep the demo site in this tab (Cypress drives a single tab)
        const link = $el.is('a') ? $el : $el.find('a');
        if (link.length) {
          cy.wrap(link).invoke('removeAttr', 'target');
        }
        cy.wrap($el).click();
      });
    cy.url({ timeout: 15000 }).should('include', expectedInUrl);
  });
});

Then('Each module page should open', () => {
  cy.get('body').should('be.visible');
});
