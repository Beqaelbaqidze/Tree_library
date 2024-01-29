import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlULTpl = (id, value, icons, changeIcons) => {
    return `<li class="node nodeTreeLi" data-id="${id}">
    <div class="nodeContainer" data-id="${id}">
      <button data-id="${id}" class="nodebtn btnTree"><svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
      <path d="M4.29289 5L0.5 8.79289V1.20711L4.29289 5Z" fill="#1C1B1F" stroke="black"/>
    </svg></button>
      ${changeIcons}
      ${icons}
      <p class="nodeText" data-id="${id}">${value}</p>
      </div>
      <ul class="children hidden nodeTreeUl"></ul>
    </li>`;
  };

  htmlinput = `<div class="searchDiv"><input type="text" class="searchinput" id="searchInput" placeholder="ძებნა..." /><button class="searchBtn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <mask id="mask0_39_1150" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#525252"/>
  </mask>
  <g mask="url(#mask0_39_1150)">
    <path d="M18 13.25L20 15.25V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H4C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H9.5C9.36667 4.3 9.26667 4.62083 9.2 4.9625C9.13333 5.30417 9.08333 5.65 9.05 6H4V20H18V13.25ZM19.3 8.9L22.5 12.1L21.1 13.5L17.9 10.3C17.55 10.5 17.175 10.6667 16.775 10.8C16.375 10.9333 15.95 11 15.5 11C14.25 11 13.1875 10.5625 12.3125 9.6875C11.4375 8.8125 11 7.75 11 6.5C11 5.25 11.4375 4.1875 12.3125 3.3125C13.1875 2.4375 14.25 2 15.5 2C16.75 2 17.8125 2.4375 18.6875 3.3125C19.5625 4.1875 20 5.25 20 6.5C20 6.95 19.9333 7.375 19.8 7.775C19.6667 8.175 19.5 8.55 19.3 8.9ZM15.5 9C16.2 9 16.7917 8.75833 17.275 8.275C17.7583 7.79167 18 7.2 18 6.5C18 5.8 17.7583 5.20833 17.275 4.725C16.7917 4.24167 16.2 4 15.5 4C14.8 4 14.2083 4.24167 13.725 4.725C13.2417 5.20833 13 5.8 13 6.5C13 7.2 13.2417 7.79167 13.725 8.275C14.2083 8.75833 14.8 9 15.5 9ZM4 20V6V13V12.7V20Z" fill="#F8F8F8"/>
  </g>
</svg></button></div>`;
  htmlPages = `<div class="titleOfPage"></div><div class="forLink"></div>`;
  #httpClient;
  searchedIds = [];

  constructor(options) {
    this.options = options;
    this.label = options.label;
    this.icons = options.icons;
    this.changeIcons = options.changeIcons;
    this.iconsUrl = options.iconsUrl;
    this.#httpClient = new HttpClass();
    this.#httpClient.request({ url: options.url }).then((data) => {
      this.inject(options, data);
    });
  }

  inject(options, data) {
    const { rootElement } = options;
    const assembledHTML =
      `<button class="slidebtn" id="slidebtn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <mask id="mask0_39_1169" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_39_1169)">
      <path d="M15.5 20.5V17.5H11.5V7.5H8.5V10.5H2.5V3.5H8.5V6.5H15.5V3.5H21.5V10.5H15.5V7.5H12.5V16.5H15.5V13.5H21.5V20.5H15.5ZM16.5 9.5H20.5V4.5H16.5V9.5ZM16.5 19.5H20.5V14.5H16.5V19.5ZM3.5 9.5H7.5V4.5H3.5V9.5Z" fill="white"/>
    </g>
  </svg></button>` +
      this.htmlinput +
      `<div class="containterIframe"> ${this.htmlPages}</div>
      <div class="customContainer hideTree">${this.buildHTML(data)}</div>`;
    const selector = rootElement || "body";
    document.querySelector(selector).innerHTML = assembledHTML;
    const customContainer = document.querySelector(".customContainer");
    if (customContainer) {
      if (window.innerWidth > 1440) {
        customContainer.classList.remove("hideTree");
      }
    }
    const container = document.querySelector(selector);
    container.addEventListener("click", this.handleButtonClick.bind(this));
    container.addEventListener("click", this.selectObj.bind(this));
    container.addEventListener("click", this.slideButton.bind(this));
  }

  buildHTML(data) {
    let vHTML = `<ul>`;

    for (const item of data) {
      const labels = this.label.map((label) => item[label]).join(", ");
      const chngIcons = this.changeIcons
        .map(
          (
            chngIcons
          ) => `<svg class= "none nodeChangeSvg ${chngIcons}" data-id="${item.id}" style="width: 18px; margin-right: 8px;height: 18px; xmlns="http://www.w3.org/2000/svg">
      <image href="${this.iconsUrl}${item[chngIcons]}" class="nodeIcon ${chngIcons}" data-id="${item.id}" style="width: 18px; height: 18px; cursor: pointer;" />
      </svg>`
        )
        .join("");

      const icons = this.icons
        .map(
          (
            icons
          ) => `<svg class= "${icons} nodeSvg" data-id="${item.id}" style="width: 18px; margin-right: 8px;height: 18px; xmlns="http://www.w3.org/2000/svg">
      <image href="${this.iconsUrl}${item[icons]}" class="nodeIcon ${icons}" data-id="${item.id}" style="width: 18px; height: 18px; cursor: pointer;" />
      </svg>`
        )
        .join("");

      const hasChildren = item.children && item.children.length > 0;
      vHTML += this.htmlULTpl(item.id, labels, icons, chngIcons);

      if (hasChildren) {
        vHTML += this.buildHTML(item.children);
      }
    }
    vHTML += "</ul>";
    return vHTML;
  }
  selectObj(event) {
    const target = event.target;
    const vTr = target.getAttribute("data-id");
    const secondIcons = document.querySelectorAll(
      `.${this.changeIcons}[data-id='${vTr}']`
    );
    const sameIcons = document.querySelectorAll(
      `.${this.icons[0]}[data-id='${vTr}']`
    );
    if (target.classList.contains("nodeText")) {
      const allNodeTextElements = document.querySelectorAll(".nodeText");
      const allChngIconElements = document.querySelectorAll(
        `.${this.changeIcons}`
      );
      const allIconElements = document.querySelectorAll(`.${this.icons}`);
      allChngIconElements.forEach((elem) => {
        elem.classList.add("none");
      });
      allIconElements.forEach((elemn) => {
        elemn.classList.remove("none");
      });
      allNodeTextElements.forEach((element) => {
        element.classList.remove("selected");
      });
      secondIcons.forEach((icon) => icon.classList.remove("none"));
      sameIcons.forEach((icon) => icon.classList.add("none"));
      target.classList.add("selected");
    }
  }

  async handleButtonClick(event) {
    const target = event.target;

    if (
      target.classList.contains("nodebtn") ||
      target.classList.contains("arrow")
    ) {
      event.preventDefault();
      const parent = target.closest(".node");
      const pBtn = target.closest(".nodebtn");
      const children = parent.querySelector(".children");

      if (!children.classList.contains("loaded")) {
        const parentId = parent.getAttribute("data-id");
        if (!pBtn.classList.contains("rotated")) {
          pBtn.classList.toggle("rotated");
        }
        const requestConfig = {
          url: `${this.options.url}=${parentId}`,
        };

        try {
          const response = await this.#httpClient.request(requestConfig);
          if (response.length > 0) {
            const childrenHTML = this.buildHTML(response);
            children.innerHTML = childrenHTML;
          }
          children.classList.add("loaded");
        } catch (error) {
          console.error(error);
        }
      } else {
        pBtn.classList.toggle("rotated");
      }

      children.classList.toggle(
        "hidden",
        !children.classList.contains("hidden")
      );
    }
  }
  async slideButton(event) {
    const target = event.target;
    if (target.classList.contains("slidebtn")) {
      if (
        document
          .querySelector(".customContainer")
          .classList.contains("hideTree")
      ) {
        document.querySelector(".customContainer").classList.remove("hideTree");
        document.querySelector(".customContainer").classList.add("showTree");
      } else {
        document.querySelector(".customContainer").classList.add("hideTree");
        document.querySelector(".customContainer").classList.remove("showTree");
      }
    }
  }
}

// changeIcon(event) {
//   const target = event.target;

//   const selectedIcon = target.getAttribute("data-id");
//   const secondIcons = document.querySelectorAll(
//     `.${this.changeIcons}[data-id='${selectedIcon}']`
//   );
//   const sameIcons = document.querySelectorAll(
//     `.${this.icons[0]}[data-id='${selectedIcon}']`
//   );
//   console.log(selectedIcon, secondIcons);
//   if (target.classList.contains(this.icons[0])) {
//     secondIcons.forEach((icon) => icon.classList.remove("none"));
//     sameIcons.forEach((icon) => icon.classList.add("none"));
//   } else if (target.classList.contains(this.changeIcons[0])) {
//     secondIcons.forEach((icon) => icon.classList.add("none"));
//     sameIcons.forEach((icon) => icon.classList.remove("none"));
//   }
// }

// if (target.tagName.toLowerCase() === "svg") {
//   const hasIconClass = target.classList.contains("icon");
//   const hasSelectedIconClass = target.classList.contains("iconSelected");

//   if (hasIconClass || hasSelectedIconClass) {
//     // Toggle between icon and iconSelected classes
//     target.classList.toggle("icon");
//     target.classList.toggle("iconSelected");

//     // Toggle visibility based on classes
//     if (hasIconClass) {
//       // If it had icon class, hide icon and show iconSelected
//       target.style.display = "none";
//       const iconSelectedElement =
//         target.parentElement.querySelector(".iconSelected");
//       if (iconSelectedElement) {
//         iconSelectedElement.style.display = "inline-block";
//       }
//     } else {
//       // If it had iconSelected class, hide iconSelected and show icon
//       target.style.display = "none";
//       const iconElement = target.parentElement.querySelector(".icon");
//       if (iconElement) {
//         iconElement.style.display = "inline-block";
//       }
//     }
//   }
// }

// findNodesById(id) {
//   const selector = `${this.options.rootElement || "body"} [data-id="${id}"]`;
//   return document.querySelectorAll(selector);
// }

// async search(value) {
//   try {
//     const searchUrl = `https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.HIERARCHY.JSON&CADCODE=${value}`;
//     const response = await this.#httpClient.request({ url: searchUrl });

//     const parentIdElements = document.querySelectorAll(
//       "li.nodeTreeLi[data-id]"
//     );
//     const btnIdElements = document.querySelectorAll(
//       "button.nodebtn[data-id]"
//     );

//     // Assuming the response structure has nodes to be appended
//     for (const node of response.nodes) {
//       const nodeIndex = Array.from(parentIdElements).findIndex(
//         (element) => element.getAttribute("data-id") === node.id.toString()
//       );

//       if (nodeIndex !== -1) {
//         const parentNode = parentIdElements[nodeIndex];
//         const childrenElement = parentNode.querySelector(".children");

//         if (childrenElement) {
//           btnIdElements[nodeIndex].innerHTML = "-";
//         } else {
//           console.error("Children element not found");
//         }
//       } else {
//         console.log(`Parent element not found for node ID "${node.id}"`);
//         // Handle appending to the root container or other logic as needed
//         const rootContainer = document.querySelector(
//           this.options.rootElement || "body"
//         );
//         const nodeHTML = this.htmlULTpl(node.id, node.name);
//         rootContainer.insertAdjacentHTML("beforeend", `<ul>${nodeHTML}</ul>`);
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

//   async handleButtonClick(event) {
//     const target = event.target;
//     if (target.classList.contains("nodebtn")) {
//       event.preventDefault();
//       const parent = target.closest(".node");
//       const children = parent.querySelector(".children");

//       if (!children.classList.contains("loaded")) {
//         const parentId = parent.getAttribute("data-id");
//         if (!target.classList.contains("rotated")) {
//           target.classList.toggle("rotated");
//         }
//         const requestConfig = {
//           url: `${this.options.url}=${parentId}`,
//         };

//         try {
//           const response = await this.#httpClient.request(requestConfig);
//           if (response.length > 0) {
//             const childrenHTML = this.buildHTML(response);
//             children.innerHTML = childrenHTML;
//           }
//           children.classList.add("loaded");
//         } catch (error) {
//           console.error(error);
//         }
//       } else {
//         target.classList.toggle("rotated");
//       }

//       children.classList.toggle(
//         "hidden",
//         !children.classList.contains("hidden")
//       );
//     }
//   }

//   // getAllSearchedIds() {
//   //   return this.searchedIds;
//   // }
// }

// async search(value) {
//   try {
//     const searchInput = document.getElementById("searchInput");
//     const searchUrl = `https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.HIERARCHY.JSON&CADCODE=${value}`;
//     const response = await this.#httpClient.request({ url: searchUrl });

//     const matchingNodes = this.findNodesById(response.id);
//     if (matchingNodes.length > 0) {
//       const targetButton = matchingNodes[0].querySelector(".nodebtn");
//       const targetul= matchingNodes[0].querySelector(".children");
//       if (targetButton) {
//         if (targetButton.innerHTML == "+") {
//           targetButton.innerHTML = "-"
//         }else{
//           //build here
//         }
//       } else {
//         alert(
//           `Button element not found for ID "${response.id}" in the tree.`
//         );
//       }
//     } else {
//       console.log(`No nodes matching ID "${response.id}" found in the tree.`);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
