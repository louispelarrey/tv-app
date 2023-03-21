import { login } from "../support/app.po";

describe('view-specific', () => {
  beforeEach(() => {
    login()
    cy.wait(1000)
    cy.visit("/");
  });

  it('should display specific view', () => {
    cy.get('[data-cy="show-card"]').should('have.length.greaterThan', 0);
    //Get the show name of the first show card
    cy.get('[data-cy="show-card-name"]').first().invoke('text').then(showName => {
      cy.get('[data-cy="show-card"]').first().click();
      cy.get('[data-cy="details-name"]').invoke('text').should('equal', showName);
    });

    cy.get('[data-cy="details-description"]').should('be.visible');
  });
});
