describe('Blog app', function() {
  const user = {
    username: 'root',
    name: 'Superuser',
    password: 'topsecret',
  }
  const blog = {
    title: 'How to automatically performance test your pull requests and fight regressions',
    author: 'Joseph Wynn',
    url: 'https://www.speedcurve.com/blog/web-performance-test-pull-requests/',
    likes: 1,
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
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('user-does-not-exist')
      cy.get('input[name="Password"]').type('mypassword')
      cy.get('#login-button').click()

      cy.contains('user-does-not-exist logged in').should('not.exist')
      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('input[name="Title"]').type('New title')
      cy.get('input[name="Author"]').type('New author')
      cy.get('input[name="URL"]').type('New URL')
      cy.get('#create-blog-button').click()

      cy.contains('New title New author')
      cy.get('.success')
        .should('contain', 'A new blog "New title" was successfully created')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('When a blog exists', function () {
      beforeEach(function () {
        cy.createBlog(blog)
      })

      it('users can like it', function () {
        cy.contains('view').click()
        cy.contains('hide')

        cy.contains('like').click()
        cy.contains(`likes ${blog.likes + 1}`)

        cy.get('.success')
          .should('contain', `An existing blog "${blog.title}" was successfully updated`)
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })
    })
  })
})
