describe('Blog app', function() {
  const user = {
    username: 'root',
    name: 'Superuser',
    password: 'topsecret',
  }

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in to application')

      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in to application')

      cy.get('input[name="Username"]').type('user-does-not-exist')
      cy.get('input[name="Password"]').type('mypassword')
      cy.get('#login-button').click()

      cy.contains('user-does-not-exist logged in').should('not.exist')
      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
