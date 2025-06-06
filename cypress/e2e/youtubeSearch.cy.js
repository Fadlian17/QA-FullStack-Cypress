import homepage from "../pages/youtube/youtubeHomePage";
import trendingListPage from "../pages/youtube/youtubeTrendingPage";
import moviePage from "../pages/youtube/youtubeVideoPage";

let lang = Cypress.env('LANGUAGE') || 'en';
const input = Cypress.env('youtube');
let judulFilm, channel;

describe('E2E Automate Cari Trending Video On Youtube', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Search Video Trending on Youtube', () => {

        cy.visit(`${input.url}`);
        homepage.getLangYoutube().then((langAttr) => {
            cy.log(`Language Default : ${langAttr}`)
            lang = langAttr === "id-ID" ? "id" : "en";
        });

        cy.then(() => {
            homepage.goToTrendingMenu(input[lang].explore);
            homepage.goToMoviesTab(input[lang].movie);

            // Get Judul Film
            trendingListPage.getJudulFilm().then((judul) => {
                judulFilm = judul;
            })

            // Get Channel
            trendingListPage.getChannelYoutube().then((src) => {
                channel = src;
            })

            cy.then(() => {
                cy.log(`Judul Film : ${judulFilm}`);
                cy.log(`Channel Name : ${channel}`)
                trendingListPage.clickMovies();
                cy.wait(10000);
                moviePage.getMovieTitle(judulFilm);
                moviePage.getMovieChannel(channel);
                moviePage.clickShareAndCopy(input[lang].share);
                moviePage.getLinkUrl()
                        .then((link) => {
                            cy.log(`Link Url : ${link}`)
                        });
            });
        });
    });
});