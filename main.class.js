import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlULTpl = (id, value, icons, changeIcons) => {
    return `<li class="node nodeTreeLi" data-id="${id}">
    <div class="nodeContainerParent" data-id="${id}">
    <button data-id="${id}" class="nodebtn btnTree"><svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
      <path d="M4.29289 5L0.5 8.79289V1.20711L4.29289 5Z" fill="#1C1B1F" stroke="black"/>
    </svg></button>
    <div class="nodeContainer" data-id="${id}">
      
      ${changeIcons}
      ${icons}
      <p class="nodeText" data-id="${id}">${value}</p>
      </div>
      </div>
      <ul class="children hidden nodeTreeUl"></ul>
      
    </li>`;
  };

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
    const assembledHTML = `<div class="customContainer hideTree">${this.buildHTML(
      data
    )}</div>`;
    const selector = rootElement || "body";
    document.querySelector(selector).innerHTML = assembledHTML;
    const customContainer = document.querySelector(".customContainer");
    if (customContainer) {
      if (window.innerWidth > 1440) {
        customContainer.classList.remove("hideTree");
      }
    }
    // const container = document.querySelector(selector);
    // container.addEventListener("click", this.handleButtonClick.bind(this));
    // container.addEventListener("click", this.selectObj.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    const container = document.querySelector(
      this.options.rootElement || "body"
    );

    container.addEventListener("click", this.handleButtonClick.bind(this));
    container.addEventListener("click", this.selectObj.bind(this));

    const nodeContainers = document.querySelectorAll(".nodeContainer");
    nodeContainers.forEach((container) => {
      container.addEventListener(
        "contextmenu",
        this.handleContextMenu.bind(this)
      );
    });
  }
  handleContextMenu(event) {
    const existingContextMenu = document.querySelector(".contextMenu");
    if (existingContextMenu) {
      document.body.removeChild(existingContextMenu);
    }

    const target = event.target.closest(".nodeContainer");
    if (target) {
      event.preventDefault();

      const contextMenu = document.createElement("div");
      contextMenu.classList.add("contextMenu");
      contextMenu.innerHTML = `
            <ul>
                <li>Edit</li>
                <li>Delete</li>
            </ul>
        `;

      contextMenu.style.top = `${event.clientY}px`;
      contextMenu.style.left = `${event.clientX}px`;

      document.body.appendChild(contextMenu);

      const closeContextMenu = () => {
        document.body.removeChild(contextMenu);
        document.removeEventListener("click", closeContextMenu);
      };
      document.addEventListener("click", closeContextMenu);

      contextMenu.querySelectorAll("li").forEach((option) => {
        option.addEventListener("click", () => {
          const action = option.innerText.toLowerCase();
          switch (action) {
            case "edit":
              alert("edit");
              break;
            case "delete":
              alert("delete");
              break;
            default:
              break;
          }

          closeContextMenu();
        });
      });
    }
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
    if (
      target.classList.contains("nodeText") ||
      target.classList.contains("nodeContainer")
    ) {
      const allNodeTextElements = document.querySelectorAll(".nodeContainer");
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
      target.closest(".nodeContainer").classList.add("selected");
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
}
