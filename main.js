import { mainClass } from "./main.class.js";

const custom = {
  rootElement: "#container",
  url: "http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.BROWSER.JSON&PRNT_ID=",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const response = await fetch(custom.url);
const data = await response.json();
const vMainClass = new mainClass(custom);
