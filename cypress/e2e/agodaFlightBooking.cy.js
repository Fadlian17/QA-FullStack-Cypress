import AgodaHomePage from '../pages/agoda/agodaHomePage';
import AgodaSearchResultsPage from '../pages/agoda/agodaSearchResultPage';
import AgodaPassengerDetailsPage from '../pages/agoda/agodaPassegerPage';
import AgodaPaymentPage from '../pages/agoda/agodaPaymentPage';
import passengerData from '../fixtures/passenger_data.json';
import moment from 'moment'; // Make sure moment.js is installed: npm install moment

describe('Agoda Flight Booking Flow', () => {
  let expectedTotalPrice;
  let expectedDepartureTime;
  let expectedArrivalTime;

  beforeEach(() => {
    AgodaHomePage.visit();
  });

  it('should successfully book a flight from Jakarta to Singapore with Malaysia Airlines', () => {
    const tomorrow = moment().add(1, 'days').format('D MMMM YYYY'); // e.g., "26 May 2025"

    AgodaHomePage.selectFlightTab();
    AgodaHomePage.selectOrigin('Jakarta');
    AgodaHomePage.selectDestination('Singapore');
    AgodaHomePage.selectDepartureDate(tomorrow);
    AgodaHomePage.searchFlights();

    // Give time for search results to load
    cy.url().should('include', '/flights/search');

    // Filter by Malaysia Airlines and select earliest flight
    AgodaSearchResultsPage.filterByAirline('Malaysia Airlines');
    // For demonstration, let's assume we capture details before proceeding
    // In a real scenario, you'd find the earliest flight and extract its details
    cy.get('[data-test-id="flight-card"]').first().then(($flightCard) => {
        // Extracting total price and times from the selected flight card
        // This requires precise selectors based on Agoda's flight card UI
        expectedDepartureTime = $flightCard.find('[data-test-id="departure-time"]').text();
        expectedArrivalTime = $flightCard.find('[data-test-id="arrival-time"]').text();
        expectedTotalPrice = $flightCard.find('[data-test-id="flight-price"]').text().replace(/[^0-9.]/g, ''); // Clean price string
    });

    AgodaSearchResultsPage.selectEarliestFlight();
    AgodaSearchResultsPage.continueToPassengerDetails();

    // Fill passenger details
    AgodaPassengerDetailsPage.fillPassengerDetails(passengerData);
    AgodaPassengerDetailsPage.continueToPayment();

    // Assertions on the payment page
    AgodaPaymentPage.getTotalPrice().then((actualPriceText) => {
      const actualPrice = actualPriceText.replace(/[^0-9.]/g, '');
      expect(actualPrice).to.include(expectedTotalPrice); // Use include as price might have currency symbols
    });

    AgodaPaymentPage.getPassengerName().then((actualPassengerName) => {
      expect(actualPassengerName).to.include(passengerData.firstName);
      expect(actualPassengerName).to.include(passengerData.lastName);
    });

    AgodaPaymentPage.getDepartureTime().should('eq', expectedDepartureTime);
    AgodaPaymentPage.getArrivalTime().should('eq', expectedArrivalTime);

    // Stop before actual payment (as per requirement)
  });
});