import _ from 'lodash'


describe('Blog app', function () {
  const initialUsers = [
    {
      username: 'root',
      name: 'Superuser',
      password: 'topsecret',
    },
    {
      username: 'teverts',
      name: 'Tammy Everts',
      password: 'ymmat',
    },
    {
      username: 'ccrocker',
      name: 'Cliff Crocker',
      password: 'ffilc',
    },
  ]

  const initialBlogs = [
    {
      title: 'Performance audit: Lego.com',
      author: 'Tammy Everts',
      url: 'https://www.speedcurve.com/blog/web-performance-audit-lego/',
      likes: 5,
    },
    {
      title: 'NEW! December product update',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/december-2023-update/',
      likes: 99,
    },
    {
      title: 'Mobile INP performance: The elephant in the room',
      author: 'Cliff Crocker',
      url: 'https://www.speedcurve.com/blog/core-web-vitals-inp-mobile/',
      likes: 2,
    },
  ]

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    initialUsers.forEach(user => {
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    })
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type(_.first(initialUsers).username)
      cy.get('input[name="Password"]').type(_.first(initialUsers).password)
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('user-does-not-exist')
      cy.get('input[name="Password"]').type('mypassword')
      cy.get('#login-button').click()

      cy.contains('user-does-not-exist logged in').should('not.exist')
      cy.get('.error', { timeout: 10000 })
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: _.first(initialUsers).username, password: _.first(initialUsers).password })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('input[name="Title"]').type('New title')
      cy.get('input[name="Author"]').type('New author')
      cy.get('input[name="URL"]').type('New URL')
      cy.get('#create-blog-button').click()

      cy.contains('New title New author')
      cy.get('.success', { timeout: 10000 })
        .should('contain', 'A new blog "New title" was successfully created')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('When a blog exists', function () {
      const firstBlog = _.first(initialBlogs)

      beforeEach(function () {
        cy.createBlog(firstBlog)
      })

      it('users can like it', function () {
        cy.contains('view').click()
        cy.contains('hide')

        cy.contains('like').click()
        cy.contains(`likes ${firstBlog.likes + 1}`)

        cy.get('.success', { timeout: 10000 })
          .should('contain', `An existing blog "${firstBlog.title}" was successfully updated`)
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('only the creator can delete it', function () {
        cy.contains('view').click()
        cy.contains('hide')

        cy.contains('remove').click()

        cy.get('.success', { timeout: 10000 })
          .should('contain', `An existing blog "${firstBlog.title}" was successfully removed`)
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('other users cannot delete it', function () {
        cy.contains('logout').click()
        cy.login({ username: _.last(initialUsers).username, password: _.last(initialUsers).password })

        cy.contains('view').click()
        cy.contains('hide')

        cy.contains('remove').should('not.exist')
      })
    })

    describe('When multiple blogs exist', function () {
      const lastBlog = _.last(initialBlogs)

      beforeEach(function () {
        initialBlogs.forEach(blog => {
          cy.createBlog(blog)
        })
      })

      it('blogs are sorted according to their likes in descending order', function () {
        // Initial ordering
        const expectedInitialLikes = _.chain(initialBlogs).map('likes').orderBy([], ['desc']).value()
        cy.get('.blog').each(($el, index) => {
          cy.wrap($el).as('blog')
          cy.get('@blog').contains('view').click()
          cy.get('@blog').contains(`likes ${expectedInitialLikes[index]}`)
        })

        // Manipulate likes
        cy.get('.blog').contains(lastBlog.title).parent().as('lastBlog')
        const nClicks = 4
        for (let i = 1; i <= nClicks; i++) {
          cy.get('@lastBlog').contains('like').click().then(response => {
            cy.get('@lastBlog').contains(`likes ${_.last(expectedInitialLikes) + i}`)
          })
        }

        // Updated ordering
        cy.get('.blog').eq(1)  // moved higher to a second last position
          .should('contain', lastBlog.title)
          .and('contain', `likes ${_.last(expectedInitialLikes) + nClicks}`)
      })
    })
  })
})
