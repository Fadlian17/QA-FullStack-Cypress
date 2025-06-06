    // cypress/pages/agodaPages/cariPesawat.js
    class CariPesawat {
      // Memverifikasi URL hasil pencarian
      cekListUrl(departureFrom, arrivalTo, date, cabinType, passenger) {
        cy.url().should('include', `/flights/search`);
        cy.url().should('include', encodeURIComponent(departureFrom));
        cy.url().should('include', encodeURIComponent(arrivalTo));
        cy.url().should('include', `date=${date}`);
        cy.url().should('include', `cabin=${cabinType.toLowerCase()}`);
        cy.url().should('include', `adults=${passenger}`);
      }

      // Memilih maskapai "Malaysia Airlines"
      selectMalaysiaAirlines() {
        // Asumsi ada filter maskapai di sidebar atau bagian atas
        cy.contains('[data-selenium="airline-filter"]', 'Malaysia Airlines').click(); // Sesuaikan selector
      }

      // Mengklik dropdown pengurutan (misal untuk mengurutkan berdasarkan waktu paling awal)
      clickSortByDropdown() {
        cy.get('[data-selenium="sort-by-dropdown"]').click(); // Sesuaikan selector dropdown sort
        cy.get('[data-selenium="sort-by-option-earliest"]').click(); // Klik opsi "Earliest" atau "Departure Time"
      }

      // Memilih penerbangan pertama atau penerbangan dengan waktu spesifik
      clickListMalaysiaAirlines(earliestTime) {
        // Ini adalah selector yang kompleks. Asumsi kita mencari flight card berdasarkan waktu keberangkatan
        cy.xpath(`//div[@data-testid="flight-card"]//div[@data-test-id="departure-time"]//h3[contains(text(), '${earliestTime}')]`).first().click();
      }

      // Mendapatkan elemen flight card pertama (atau yang paling awal)
      getFirstFlightCard() {
        return cy.get('[data-test-id="flight-card"]').first(); // Selector untuk kartu penerbangan
      }

      // Mendapatkan elemen total harga dari kartu penerbangan
      getTotalPriceElementFromCard(flightCard) {
        return flightCard.find('[data-test-id="flight-price"]'); // Selector harga di dalam kartu
      }

      // Mendapatkan elemen waktu keberangkatan dari kartu penerbangan
      getDepartureTimeElementFromCard(flightCard) {
        return flightCard.find('[data-test-id="departure-time"]'); // Selector waktu keberangkatan di dalam kartu
      }

      // Mendapatkan elemen waktu kedatangan dari kartu penerbangan
      getArrivalTimeElementFromCard(flightCard) {
        return flightCard.find('[data-test-id="arrival-time"]'); // Selector waktu kedatangan di dalam kartu
      }
    }
    export default new CariPesawat();
    