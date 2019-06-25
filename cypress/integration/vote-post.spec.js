describe('test voting', function () {
  beforeEach(() => {
    cy.login();
  });
  it('test voting system', () => {
    cy.visit('/post/detail/4');
    cy.get('[data-cy=score]').should('contain',4);
    cy.get('[data-cy=upvote]').click();
    cy.get('[data-cy=score]').should('contain',5);
    cy.get('[data-cy=upvote]').click();
    cy.get('[data-cy=score]').should('contain',4);
    cy.get('[data-cy=downvote]').click();
    cy.get('[data-cy=score]').should('contain',3);
    cy.get('[data-cy=downvote]').click();
    cy.get('[data-cy=score]').should('contain',4);
    cy.get('[data-cy=downvote]').click();
    cy.get('[data-cy=score]').should('contain',3);
    cy.get('[data-cy=upvote]').click();
    cy.get('[data-cy=score]').should('contain',5);
  });
});
