// ============================================================
// RegressionSteps.js — e-commerce demo (practice.qabrains.com/ecommerce)
// Every product card has one button that toggles between
// "Add to cart" and "Remove from cart".
// ============================================================

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const ADD = /^\s*add to cart\s*$/i;
const REMOVE = /^\s*remove from cart\s*$/i;

const cartButtons = (re) => cy.get('button').filter((_, el) => re.test(el.textContent));

Given('User is logged in to the e-commerce site', () => {
  cy.fixture('config').then((cfg) => {
    cy.visit('/ecommerce/login');
    cy.get('#email').clear().type(cfg.shop_email);
    cy.get('#password').clear().type(cfg.shop_password, { log: false });
    cy.get('button[type="submit"]').first().click();
  });
  cy.contains('button', ADD, { timeout: 20000 }).should('be.visible');
});

When('User adds {int} products to cart', (count) => {
  // count through jQuery so that zero "Remove from cart" buttons is a valid starting point
  const removeCount = ($body) => $body.find('button').filter((_, el) => REMOVE.test(el.textContent)).length;
  for (let i = 0; i < count; i += 1) {
    cy.get('body').then(($body) => {
      const before = removeCount($body);
      cartButtons(ADD).first().scrollIntoView().click();
      cy.get('body').should(($b) => {
        expect(removeCount($b), 'products in the cart').to.equal(before + 1);
      });
    });
  }
});

Then('{int} products should be in the cart', (count) => {
  cartButtons(REMOVE).should('have.length', count);
});

When('User opens the details of the first product', () => {
  cy.get('a[href*="/ecommerce/product-details"]').first().invoke('attr', 'href').then((href) => {
    cy.visit(href);
  });
  cy.url().should('include', 'product-details?id=');
});

Then('The product details page should show its name and price', () => {
  cy.contains(/\$\d+\.\d{2}/, { timeout: 15000 }).should('be.visible');
  cy.contains(/Sample/).should('be.visible');
});

Then('Every product card should show a name, a price and an {string} button', (buttonText) => {
  cy.get('a[href*="/ecommerce/product-details"]').then(($links) => {
    const products = new Set([...$links].map((a) => a.getAttribute('href')));
    cartButtons(ADD).should('have.length', products.size);
    cartButtons(ADD).each(($btn) => {
      // the card is the closest ancestor that also holds a product link
      const card = $btn.closest(':has(a[href*="product-details"])');
      const text = card.text();
      expect(text, 'price on card').to.match(/\$\d+\.\d{2}/);
      expect(text, 'product name on card').to.contain('Name');
      expect(text, 'button on card').to.contain(buttonText);
    });
  });
});
