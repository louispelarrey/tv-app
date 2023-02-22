import { getDeconnexion } from '../support/app.po';

describe('frontend', () => {
  beforeEach(() => cy.visit('/login'));

  it('should display déconnexion', () => {
    cy.login('louispelarrey@gmail.com', 'string')
    // Function helper example, see `../support/app.po.ts` file
    getDeconnexion().contains('Déconnexion');
  });
});
