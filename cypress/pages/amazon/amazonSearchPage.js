class AmazonSearchResultsPage {
  sortByPriceHighToLow() {
    cy.get('.a-dropdown-container').click(); // Assuming this opens the sort dropdown
    cy.get('a[data-value="price-desc-rank"]').click(); // Selector for "Price: High to Low"
  }

  getRightmostNonAdItemInFirstRow() {
    // This requires careful selector crafting based on Amazon's dynamic layout
    // It's likely a combination of CSS selectors to target the first row and filter out ads.
    // Placeholder selector:
    return cy.get('.s-result-list > .s-result-item:not(.AdHolder)').first().find('.s-card-border:last-child');
  }

  getItemName(itemElement) {
    return itemElement.find('h2 a.a-link-normal').invoke('text');
  }

  getItemPrice(itemElement) {
    return itemElement.find('.a-price-whole').invoke('text'); // Gets the whole number part of the price
  }

  clickItem(itemElement) {
    itemElement.click();
  }
}

export default new AmazonSearchResultsPage();