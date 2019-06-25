// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  const email = 'jarne.deschacht@hotmail.com';
  const password = 'P@ssword1111';

  cy.visit('/authentication/login');
  cy.get('[data-cy=login-email]').type('jarne.deschacht@hotmail.com');
  cy.get('[data-cy=login-password]').type(password);
  cy.get('[data-cy=login-button').click();

  cy.request({
    method: 'POST',
    url: '/api/account',
    body: {
      email,
      password
    }
  }).then(res => localStorage.setItem('currentUserToken', res.body));
  cy.request({
    method: 'GET',
    url: `/api/user/${email}`
  }).then(res => localStorage.setItem('currentUser', JSON.stringify(res.body)));
});
