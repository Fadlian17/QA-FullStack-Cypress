class AgodaSearchResultsPage {
  filterByAirline(airline) {
    cy.get('[data-test-id="airline-filter"]').contains(airline).click();
  }

  selectEarliestFlight() {
    // This will depend on the Agoda UI for sorting and selecting
    // Assuming there's a sort by 'earliest' or we can pick the first one after filtering
    cy.get('[data-test-id="flight-card"]').first().click(); // Placeholder, actual selector might be different
  }

  continueToPassengerDetails() {
    cy.get('[data-test-id="continue-button"]').click(); // Placeholder
  }
}

export default new AgodaSearchResultsPage();