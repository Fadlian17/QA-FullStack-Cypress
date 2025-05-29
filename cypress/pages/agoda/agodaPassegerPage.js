class AgodaPassengerDetailsPage {
  fillPassengerDetails(passenger) {
    cy.get('[data-test-id="first-name-input"]').type(passenger.firstName);
    cy.get('[data-test-id="last-name-input"]').type(passenger.lastName);
    cy.get('[data-test-id="email-input"]').type(passenger.email);
    cy.get('[data-test-id="phone-number-input"]').type(passenger.phoneNumber);
    // Add more fields as per Agoda's actual form
  }

  continueToPayment() {
    cy.get('[data-test-id="continue-to-payment-button"]').click();
  }
}

export default new AgodaPassengerDetailsPage();