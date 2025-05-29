const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.agoda.com', // Default base URL, can be overridden by specific tests or env vars
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1920, // Default viewport for Amazon test
    viewportHeight: 1080, // Default viewport for Amazon test
    env: {
      agodaBaseUrl: process.env.AGODA_BASE_URL || 'https://www.agoda.com',
      amazonBaseUrl: process.env.AMAZON_BASE_URL || 'https://www.amazon.com',
      youtubeBaseUrl: process.env.YOUTUBE_BASE_URL || 'youtube.com'
    },
    // Reporter configuration for HTML reports
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'mochawesome-report',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Cypress Final Project Report',
      embedded: true,
      inlineAssets: true,
    },
    // Video recording is enabled by default by Cypress
    video: true,
  },
});