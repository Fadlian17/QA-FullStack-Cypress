class YouTubeVideoPage {
  getVideoTitle() {
    return cy.get('h1.ytd-watch-metadata #title yt-formatted-string').invoke('text');
  }

  getChannelName() {
    return cy.get('#owner-name a').invoke('text');
  }
}

export default new YouTubeVideoPage();