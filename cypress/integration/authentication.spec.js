import { createYield } from 'typescript';

describe('Login Page', () => {
  beforeEach(() => {});

  it('logintest', () => {
    cy.login();
  });
  it('login page', () => {
    cy.login();
    // login name should be in the title balk
    cy.contains('Jarne');
    // at last one post should be visible (i.e. we should have been forwarded to the post page)
    cy.get('[data-cy=post-title]').should('be.visible');
  });
});