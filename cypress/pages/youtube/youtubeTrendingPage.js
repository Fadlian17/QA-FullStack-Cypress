class YouTubeTrendingPage {
  visit() {
    // Cypress will automatically prepend the baseUrl from cypress.config.js if you use a relative path
    // Given the specific URL, we will use it directly.
    cy.visit(Cypress.env('youtubeBaseUrl')); // This URL is highly unusual for direct YouTube access
    // If the above URL doesn't work, you might need to adjust it to 'https://www.youtube.com/feed/trending'
  }

  navigateToTrendingPage() {
    // Assuming a direct visit doesn't land on trending, navigate via sidebar/link
    // This will depend on the actual UI of the provided YouTube URL.
    // If 'youtube.com' doesn't directly show trending, this will fail.
    // For a standard YouTube:
    // cy.get('#guide-button').click(); // Open sidebar
    // cy.get('a[href="/feed/trending"]').click(); // Click trending link
  }

  selectCategory(category) {
    // This will depend on the UI elements for categories on the trending page
    cy.contains('.yt-chip-cloud-chip-renderer', category).click(); // Placeholder selector
  }

  getVideoTitle(index) {
    // Get title of the video at the given index
    return cy.get(`.ytd-video-renderer:nth-child(${index}) #video-title`).invoke('text');
  }

  getChannelName(index) {
    // Get channel name of the video at the given index
    return cy.get(`.ytd-video-renderer:nth-child(${index}) #channel-name a`).invoke('text');
  }

  clickVideo(index) {
    cy.get(`.ytd-video-renderer:nth-child(${index}) #video-title`).click();
  }
}

export default new YouTubeTrendingPage();