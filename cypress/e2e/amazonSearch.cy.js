import cariBarang from "../pages/amazon/amazonSearchPage";
import pilihSortDropdown from "../pages/amazon/amazonSortProductPage";
import Barang from "../pages/amazon/amazonProductPage";
import detailBarang from "../pages/amazon/amazonHomePage";

let totalData = 0;
let nmBarang, hrgBarang;
const input = Cypress.env("amazon");

describe('E2E Automate Cari Product di Amazon', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Cari Kursi Website Amazon', () => {
        cy.visit(`${input.url}`);
        cy.wait(10000);
        cy.scrollTo("top");
        cariBarang.typeKeyword(`${input.typeKeyword}`);
        cy.wait(1000);

        pilihSortDropdown.selectPriceDesc();
        cy.wait(3000);
        Barang.getTotalData().then(($val) => {
            totalData = $val.length;
            cy.log(`Banyaknya data = ${totalData}`)
        });
        Barang.getNamaBarang().then((data) => {
            nmBarang = data;
            cy.log(`Nama Barang = ${nmBarang}`)
        });
        Barang.getHargaBarang().then((data) => {
            hrgBarang = data;
            cy.log(`Harga Barang = ${hrgBarang}`)
        });
        Barang.clickBarang();
        
        detailBarang.checkNamaBarang().then((data) => {
            expect(data.trim()).equal(nmBarang);
        });
        detailBarang.checkHrgBarang().then((data) => {
            expect(data.trim()).equal(hrgBarang);
        });
        
    });
});