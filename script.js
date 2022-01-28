const pupeeterr = require("puppeteer");
const cheerio = require("cheerio");

const URL =
  "https://www.airbnb.com/rooms/44477561?adults=2&check_in=2022-01-27&check_out=2022-01-29&previous_page_section_name=1000&federated_search_id=2623f5af-f921-4aaf-b1cf-00597ec40d3f&guests=1";

main = async () => {
  const browser = await pupeeterr.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(URL);
  await page.waitForNetworkIdle();
  await page.click(".sijjzz2 > a:nth-child(1)");
};

main();
