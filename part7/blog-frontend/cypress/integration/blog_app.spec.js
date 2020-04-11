describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    // create a user
    const user = {
      name: 'Test User',
      username: 'user',
      password: 'secret'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);

    // create another user
    const user2 = {
      name: 'Another Test User',
      username: 'user2',
      password: 'secret'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user2);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.get('#username');
    cy.get('#password');
    cy.get('.form');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('user');
      cy.get('#password').type('secret');
      cy.get('#login-button').click();

      cy.contains('Test User logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('user');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.warning')
        .should('contain', 'Invalid username or password.')
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        .and('have.css', 'color', 'rgb(114, 28, 36)')
        .and('have.css', 'border-color', 'rgb(245, 198, 203)')
        .and('have.css', 'border-style', 'solid');

    });

  });

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user', password: 'secret' });
    });

    it('A blog can be created', function() {
      cy.contains('Add Blog').click();
      cy.get('#author').type('cypress author');
      cy.get('#title').type('cypress title');
      cy.get('#url').type('http://localhost:3000');

      cy.get('#add-blog-button').click();

      cy.contains('cypress title');

    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'another cypress blog author',
          title: 'another cypress blog title',
          url: 'http://localhost:3000'
        });
      });

      it('it can be liked', function () {
        cy.contains('another cypress blog author')
          .contains('view')
          .click();

        cy.contains('like').click();

        cy.contains('another cypress blog author')
          .contains('view')
          .click();

        cy.contains('likes 1');

      });

      it('it can be deleted', function () {
        cy.contains('another cypress blog author')
          .contains('view')
          .click();

        cy.contains('remove').click();


        cy.contains('another cypress blog author').should('not.exist');
        
      });

      it('it can only be deleted by the user that created it', function () {
        cy.logout();
        cy.login({ username: 'user2', password: 'secret' });

        cy.contains('another cypress blog author')
          .contains('view')
          .click();

        cy.contains('remove').should('not.exist');

      });

    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ author: 'first author', title: 'first title', url: 'first url', likes: 0 });
        cy.createBlog({ author: 'second author', title: 'second title', url: 'second url', likes: 5 });
        cy.createBlog({ author: 'third author', title: 'third title', url: 'third url', likes: 10 });
      });

      it('it orders blogs by descending likes', function () {
        // open each blog 
        cy.contains('first author').click()
        cy.contains('second author').click();
        cy.contains('third author').click();

        // ensure the first one has 10 likes!
        cy.get('.blogItem').first().should('contain', 'likes 10');

        // ensure the second one has 5 likes!
        cy.get('.blogItem').eq(1).should('contain', 'likes 5');

        // ensure the third one has 0 likes!
        cy.get('.blogItem').last().should('contain', 'likes 0');

      });
      
    });

  });

});