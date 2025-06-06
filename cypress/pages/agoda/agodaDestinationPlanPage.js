// cypress/pages/agodaPages/agodaDestinationPlanPage.js
class AgodaDestinationPlanPage {
    constructor(){
        this.xpathPopUpDismiss = `//div[@class="ab-modal-wrapper"]`; // Contoh selector pop-up general
        this.dismissButton = `//button[@data-element-name="ab-close-button"]`; // Contoh tombol close pop-up

        // Selector XPath untuk tab penerbangan
        this.flightTab = `//li[@id="tab-flight-tab"]`;
    }

    // Menutup pop-up yang mungkin muncul di awal kunjungan (misal untuk newsletter, dll.)
    // Ini bersifat opsional dan harus disesuaikan dengan pop-up yang mungkin muncul di Agoda
    dismissAnyPopUp() {
      cy.get('body').then(($body) => {
        // Cek apakah pop-up terlihat
        if ($body.find(this.xpathPopUpDismiss).length > 0) {
          cy.xpath(this.dismissButton).click({ force: true });
          cy.log('Pop-up umum ditutup.');
        }
      });
    }

    // Mengklik tab "Flights"
    clickFlightTab(){
        cy.xpath(this.flightTab).click({multiple:true});
        cy.url().should('include','#flights');
    }

    // Mendapatkan input asal penerbangan (digunakan untuk assertion di test spec)
    get flightOriginInput() {
        return cy.get('#flight-origin-search-input');
    }

    // Metode lama: Memasukkan kota asal dan memilih bandara keberangkatan menggunakan data-objectid/data-text
    flyingFrom(cityFrom, departureAirport, departureFrom) {
        this.flightOriginInput.click().type(`${cityFrom}`);
        // Menggunakan data-objectid dan data-text dari env
        cy.xpath(`//li[@data-objectid="${departureFrom}" and @data-text="${departureAirport}"]`)
            .should('be.visible')
            .click({multiple:true});
        this.flightOriginInput
            .invoke('val')
            .should('eq', `${cityFrom} (${departureFrom})`);
    }

    // Metode baru: Mengisi kota keberangkatan menggunakan placeholder dan autocomplete list
    fillDepartureCity(city) {
        // Klik input dengan placeholder "Fly from" atau yang relevan, lalu ketik kota
        cy.get('input[placeholder*="Fly"]').first().click().type(city);
        // Pilih kota dari daftar autocomplete yang muncul
        cy.get(".AutocompleteList, .AutocompleteSearch__AutocompleteList")
            .contains(city) // Cari elemen yang mengandung teks kota
            .click();
        // Opsional: Verifikasi input sudah terisi dengan benar (sesuaikan selector)
        cy.get('input[placeholder*="Fly"]').first().invoke('val').should('include', city);
        cy.log(`Kota keberangkatan diisi menggunakan metode baru: ${city}`);
    }

    // Mendapatkan input tujuan penerbangan (digunakan untuk assertion di test spec)
    get flightDestinationInput() {
        return cy.get('#flight-destination-search-input');
    }

    // Metode lama: Memasukkan kota tujuan dan memilih bandara tujuan menggunakan data-objectid/data-text
    flyingTo(cityArrival, arrivalAirport, arrivalTo) {
       this.flightDestinationInput.click().type(`${cityArrival}`);
        // Menggunakan data-objectid dan data-text dari env
        cy.xpath(`//li[@data-objectid="${arrivalTo}" and @data-text="${arrivalAirport}"]`).click({multiple:true});
        this.flightDestinationInput
            .invoke('val')
            .should('eq', `${cityArrival} (${arrivalTo})`);
    }

    // Metode baru: Mengisi kota tujuan menggunakan placeholder dan autocomplete list
    fillArrivalCity(city) {
        // Klik input dengan placeholder "Flying to" atau yang relevan, lalu ketik kota
        cy.get('input[placeholder*="Flying to"]').first().click().type(city);
        // Pilih kota dari daftar autocomplete yang muncul
        cy.get(".AutocompleteList, .AutocompleteSearch__AutocompleteList")
            .contains(city) // Cari elemen yang mengandung teks kota
            .click();
        // Opsional: Verifikasi input sudah terisi dengan benar (sesuaikan selector)
        cy.get('input[placeholder*="Flying to"]').first().invoke('val').should('include', city);
        cy.log(`Kota tujuan diisi menggunakan metode baru: ${city}`);
    }


    // Mendapatkan input tanggal (untuk klik memunculkan kalender)
    get flightDateInput() {
        return cy.get('[data-selenium="flight-date-input"]');
    }

    dateSelectorTitle(){
        return cy.get('[data-selenium="date-selector-title"]').invoke('text');
    }

    dateSelectorDesc(){
        return cy.get('[data-selenium="date-selector-desc"]').invoke('text');
    }
        
    // Memeriksa dan memilih jumlah penumpang & tipe kabin
    checkCabin(passenger, cabinType) {
        // Klik input penumpang/kabin untuk membuka dropdown
        cy.get('[data-element-name="flight-occupancy"]').click();
        
        // Menyesuaikan jumlah penumpang dewasa
        // Asumsi ada tombol '+' untuk menambah penumpang dewasa
        const currentPassengers = 1; // Asumsi default 1 penumpang
        if (passenger > currentPassengers) {
            for (let i = 0; i < (passenger - currentPassengers); i++) {
                cy.get('[data-selenium="adult-stepper-plus"]').click(); // Ini adalah selector untuk tombol '+' penumpang
            }
        }
        
        // Pilih tipe kabin
        // Menggunakan selector yang user berikan, sesuaikan jika tidak cocok
        cy.xpath(`//div[@class="FlightSearchOccupancy"]//button[@data-element-object-id="${cabinType.toLowerCase()}"]`).click({force:true});
        
        // Tutup dropdown setelah pemilihan
        cy.get('[data-element-name="flight-occupancy"]').click(); // Klik lagi untuk menutup
    }

    clickSearchFlights() {
        cy.get('[data-test="SearchButtonBox"]').should('have.contain','SEARCH FLIGHTS').click({multiple:true});
    }
}

export default new AgodaDestinationPlanPage();
