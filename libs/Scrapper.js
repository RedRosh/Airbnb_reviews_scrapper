"user-strict";
//* Import Modules
const pupeeterr = require("puppeteer");
const cheerio = require("cheerio");
require("colors");

class AirbnbScrapper {
  constructor(url) {
    this.url = url;
  }

  async autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          let modal = document.querySelector(
            "body > div:nth-child(38) > section > div > div > div._z4lmgp > div > div._17itzz4"
          );
          var scrollHeight = modal.scrollHeight;
          modal.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 200);
      });
    });
  }
  getNumberOfReviews(cheerioObject) {
    return cheerioObject("._kjouojs > h2:nth-child(1)").text().split(" ")[2];
  }
  getRating(cheerioObject) {
    return cheerioObject("._kjouojs > h2:nth-child(1)").text().split("·")[0];
  }
  getCategories(cheerioObject) {
    let categories = cheerioObject("._4oybiu").toArray();
    return {
      cleanliness: cheerioObject(categories[0]).text(),
      accuracy: cheerioObject(categories[1]).text(),
      communication: cheerioObject(categories[2]).text(),
      location: cheerioObject(categories[3]).text(),
      checkIn: cheerioObject(categories[4]).text(),
      value: cheerioObject(categories[5]).text(),
    };
  }
  getReviews(cheerioObject) {
    const reviews = [];
    const reviewsObject = cheerioObject(".r1are2x1.dir.dir-ltr").toArray();
    reviewsObject.forEach((reviewObject, index) => {
      console.log(
        "[ Scrapper ] : ".blue.bold +
          `Getting review [ ${index + 1}/ ${reviewsObject.length} ]`.yellow
      );
      let reviewerImageUrl = `${cheerioObject(reviewObject)
        .children("div")
        .first()
        .find("img")
        .attr("src")}`;
      let reviewerName = `${cheerioObject(reviewObject)
        .children("div")
        .children("div:nth-child(2)")
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text()}`;
      let reviewDate = cheerioObject(reviewObject)
        .children("div")
        .children("div:nth-child(2)")
        .find(".s189e1ab.dir.dir-ltr")
        .text()
        .split(",")[0];
      let review = `${cheerioObject(reviewObject)
        .children("div:nth-child(2)")
        .text()}`;
      reviews.push({
        reviewerImageUrl,
        reviewerName,
        reviewDate,
        review,
      });
    });
    return reviews;
  }
  getReviewSummary(cheerioObject) {
    return {
      numberOfReviews: this.getNumberOfReviews(cheerioObject),
      rating: this.getRating(cheerioObject),
      categories: this.getCategories(cheerioObject),
    };
  }
  async getData() {
    //* Launch the browser
    try {
      console.log(
        "[ Scrapper ] : ".blue.bold +
          `Starting the browser then redirecting to the room's page : `.yellow +
          `${this.url}`
      );
      const browser = await pupeeterr.launch({
        headless: true,
        args: ["--start-maximized"],
        defaultViewport: null,
      });
      //* Redirecting to the url then opening the modal .
      const page = await browser.newPage();
      await page.goto(this.url);
      console.log("[ Scrapper ] : ".blue.bold + `Opening the modal`.yellow);
      await page.waitForSelector(".sijjzz2 > a:nth-child(1)");
      await page.click(".sijjzz2 > a:nth-child(1)");
      await page.waitForNetworkIdle();
      console.log(
        "[ Scrapper ] : ".blue.bold + `Loading All the reviews`.yellow
      );
      await page.waitForSelector(
        "body > div:nth-child(38) > section > div > div > div._z4lmgp > div > div._17itzz4"
      );
      //* Scrolling to render All reviews .
      console.log(
        "[ Scrapper ] : ".blue.bold +
          `Scrolling to render All the reviews in the html`.yellow
      );
      await this.autoScroll(page);
      //* get the content and load it into cheerio .
      const content = await page.content();
      await browser.close();
      const $ = cheerio.load(content);
      //* scrapping the info from the content .
      let reviewSummary = this.getReviewSummary($);
      console.log(
        "[ Scrapper ] : ".blue.bold +
          `Scrapping review summary successfully`.green
      );
      let reviews = this.getReviews($);
      console.log(
        "[ Scrapper ] : ".blue.bold +
          `Scrapping All the reviews successfully`.green
      );
      //* return the scrapping info .
      return {
        reviewSummary,
        reviews,
      };
    } catch (err) {
      console.log(
        "[ Scrapper ]".blue.bold +
          "Please use the script with a stable connection".red.bold
      );
    }
  }
}

module.exports = AirbnbScrapper;
