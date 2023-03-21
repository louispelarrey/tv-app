export const getDeconnexion = () => {
  return cy.get('a[href="/logout"]');
}

export const getLikeButton = () => {
  return cy.get('button[name="like-button"]');
}

export const login = () => {
  cy.visit('/login');

  cy.get('input[name="email"]').type('louispelarre@gmail.com');
  cy.get('input[name="password"]').type('string');
  cy.get('button[type="submit"]').click();
}
