describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('login form is shown', function() {
    cy.contains('log in to application')
  })
})
