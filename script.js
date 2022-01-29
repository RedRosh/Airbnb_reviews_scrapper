"user-strict";
const AirbnbScrapper = require("./libs/Scrapper");

const URL =
  "https://www.airbnb.com/rooms/44477561?adults=2&check_in=2022-01-27&check_out=2022-01-29&previous_page_section_name=1000&federated_search_id=2623f5af-f921-4aaf-b1cf-00597ec40d3f&guests=1";

main = async () => {
  const airbnbScrapper = new AirbnbScrapper(URL);
  await airbnbScrapper.getData();
};

main();
