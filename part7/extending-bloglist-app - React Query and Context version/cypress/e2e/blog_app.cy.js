describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'testuser',
            password: 'testpass',
            name: 'Test Name'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('form').should('be.visible')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('testpass')
            cy.get('#login-button').click()
            cy.contains('testuser is logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('wrong!')
            cy.get('#login-button').click()
            cy.contains('Wrong credentials')
            cy.get('html').should('not.contain', 'testuser is logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testuser',password: 'testpass',name: 'Test Name' })
        })

        it('A blog can be created', function() {
            cy.contains('New Blog').click()

            cy.get('#new-blog-form-title').type('Example title 1231234')
            cy.get('#new-blog-form-author').type('George Super Author')
            cy.get('#new-blog-form-url').type('http://test.com')
            cy.get('#new-blog-form-create-button').click()

            cy.contains('A new blog Example title 1231234 by George Super Author has been added')
            cy.contains('Example title 1231234')
            cy.contains('George Super Author')
            cy.contains('view').click()
            cy.contains('http://test.com')
            cy.contains('Likes: 0')
        })

        it('User can like a blog', function() {
            cy.createBlog({
                'title': 'New blog title 1',
                'author': 'George',
                'url': 'www.test.com'
            })

            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('Likes: 1')
        })

        it('User who created a blog can delete it', function() {
            cy.createBlog({
                'title': 'New blog title 1',
                'author': 'George',
                'url': 'www.test.com'
            })

            cy.contains('view').click()

            cy.get('.expanded-blog').contains('remove blog').click()
            cy.get('html').should('not.contain', 'New blog title 1')
        })

        it('User cannot delete a blog of created by other user', function() {
            const user2 = {
                username: 'testuser2',
                password: 'testpass2',
                name: 'Test Name2'
            }
            cy.request('POST', 'http://localhost:3003/api/users', user2)

            cy.createBlog({
                'title': 'New blog title 1',
                'author': 'George',
                'url': 'www.test.com'
            })

            cy.login({ username: 'testuser2',password: 'testpass2',name: 'Test Name2' })

            cy.contains('view').click()

            cy.get('.expanded-blog').contains('remove blog').click()
            cy.get('html').should('contain', 'blog can be deleted only by the owner')
            cy.get('html').should('contain', 'New blog title 1')
        })

        it('Blogs are ordered according to likes, blog with most likes being first', function() {
            cy.createBlog({
                'title': 'New blog title 1',
                'author': 'George',
                'url': 'www.test.com'
            })
            cy.createBlog({
                'title': 'New blog title 2',
                'author': 'Martinez G',
                'url': 'www.test2.com'
            })

            cy.get('.blog-view-button').eq(0).click()
            cy.get('.blog-view-button').eq(0).click()

            cy.get('.expanded-blog').eq(1).contains('like').click()
            cy.get('.expanded-blog').eq(1).contains('like').click()
            cy.get('.expanded-blog').eq(1).contains('like').click()
            cy.get('.expanded-blog').eq(0).contains('like').click()

            cy.get('.expanded-blog').eq(0).should('contain', 'Likes: 3')
        })
    })
})