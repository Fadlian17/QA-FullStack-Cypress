class AgodaPaymentPage {
  getTotalPrice() {
    return cy.get('[data-test-id="total-price-display"]').invoke('text');
  }

  getPassengerName() {
    return cy.get('[data-test-id="passenger-name-display"]').invoke('text');
  }

  getDepartureTime() {
    return cy.get('[data-test-id="departure-time-display"]').invoke('text');
  }

  getArrivalTime() {
    return cy.get('[data-test-id="arrival-time-display"]').invoke('text');
  }
}

export default new AgodaPaymentPage();