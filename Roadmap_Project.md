# Perjalanan Proyek — fullstackcypress

Dokumen singkat yang merangkum status pengembangan, catatan peningkatan, dan rekomendasi fitur untuk dianalisa tim QA.

## 1. Berdasarkan yang sudah dikembangkan
- Struktur dasar Cypress ada di repository: `cypress.config.js`, `cypress.env.json`, `package.json`.
- Test e2e utama:
  - `cypress/e2e/agodaFlightBooking.cy.js` — alur pencarian & pengisian data penerbangan (menggunakan fixtures `passenger_data.json`).
  - `cypress/e2e/amazonSearch.cy.js` — alur pencarian produk dan validasi hasil.
  - `cypress/e2e/youtubeSearch.cy.js` — alur pencarian/video/trending.
- Page Object pattern sudah diterapkan di `cypress/pages/` untuk: Agoda, Amazon, YouTube (file-file `*Page.js`).
- Fixtures: `cypress/fixtures/passenger_data.json` untuk data uji terstruktur.
- Support dan utilities: `cypress/support/commands.js`, `cypress/support/e2e.js`.
- Hasil laporan otomatis tersimpan di `cypress/reports/mochawesome-report/` dan ada rekaman video/screenshot di folder terkait.

## 2. Catatan yang dapat dikembangkan
- Stabilitas & pemeliharaan:
  - Gunakan atribut khusus (data-testid / data-cy) untuk selector agar lebih tahan perubahan UI.
  - Konsistensi Page Object: ekstrak helper umum, hindari duplikasi.
- Data & konfigurasi:
  - Jadikan data uji lebih fleksibel (data-driven / variasi fixture, faker).
  - Pisahkan konfigurasi environment (dev/staging/prod) dan rahasia.
- CI & proses:
  - Integrasi ke CI (GitHub Actions / GitLab CI) untuk menjalankan test otomatis per PR dan nightly.
  - Paralelisasi job untuk mempercepat suite besar.
- Pelaporan & monitoring:
  - Tambah JUnit/Allure output untuk integrasi test management.
  - Otomatisasi upload artefak (screenshots, videos, mochawesome) ke penyimpanan terpusat.
- Kualitas test:
  - Terapkan retry & timeout yang bijak; kurangi flakiness.
  - Tambah negative case, edge case, dan assertions yang lebih granular.

## 3. Next feature yang dapat dianalisa QA (rekomendasi)
Prioritaskan berdasar nilai bisnis dan risiko.

- High priority:
  - Alur end-to-end booking (Agoda) termasuk validasi penumpang & konfirmasi booking.
  - Smoke suite setelah deploy (skenario singkat untuk verifikasi kunci).
  - Cross-browser (Chrome, Firefox) & mobile viewport checks untuk alur kritis.

- Medium priority:
  - Alur checkout Amazon: add-to-cart, keranjang, checkout (bila ada sandbox/payment).
  - Verifikasi rekomendasi/trending & pemutaran video (YouTube): play, pause, quality change.
  - Visual regression untuk halaman kunci.

- Low priority / Eksplorasi:
  - Tes performa ringan (response time untuk pencarian).
  - Accessibility checks (WCAG) untuk halaman utama.
  - Contract/API tests untuk endpoint yang sering digunakan oleh UI.

## 4. Rekomendasi tindakan singkat
- Buat PR yang menambahkan satu smoke test dan integrasikan ke CI terlebih dahulu.
- Tambah satu contoh penggunaan data-driven pada salah satu test (fixture + parameterized test).
- Tambahkan selector `data-cy` pada komponen yang sering diuji.

---
File ini dibuat sebagai panduan singkat untuk tim pengembang dan QA. Untuk detail eksekusi (contoh implementasi CI, template test data, atau draft test cases) bisa ditambahkan pada file terpisah bila diperlukan.