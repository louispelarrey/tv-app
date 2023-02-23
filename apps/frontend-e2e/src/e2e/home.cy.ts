import { login } from "../support/app.po";

describe('series', () => {
  beforeEach(() => {
    login()
    cy.visit("/");
  });

  it('should increment or decrement on like', () => {
    // Get the initial text inside the button
    cy.get('button[name="like-button"]').first().invoke('text').then(initialText => {
      // Click on the like button
      cy.get('button[name="like-button"]').first().click();

      // Get the updated text inside the button and verify that it has been incremented or decremented by 1
      cy.get('button[name="like-button"]').first().invoke('text').should('not.equal', initialText);
    });
  });
});
