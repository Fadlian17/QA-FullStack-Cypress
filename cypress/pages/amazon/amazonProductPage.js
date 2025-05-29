class AmazonProductDetailPage {
  getProductName() {
    return cy.get('#productTitle').invoke('text');
  }

  getProductPrice() {
    return cy.get('.a-price-whole').invoke('text'); // Gets the whole number part of the price
  }
}

export default new AmazonProductDetailPage();