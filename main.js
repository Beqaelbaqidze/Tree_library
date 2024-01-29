// main.js
import { mainClass } from "./main.class.js";
import { SearchClass } from "./search.class.js";
import { CadTreeClass } from "./cadTree.class.js";

const custom = {
  rootElement: "#container",
  url: "http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.BROWSER.JSON&PRNT_ID",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  label: ["name"],
  icons: ["icon", "statusIcon"],
  changeIcons: ["iconSelected"],
  iconsUrl: "https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree",
};
let vInputEl;
let vSearchBtn;
let vInputValue;

const vmainPromise = new Promise((resolve, _) => {
  const vMainClass = new mainClass(custom);
  resolve(vMainClass);
});

vmainPromise
  .then((vMainClass) => {
    const vSearchClass = new SearchClass(vMainClass);
    const vCadTreeClass = new CadTreeClass();

    setTimeout(() => {
      const vInputElement = document.getElementById("searchInput");
      vInputEl = document.querySelector(".searchinput");
      vSearchBtn = document.querySelector(".searchBtn");
      console.log("element", vInputEl);
      console.log("view", vInputElement);
      vSearchBtn.addEventListener("click", async () => {
        try {
          vInputValue = vInputEl.value;
          await vSearchClass.searchAndAppendNodes(vInputValue);
        } catch (error) {
          console.error(error);
        }
      });
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
