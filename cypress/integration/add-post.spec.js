describe('test voting', function () {
  beforeEach(() => {
    cy.login();
  });
  it('test voting system', () => {
    cy.server();
    cy.visit('/post/list');
    cy.get('[data-cy=post]').should('have.length', 7);
    cy.visit('/post/add');
    cy.get('[data-cy=title]').type('test');
    cy.get('[data-cy=body]').type('test test test');
    cy.get('[data-cy=submitpost').click();
    cy.visit('/post/list');
    cy.get('[data-cy=post]').should('have.length', 8);
  });
});
