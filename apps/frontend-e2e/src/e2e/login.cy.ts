import { login } from "../support/app.po";

describe('login', () => {

  it('should display déconnexion', () => {
    login();

    cy.contains('a', 'Déconnexion').should('be.visible');
  });
});
