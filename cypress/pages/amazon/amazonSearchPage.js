// cypress/pages/amazon/amazonSearchPage.js
class AmazonSearchPage {
  constructor() {
    // Selector XPath untuk pop-up Dismiss (misal: untuk notifikasi lokasi/shipping)
    this.xpathPopUpDismiss = `//div[@class="a-section glow-toaster glow-toaster-theme-default glow-toaster-slot-default nav-coreFlyout nav-flyout"]`;
  }

  // Selector untuk input pencarian di halaman utama Amazon (menggunakan XPath dari Anda)
  get searchInputXPath() {
    return cy.xpath(`//form//input[@id="twotabsearchtextbox"]`);
  }

  // Selector untuk tombol submit pencarian (menggunakan XPath dari Anda)
  get searchSubmitButtonXPath() {
    return cy.xpath(`//input[@type="submit"][@id="nav-search-submit-button"]`);
  }

  // Fungsi untuk menutup pop-up Dismiss (jika muncul)
  removeDismissPopUp() {
    // Memastikan pop-up terlihat sebelum mencoba mengkliknya
    cy.xpath(`${this.xpathPopUpDismiss}`).should('be.visible');
    // Mengklik tombol "Dismiss" di dalam pop-up
    cy.xpath(`${this.xpathPopUpDismiss}//span[@class="a-button a-spacing-top-base a-button-base glow-toaster-button glow-toaster-button-dismiss"]//input[@type="submit"]`)
      .should('be.visible')
      .click();
    // Opsional: Tunggu sebentar atau verifikasi pop-up menghilang
    cy.xpath(`${this.xpathPopUpDismiss}`).should('not.exist');
  }

  // Mengisi keyword dan melakukan pencarian
  typeKeyword(keyword) {
    // Klik input pencarian, kosongkan, lalu ketik keyword
    this.searchInputXPath.click().clear().type(keyword);
    // Klik tombol submit pencarian
    this.searchSubmitButtonXPath.click();
  }
}

export default new AmazonSearchPage();
