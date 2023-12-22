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
let vInputEl;

const vmainPromise = new Promise((resolve, _) => {
  const vMainClass = new mainClass(custom);
  resolve(vMainClass);
});

vmainPromise
  .then((vMainClass) => {
    const vSearchClass = new SearchClass(vMainClass);
    setTimeout(() => {
      const vInputElement = document.getElementById("searchInput");
      vInputEl = document.querySelector(".searchinput");
      console.log("element", vInputEl);
      console.log("vie", vInputElement);

      vInputEl.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
          const vInputValue = searchInput.value;

          try {
            await vSearchClass.searchAndAppendNodes(vInputValue);
          } catch (error) {
            console.error(error);
          }
        }
      });
    }, 1000);
  })
  .catch((error) => {
    console.log(error);
  });
