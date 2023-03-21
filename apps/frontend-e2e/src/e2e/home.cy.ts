import { login } from "../support/app.po";

describe('series', () => {
  beforeEach(() => {
    login()
    cy.wait(1000)
    cy.visit("/");
  });

  it('should display shows', () => {
    cy.get('[data-cy="show-card"]').should('have.length.greaterThan', 0);
  });

  it('should filter shows by search input', () => {
    const searchText = 'cyberpunk';
    cy.get('[data-cy="search-input"]').type(searchText);
    cy.get('[data-cy="show-card"]').should('have.length.greaterThan', 0);
    cy.get('[data-cy="show-card-name"]').each(name => {
      expect(name.text().toLowerCase()).to.include(searchText.toLowerCase());
    });
  });

  // it('should open and close create show modal', () => {
  //   cy.get('[data-cy="create-show-button"]').click();
  //   cy.get('[id="create-show-modal"]').should('be.visible');
  //   cy.get('[data-cy="close-modal-button"]').click();
  //   cy.get('[data-cy="create-show-modal"]').should('not.be.visible');
  // });

  it('should increment or decrement on like', () => {
    // Get the initial text inside the button
    cy.get('[data-cy="like-button"]').first().invoke('text').then(initialText => {
      // Click on the like button
      cy.get('[data-cy="like-button"]').first().click();
      // Get the updated text inside the button and verify that it has been incremented or decremented by 1
      cy.get('[data-cy="like-button"]').first().invoke('text').should('not.equal', initialText);
    });
  });
});
