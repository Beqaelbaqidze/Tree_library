import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlULTpl = (id, value, icons, changeIcons) => {
    return `<li class="node nodeTreeLi" data-id="${id}">
      <button data-id="${id}" class="nodebtn btnTree"><i class="arrow right"></i></button>
      ${changeIcons}
      ${icons}
      <p class="nodeText" data-id="${id}">${value}</p>
      <ul class="children hidden nodeTreeUl"></ul>
    </li>`;
  };

  htmlinput = `<input type="text" class="searchinput" id="searchInput" placeholder="Search..." />`;
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
      this.htmlinput +
      `<div class="containterIframe"></div><div class="customContainer">${this.buildHTML(
        data
      )}</div>`;
    const selector = rootElement || "body";
    document.querySelector(selector).innerHTML = assembledHTML;
    const container = document.querySelector(selector);
    container.addEventListener("click", this.handleButtonClick.bind(this));
    container.addEventListener("click", this.selectObj.bind(this));
    // container.addEventListener("click", this.changeIcon.bind(this));
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

  async handleButtonClick(event) {
    const target = event.target;
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
    if (target.classList.contains("nodebtn")) {
      event.preventDefault();
      const parent = target.closest(".node");
      const children = parent.querySelector(".children");

      if (!children.classList.contains("loaded")) {
        const parentId = parent.getAttribute("data-id");
        if (!target.classList.contains("rotated")) {
          target.classList.toggle("rotated");
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
        target.classList.toggle("rotated");
      }

      children.classList.toggle(
        "hidden",
        !children.classList.contains("hidden")
      );
    }
  }
}

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
