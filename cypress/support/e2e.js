// cypress/support/e2e.js

// Menangani uncaught exceptions dari aplikasi yang diuji
Cypress.on('uncaught:exception', (err, runnable) => {
  // Periksa apakah pesan error mengandung string yang relevan
  if (err.message.includes('ResizeObserver loop completed with undelivered notifications') ||
      err.message.includes('ResizeObserver loop limit exceeded')) {
    // Mengembalikan `false` akan mencegah Cypress menggagalkan tes
    // untuk uncaught exception ini.
    // Kita mengabaikannya karena ini adalah warning dari browser/aplikasi,
    // bukan error fungsional dari tes kita.
    return false;
  }

  // Untuk error lain yang tidak kita kenali, biarkan Cypress menggagalkan tes
  return true;
});

// Ini adalah tempat di mana kamu juga bisa menambahkan custom commands
// seperti contoh di bawah ini:
// Cypress.Commands.add('login', (email, password) => { ... })