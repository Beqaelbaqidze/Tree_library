// main.js
import { mainClass } from "./main.class.js";
import { SearchClass } from "./search.class.js";
import { CadTreeClass } from "./cadTree.class.js";

const custom = {
  rootElement: "#container",
  url: baseUrl + "?FRAME_NAME=CADTREE.BROWSER.JSON&PRNT_ID",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  label: ["name"],
  icons: ["icon", "statusIcon"],
  changeIcons: ["iconSelected"],
  iconsUrl: baseUrl,
};
const custom1 = {
  rootElement: "#searchContainer",
  url: baseUrl + "?FRAME_NAME=CADTREE.HIERARCHY.JSON&CADCODE=",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  label: ["name"],
  icons: ["icon", "statusIcon"],
  changeIcons: ["iconSelected"],
  iconsUrl: baseUrl,
};
const custom2 = {
  rootElement: "#containterIframe",
  url: baseUrl + "?FRAME_NAME=CADTREE.RIGHT_PAGES.JSON&ID=",
  method: "GET",
};

const vMainClass = new mainClass(custom);
const vSearchClass = new SearchClass(custom1);
const vCadTreeClass = new CadTreeClass(custom2);

vCadTreeClass.inject({
  rootElement: custom2.rootElement,
  url: "http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.RIGHT_PAGES.JSON&ID=",
});
