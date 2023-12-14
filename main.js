// main.js
import { mainClass } from "./main.class.js";
import { SearchClass } from "./search.class.js";

const custom = {
  rootElement: "#container",
  url: "http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.BROWSER.JSON&PRNT_ID",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  label: ["name", "creator"],
};

const vMainClass = new mainClass(custom);
const vSearchClass = new SearchClass(vMainClass);

searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const vInputValue = searchInput.value;

    try {
      await vSearchClass.searchAndAppendNodes(vInputValue);
    } catch (error) {
      console.error(error);
    }
  }
});
