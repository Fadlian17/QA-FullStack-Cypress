class AmazonHomePage {
  visit() {
    cy.visit(Cypress.env('amazonBaseUrl'));
  }

  searchForItem(item) {
    cy.get('#twotabsearchtextbox').type(item);
    cy.get('#nav-search-submit-button').click();
  }
}

export default new AmazonHomePage();