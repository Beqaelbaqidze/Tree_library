import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlULTpl = (id, value, icons, changeIcons, textTitle, hasChildren) => {
    return `<li class="node nodeTreeLi" data-id="${id}" data-text="${textTitle}">
    <div class="nodeContainerParent" data-id="${id}" data-text="${textTitle}">
    <button data-id="${id}" data-text="${textTitle}" class="nodebtn btnTree ${
      hasChildren ? "" : "hideArrow"
    }"><svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
      <path d="M4.29289 5L0.5 8.79289V1.20711L4.29289 5Z" fill="#1C1B1F" stroke="black"/>
    </svg></button>

  
    <div class="nodeContainer" data-id="${id}" data-text="${textTitle}">
      
      ${changeIcons}
      ${icons}
      <p class="nodeText" data-id="${id}" data-text="${textTitle}">${value}</p>
      </div>
      </div>
      <ul class="children nodeTreeUl" data-id="${id}"></ul>
      
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
  //   <svg class="clearSelection"
  //   id="clearSelection"
  //   xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  // <path fill="none" stroke="#000000" stroke-width="2" d="M10,4 C10,2.8954305 10.8954305,2 12,2 C13.1045695,2 14,2.8954305 14,4 L14,10 L20,10 L20,14 L4,14 L4,10 L10,10 L10,4 Z M4,14 L20,14 L20,22 L12,22 L4,22 L4,14 Z M16,22 L16,16.3646005 M8,22 L8,16.3646005 M12,22 L12,16.3646005"/>
  // <title>
  // მონიშნული მონაცემების გაუქმება</title>
  // <text class="tooltiptext">
  // მონიშვნის გაუქმება</text>
  // </svg>
  inject(options, data) {
    const { rootElement } = options;
    const assembledHTML = `<div class="customContainer" id="customContainer"><div class="treeButtons">
   
    <svg
      class="treeReload"
      id="treeReload"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path
        d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"
      />
      <title>
  მონიშნული მონაცემის განახლება</title>
  <text class="tooltiptext">
  მონიშნული მონაცემის განახლება</text>
    </svg>
    <svg class="slidTree" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m680-280-56-56 103-104H520v-80h207L624-624l56-56 200 200-200 200Zm-400 0L80-480l200-200 56 56-103 104h207v80H233l103 104-56 56Z"/>
    <title>
  დახურვა</title>
  <text class="tooltiptext">
  დახურვა</text>
    </svg></div>${this.buildHTML(data)}</div>`;
    const selector = rootElement || "body";
    document.querySelector(selector).innerHTML = assembledHTML;
    const customContainer = document.querySelector(".customContainer");
    document.querySelector(".slidTree").addEventListener("click", () => {
      customContainer.classList.toggle("hideSideTree");
      document.querySelector(".treeReload").classList.toggle("none");

      document.querySelector(".treeButtons").classList.toggle("changePosition");
      document.querySelector(".treeButtons").style.marginLeft = "-12px";
    });

    this.bindEvents();
  }

  bindEvents() {
    const container = document.querySelector(
      this.options.rootElement || "body"
    );

    container.addEventListener("click", this.handleButtonClick.bind(this));
    container.addEventListener("click", this.selectObj.bind(this));

    container.addEventListener(
      "contextmenu",
      this.handleContextMenu.bind(this)
    );
    document
      .querySelector(".treeReload")
      .addEventListener("click", this.reloadNode.bind(this));
  }
  handleContextMenu(event) {
    const existingContextMenu = document.querySelector(".contextMenu");
    if (existingContextMenu) {
      document.body.removeChild(existingContextMenu);
    }

    const target = event.target.closest(".nodeContainer");
    if (target) {
      event.preventDefault();
      const vTr = target.getAttribute("data-id");
      const vTrText = target.getAttribute("data-text");

      const secondIcons = document.querySelectorAll(
        `.${this.changeIcons}[data-id='${vTr}']`
      );
      const sameIcons = document.querySelectorAll(
        `.${this.icons[0]}[data-id='${vTr}']`
      );
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
      document.getElementById("searchInput").value = vTrText;
      const contextMenu = document.createElement("div");
      contextMenu.classList.add("contextMenu");
      contextMenu.innerHTML = `
            <ul>
                <li>Reload</li>
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
            case "reload":
              this.reloadNode();
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
    let vHTML = `<ul class="mainNode">`;

    for (const item of data) {
      const labels = this.label.map((label) => item[label]).join(", ");
      const chngIcons = this.changeIcons
        .map(
          (
            chngIcons
          ) => `<svg class= "none nodeChangeSvg ${chngIcons}" data-id="${item.id}" style="width: 18px; margin-right: 8px;height: 18px; z-index: -1; xmlns="http://www.w3.org/2000/svg">
      <image href="${this.iconsUrl}${item[chngIcons]}" class="nodeIcon ${chngIcons}" data-id="${item.id}" style="width: 18px; height: 18px; cursor: pointer;" />
      </svg>`
        )
        .join("");

      const icons = this.icons
        .map(
          (
            icons
          ) => `<svg class= "${icons} nodeSvg" data-id="${item.id}" style="width: 18px; margin-right: 8px;height: 18px; z-index: -1;xmlns="http://www.w3.org/2000/svg">
      <image href="${this.iconsUrl}${item[icons]}" class="nodeIcon ${icons}" data-id="${item.id}" style="width: 18px; height: 18px; cursor: pointer;" />
      </svg>`
        )
        .join("");

      const hasChildren = item.children && item.children.length > 0;
      vHTML += this.htmlULTpl(
        item.id,
        labels,
        icons,
        chngIcons,
        item.text,
        item.hasChildren
      );

      if (hasChildren) {
        vHTML += this.buildHTML(item.children);
      }
    }
    vHTML += "</ul>";
    return vHTML;
  }
  async selectObj(event) {
    const target = event.target;

    const vTr = target.getAttribute("data-id");
    const vTrText = target.getAttribute("data-text");
    const titleElement = document.querySelector("title");

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
      document.getElementById("searchInput").value = vTrText;
      titleElement.innerHTML = `${vTrText}`;

      await new Promise((resolve) => setTimeout(resolve, 200));

      document.querySelectorAll(".pagesTitle.selecTitle").forEach((elem) => {
        elem.click();
      });

      // if (window.innerWidth < 1440) {
      //   setTimeout(() => {
      //     const customContainer = document.querySelector(".customContainer");
      //     if (customContainer) {
      //       customContainer.classList.remove("showTree");
      //       customContainer.classList.add("hideTree");
      //     }
      //   }, 300);
      // }
    }
  }

  async handleButtonClick(event) {
    const target = event.target;

    if (
      target.classList.contains("nodebtn") ||
      target.classList.contains("arrow")
    ) {
      event.preventDefault();

      // Change cursor to 'wait' while fetching
      document.body.style.cursor = "wait";

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
      if (!pBtn.classList.contains("rotated")) {
        children.classList.toggle("hidden");
      } else {
        children.classList.remove("hidden");
      }

      // Revert cursor back to default after fetch request completes
      document.body.style.cursor = "default";
    }
  }
  reloadNode() {
    let foundSelected = false;

    document.querySelectorAll(".nodeContainer").forEach((elem) => {
      if (elem.classList.contains("selected")) {
        elem.closest(".nodeTreeLi").querySelector(".nodeTreeUl").innerHTML = "";
        elem
          .closest(".nodeTreeLi")
          .querySelector(".nodeTreeUl")
          .classList.remove("loaded");
        elem
          .closest(".nodeTreeLi")
          .querySelector(".nodebtn")
          .classList.remove("rotated");

        foundSelected = true;
      }
    });
    if (!foundSelected) {
      if (confirm("გსურთ ყველა მონაცემის განახლება?")) {
        document.querySelectorAll(".nodeContainer").forEach((elem) => {
          elem.closest(".nodeTreeLi").querySelector(".nodeTreeUl").innerHTML =
            "";
          elem
            .closest(".nodeTreeLi")
            .querySelector(".nodeTreeUl")
            .classList.remove("loaded");
          elem
            .closest(".nodeTreeLi")
            .querySelector(".nodebtn")
            .classList.remove("rotated");
        });
      }
    }
  }
}
