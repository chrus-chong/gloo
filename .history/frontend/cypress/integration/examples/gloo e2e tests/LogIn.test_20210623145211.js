describe("HomeScreen loads correctly with title and sign in button", () => {
    before( () => {
      cy.viewport(1280, 720)
      cy.visit("https://gloo-fixr.herokuapp.com");
    })
  
    it("Sign in button can be clicked", () => {
      cy.contains("Sign In").click();
    });
  
    it("Redirected to Sign In page", () => {
      cy.url().should("include", '/login');
    });

    it("Unable to login without keying in email or password", () => {
        cy.get('Button').should('havetext', 'Sign In');
      });

    // it("Unable to login without keying in correct email", () => {
    //     cy.url().should("include", '/login');
    // });

    //   it("Unable to login without keying correct password", () => {
    //     cy.url().should("include", '/login');
    //   });

    //   it("Able to login with correct email and password", () => {
    //     cy.url().should("include", '/login');
    //   });
  });