export const getDeconnexion = () => {
  return cy.get('a[href="/logout"]');
}
