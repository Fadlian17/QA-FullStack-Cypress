const { defineConfig } = require("cypress");
const { DateTime } = require("luxon"); // Digunakan untuk date/time handling
const { fakerEN_AU: faker } = require("@faker-js/faker"); // Digunakan untuk generate data palsu

// Definisi data dinamis menggunakan faker
const gender = faker.helpers.arrayElement(['male', 'female']);
const firstPerson = faker.person.firstName(gender);
const middlePerson = faker.person.middleName(gender); // middleName bisa saja null/undefined
const lastPerson = faker.person.lastName();
const emailPerson = faker.internet.email({firstName: firstPerson.toLowerCase(), provider: 'gmail.com'});
const phonePerson = `800${faker.number.int({min: 11111111,max: 99999999})}`;
const passNumber = faker.number.int({min: 111111111,max: 999999999}); // Simulate a passport number

// Variabel lingkungan yang akan digunakan di seluruh tes
const envVariables = {
  LANGUAGE: 'en', // bahasa default, bisa diubah saat run
  youtube: {
    url: "https://www.youtube.com/",
    en: {
      explore: "Explore",
      trend: "Trending",
      movie: "Movies",
      share: "Share"
    },
    id: {
      explore: "Eksplorasi",
      trend: "Trending",
      movie: "Film",
      share: "Bagikan"
    },
  },
  amazon: {
    url: "https://www.amazon.com/",
    typeKeyword: "chair"
  },
  agoda: {
    url: "https://www.agoda.com/",
    cityFrom: "Jakarta",
    departureAirport: "Soekarno-Hatta International Airport",
    departureFrom: "CGK",
    cityArrival: "Singapore",
    arrivalAirport: "Singapore Changi Airport",
    arrivalTo: "SIN",
    cabinType: "Economy",
    passenger: 1,
    // Menggunakan format yang bisa langsung diparse oleh Luxon di test spec
    // nextDay akan di-format ulang di test spec saat digunakan
    today: DateTime.now().toISODate(),
    nextDay: DateTime.now().plus({days:1}).toISODate(),
    contactDetails: {
      firstName: firstPerson,
      middleName: middlePerson, // Bisa kosong/undefined jika tidak dipakai
      lastName: lastPerson,
      email: emailPerson,
      phone: phonePerson,
      nationality: 'Indonesia',
      sex: gender,
      passportNumber: passNumber
    }
  }
};

module.exports = defineConfig({
  // Konfigurasi global viewport
  viewportHeight: 1080,
  viewportWidth: 1920,
  // Konfigurasi locale
  locale: 'en',

  e2e: {
    // URL dasar aplikasi yang akan diuji (opsional, bisa juga di setiap test spec)
    // baseUrl: 'https://www.agoda.com', // Contoh: jika ini adalah base URL untuk agoda

    // Menentukan reporter untuk laporan pengujian
    reporter: 'mochawesome',
    reporterOptions: {
      // Direktori tempat laporan akan disimpan
      reportDir: 'cypress/reports/mochawesome-report',
      // Jangan menimpa laporan sebelumnya (kita akan merge nanti jika multiple files)
      overwrite: false,
      // Hasilkan laporan dalam format HTML
      html: true,
      // Hasilkan laporan dalam format JSON
      json: true,
      // Menambahkan timestamp ke nama file laporan untuk keunikan
      timestamp: 'mmddyyyy_HHMMss',
      // Mengaktifkan grafik dalam laporan HTML
      charts: true,
      // Judul halaman laporan HTML
      reportPageTitle: 'Laporan Pengujian Otomatisasi',
      // Menyematkan screenshot ke dalam laporan HTML (jika diambil)
      embeddedScreenshots: true,
      // Menyematkan aset (CSS/JS) ke dalam file HTML laporan agar berdiri sendiri
      inlineAssets: true,
      // Jangan menyimpan semua upaya screenshot (hanya yang terakhir saat gagal)
      saveAllAttempts: false,
    },

    // Mengaktifkan rekaman video untuk setiap test run
    video: true,
    // Mengaktifkan screenshot otomatis saat tes gagal
    screenshotOnRunFailure: true,

    // Mengatur default command timeout
    defaultCommandTimeout: 60000,
    // Menonaktifkan chrome web security untuk mengatasi isu cross-origin (gunakan dengan hati-hati)
    chromeWebSecurity: false,
    
    // Variabel lingkungan yang dapat diakses di dalam tes menggunakan Cypress.env()
    env:{
      ...envVariables
    },

    // setupNodeEvents untuk mengimplementasikan event listener Node.js
    setupNodeEvents(on, config) {
      // Mengimplementasikan Node event listeners di sini
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        // Anda bisa menambahkan custom task lain di sini, misal untuk membaca file
      })

      // Mengembalikan konfigurasi yang diperbarui
      return config
    },
  },
});
