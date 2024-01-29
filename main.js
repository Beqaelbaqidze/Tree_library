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
const custom1 = {
  rootElement: "#searchContainer",
  url: "https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.HIERARCHY.JSON&CADCODE=",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  label: ["name"],
  icons: ["icon", "statusIcon"],
  changeIcons: ["iconSelected"],
  iconsUrl: "https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree",
};
const custom2 = {
  rootElement: "#containterIframe",
  url: "http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.RIGHT_PAGES.JSON&ID=",
  method: "GET",
};

const vMainClass = new mainClass(custom);
const vSearchClass = new SearchClass(custom1);
const vCadTreeClass = new CadTreeClass(custom2);

vSearchClass.inject({
  rootElement: custom1.rootElement,
  url: "https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.HIERARCHY.JSON&CADCODE=",
});
vCadTreeClass.inject({
  rootElement: custom2.rootElement,
  url: "http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.RIGHT_PAGES.JSON&ID=",
});
