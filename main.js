// import { mainClass } from "./main.class.js";
// import { SearchClass } from "./search.class.js";
// import { CadTreeClass } from "./cadTree.class.js";

// let vLable;
// let vBaseUrl;
// let vTreeLink;
// let vIframLink;
// let vSearchLink;
// const treeRootElement = document.getElementById("treeLoad");
// const searchRootElement = document.getElementById("searchLoad");
// const viewRootElement = document.getElementById("viewLoad");
// const vSection = document.createElement("section");
// const vMainDiv = document.createElement("div");
// vMainDiv.classList.add("mainDivContainer");

// if (treeRootElement) {
//   vLable = treeRootElement.getAttribute("labels");
//   vBaseUrl = treeRootElement.getAttribute("baseUrl");
//   vTreeLink = treeRootElement.getAttribute("treeLink");

//   treeRootElement.classList.add("container");
//   treeRootElement.setAttribute("id", "container");
//   vSection.appendChild(treeRootElement);
//   if (document.querySelector("mainDivContainer")) {
//     document.querySelector("mainDivContainer").appendChild(vSection);
//   } else {
//     vMainDiv.appendChild(vSection);
//   }

//   const custom = {
//     rootElement: "#container",
//     url: vBaseUrl + vTreeLink,
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     label: [vLable],
//     icons: ["icon", "statusIcon"],
//     changeIcons: ["iconSelected"],
//     iconsUrl: vBaseUrl,
//   };
//   const vMainClass = new mainClass(custom);
// }
// if (searchRootElement) {
//   vLable = searchRootElement.getAttribute("labels");
//   vBaseUrl = searchRootElement.getAttribute("baseUrl");
//   vSearchLink = searchRootElement.getAttribute("searchLink");
//   if (document.querySelector("mainDivContainer")) {
//     document.querySelector("mainDivContainer").appendChild(searchRootElement);
//   } else {
//     vMainDiv.appendChild(searchRootElement);
//   }
//   const custom1 = {
//     rootElement: "#searchContainer",
//     url: vBaseUrl + vSearchLink,
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     label: [vLable],
//     icons: ["icon", "statusIcon"],
//     changeIcons: ["iconSelected"],
//     iconsUrl: vBaseUrl,
//   };
//   const vSearchClass = new SearchClass(custom1);
// }
// if (viewRootElement) {
//   vIframLink = viewRootElement.getAttribute("iframLink");
//   vBaseUrl = viewRootElement.getAttribute("baseUrl");

//   viewRootElement.classList.add("containterIframe");
//   viewRootElement.setAttribute("id", "containterIframe");
//   vSection.appendChild(viewRootElement);
//   if (document.querySelector("mainDivContainer")) {
//     document.querySelector("mainDivContainer").appendChild(vSection);
//   } else {
//     vMainDiv.appendChild(vSection);
//   }

//   const custom2 = {
//     rootElement: "#containterIframe",
//     url: vBaseUrl + vIframLink,
//     method: "GET",
//   };

//   const vCadTreeClass = new CadTreeClass(custom2);

//   vCadTreeClass.inject({
//     rootElement: custom2.rootElement,
//     url: vBaseUrl + vIframLink,
//   });
// }

import { mainClass } from "./main.class.js";
import { SearchClass } from "./search.class.js";
import { CadTreeClass } from "./cadTree.class.js";

let vLable;
let vBaseUrl;
let vTreeLink;
let vIframLink;
let vSearchLink;
const mainRootElement = document.getElementById("componentsLoad");
function mainHtml(tree, search, view) {
  return ` ${search ? `<div class="searchDiv" id="searchContainer"></div>` : ""}
  <div class="section">
    ${tree ? `<div class="container" id="container"></div>` : ""}
    ${view ? `<div class="containterIframe" id="containterIframe"></div>` : ""}
  </div>`;
}
if (mainRootElement) {
  vLable = mainRootElement.getAttribute("labels");
  vBaseUrl = mainRootElement.getAttribute("baseUrl");
  vTreeLink = mainRootElement?.getAttribute("treeLink");
  vIframLink = mainRootElement?.getAttribute("viewLink");
  vSearchLink = mainRootElement?.getAttribute("searchLink");
  mainRootElement.classList.add("mainDivContainer");
  mainRootElement.innerHTML = mainHtml(vTreeLink, vSearchLink, vIframLink);

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
