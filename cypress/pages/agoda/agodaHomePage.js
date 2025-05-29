// cypress/pages/agoda/AgodaHomePage.js

class AgodaHomePage {
  visit() {
    cy.visit(Cypress.env('agodaBaseUrl'));

    cy.wait(1000); // Beri waktu sebentar untuk pop-up dan elemen memuat

    cy.get('body').then(($body) => {
      // --- Penanganan Pop-up ---
      // Pastikan semua pop-up yang mungkin muncul ditutup
      // Gunakan selector yang sudah kamu identifikasi di Agoda.com
      if ($body.find('.Modal-closeButton').length) {
        cy.get('.Modal-closeButton').click({ force: true });
        cy.wait(500);
      }
      if ($body.find('#onetrust-accept-btn-handler').length) {
        cy.get('#onetrust-accept-btn-handler').click({ force: true });
        cy.wait(500);
      }
      if ($body.find('[aria-label="Close dialog"]').length) {
        cy.get('[aria-label="Close dialog"]').click({force: true});
        cy.wait(500);
      }
      // Tambahkan penanganan pop-up lain jika ada
      // Contoh: kadang Agoda ada pop-up "Sign In" atau "Get the App" yang perlu ditutup
      if ($body.find('.sc-bGWctP.sc-jHZqM.eDgFpZ').length) { // Contoh selector untuk tombol "No, thanks" di pop-up tertentu
        cy.get('.sc-bGWctP.sc-jHZqM.eDgFpZ').click({ force: true });
        cy.wait(500);
      }
      // --- Akhir Penanganan Pop-up ---
    });

    // --- Menunggu Elemen Penutup (`.highlight`) Menghilang ---
    // Pastikan elemen penutup hilang sebelum mencoba klik tab Flights
    // Selector ini mungkin perlu disesuaikan jika nama kelas 'highlight' berubah
    cy.get('body').then(($body) => {
        if ($body.find('.highlight').length) {
            cy.get('.highlight').should('not.exist', { timeout: 5000 }); // Tunggu hingga 5 detik sampai .highlight menghilang
        }
    });


    // Menunggu elemen 'Flights' muncul dan terlihat
    const flightsTabSelector = '#tab-flight-tab > .Box-sc-kv6pi1-0 > .a4cbd-box > .Typographystyled__TypographyStyled-sc-j18mtu-0';
    cy.get(flightsTabSelector).should('be.visible', { timeout: 10000 });
  }

  selectFlightTab() {
    const flightsTabSelector = '#tab-flight-tab > .Box-sc-kv6pi1-0 > .a4cbd-box > .Typographystyled__TypographyStyled-sc-j18mtu-0';
    // Sekarang, coba klik elemen tersebut
    cy.get(flightsTabSelector).click();
    // Jika masih gagal, coba dengan force: true (hanya untuk debugging atau jika tidak ada opsi lain)
    // cy.get(flightsTabSelector).click({ force: true });
  }

  // --- Metode lainnya ---
  selectOrigin(city) {
    cy.get('[data-element-name="city-text-input"]').eq(0).click();
    cy.get('[data-element-name="text-input"]').type(city);
    cy.wait(500);
    cy.get('.SuggestionList > li').first().click();
  }

  selectDestination(city) {
    cy.get('[data-element-name="city-text-input"]').eq(1).click();
    cy.get('[data-element-name="text-input"]').type(city);
    cy.wait(500);
    cy.get('.SuggestionList > li').first().click();
  }

  selectDepartureDate(date) {
    cy.get('[data-element-name="dep-date-text-input"]').click();
    cy.get(`.DayPicker-Day[aria-label*="${date}"]`).click();
  }

  searchFlights() {
    cy.get('[data-element-name="SearchButton"]').click();
  }
}

export default new AgodaHomePage();