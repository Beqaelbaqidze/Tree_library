import { mainClass } from "./main.class.js";
import { SearchClass } from "./search.class.js";
import { CadTreeClass } from "./cadTree.class.js";

let vLable;
let vBaseUrl;
let vTreeLink;
let vIframLink;
let vSearchLink;
const mainRootElement = document.getElementById("treeLoad");

if (mainRootElement) {
  vLable = mainRootElement.getAttribute("labels");
  vBaseUrl = mainRootElement.getAttribute("baseUrl");
  vTreeLink = mainRootElement.getAttribute("treeLink");
  vIframLink = mainRootElement.getAttribute("iframLink");
  vSearchLink = mainRootElement.getAttribute("searchLink");
  mainRootElement.classList.add("mainDivContainer");
  mainRootElement.innerHTML = `<div class="searchDiv" id="searchContainer"></div>
  <div class="section">
    <div class="container" id="container"></div>

    <div class="containterIframe" id="containterIframe"></div>
  </div>`;

  const custom = {
    rootElement: "#container",
    url: vBaseUrl + vTreeLink,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    label: [vLable],
    icons: ["icon", "statusIcon"],
    changeIcons: ["iconSelected"],
    iconsUrl: vBaseUrl,
  };
  const custom1 = {
    rootElement: "#searchContainer",
    url: vBaseUrl + vSearchLink,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    label: [vLable],
    icons: ["icon", "statusIcon"],
    changeIcons: ["iconSelected"],
    iconsUrl: vBaseUrl,
  };
  const custom2 = {
    rootElement: "#containterIframe",
    url: vBaseUrl + vIframLink,
    method: "GET",
  };

  const vMainClass = new mainClass(custom);
  const vSearchClass = new SearchClass(custom1);
  const vCadTreeClass = new CadTreeClass(custom2);

  vCadTreeClass.inject({
    rootElement: custom2.rootElement,
    url: vBaseUrl + vIframLink,
  });
}
