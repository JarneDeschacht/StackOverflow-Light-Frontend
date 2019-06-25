describe('test answering posts', function () {
  beforeEach(() => {
    cy.login();
  });
  it('test answering posts', () => {
    cy.server();
    cy.visit('/post/detail/4');
    cy.get('[data-cy=answer]').should('have.length', 1);
    cy.get('[data-cy=answerbody]').type('test test');
    cy.get('[data-cy=confirm-answer').click();
    cy.get('[data-cy=answer]').should('have.length', 2);
  });
});
