import { HttpClass } from "./http.class.js";

export class SearchClass {
  htmlinput = `<input type="text" class="searchinput" id="searchInput" placeholder="ძებნა..." /><button class="searchBtn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <mask id="mask0_39_1150" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#525252"/>
  </mask>
  <g mask="url(#mask0_39_1150)">
    <path d="M18 13.25L20 15.25V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H4C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H9.5C9.36667 4.3 9.26667 4.62083 9.2 4.9625C9.13333 5.30417 9.08333 5.65 9.05 6H4V20H18V13.25ZM19.3 8.9L22.5 12.1L21.1 13.5L17.9 10.3C17.55 10.5 17.175 10.6667 16.775 10.8C16.375 10.9333 15.95 11 15.5 11C14.25 11 13.1875 10.5625 12.3125 9.6875C11.4375 8.8125 11 7.75 11 6.5C11 5.25 11.4375 4.1875 12.3125 3.3125C13.1875 2.4375 14.25 2 15.5 2C16.75 2 17.8125 2.4375 18.6875 3.3125C19.5625 4.1875 20 5.25 20 6.5C20 6.95 19.9333 7.375 19.8 7.775C19.6667 8.175 19.5 8.55 19.3 8.9ZM15.5 9C16.2 9 16.7917 8.75833 17.275 8.275C17.7583 7.79167 18 7.2 18 6.5C18 5.8 17.7583 5.20833 17.275 4.725C16.7917 4.24167 16.2 4 15.5 4C14.8 4 14.2083 4.24167 13.725 4.725C13.2417 5.20833 13 5.8 13 6.5C13 7.2 13.2417 7.79167 13.725 8.275C14.2083 8.75833 14.8 9 15.5 9ZM4 20V6V13V12.7V20Z" fill="#F8F8F8"/>
  </g>
  </svg></button>`;
  htmlULTpl = (
    id,
    parentId,
    value,
    icon,
    changeIcons,
    selectedClass,
    textTitle
  ) => {
    return `
      <li class="node nodeTreeLi" data-id="${id}" data-text="${textTitle}">
      <div class="nodeContainerParent" data-id="${id}" data-text="${textTitle}">
    
          <button
            class="parentNode btnTree"
            data-parent-id="${parentId}"
            data-text="${textTitle}"
          >
            <svg
              class="treeArrow"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_16_397"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_16_397)">
                <path
                  d="M12.0045 15.1538C13.0207 15.1538 13.883 14.7982 14.5913 14.0868C15.2997 13.3755 15.6538 12.5117 15.6538 11.4955C15.6538 10.4793 15.2982 9.61698 14.5868 8.90865C13.8755 8.20032 13.0117 7.84615 11.9955 7.84615C10.9792 7.84615 10.117 8.20182 9.40863 8.91317C8.7003 9.62452 8.34613 10.4883 8.34613 11.5045C8.34613 12.5207 8.7018 13.383 9.41315 14.0913C10.1245 14.7997 10.9883 15.1538 12.0045 15.1538ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.56248 12.8875 9.29998 12.25 9.29998 11.5C9.29998 10.75 9.56248 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12.0027 18C9.8368 18 7.8628 17.4106 6.08075 16.2317C4.29869 15.0529 2.96407 13.4756 2.0769 11.5C2.96407 9.52435 4.29777 7.94711 6.078 6.76828C7.85822 5.58943 9.8313 5 11.9972 5C14.1632 5 16.1372 5.58943 17.9192 6.76828C19.7013 7.94711 21.0359 9.52435 21.9231 11.5C21.0359 13.4756 19.7022 15.0529 17.922 16.2317C16.1417 17.4106 14.1687 18 12.0027 18ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9666 13.1833 20.8 11.5C19.9666 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1166 6 8.38748 6.49583 6.81248 7.4875C5.23748 8.47917 4.03331 9.81667 3.19998 11.5C4.03331 13.1833 5.23748 14.5208 6.81248 15.5125C8.38748 16.5042 10.1166 17 12 17Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          </button>
      
      <div class="nodeContainer ${selectedClass}" data-id="${id}" data-text="${textTitle}">
        
        <button class="btnTree nodebtn rotated" data-id="${id}" data-parent-id="${parentId}" style= "width: 0px; height: 0px; position: absolute;"></button>
        ${changeIcons}
        ${icon}
        <p class="nodeText" data-id="${id}">${value}</p>
        </div>
        </div>
        <ul class="children nodeTreeUl" data-id="${id}"></ul>
      </li>
    `;
  };

  #httpClient;
  // label = [];
  // icon = [];
  // chIcon = [];
  url;

  constructor(options) {
    this.options = options;
    this.label = options.label;
    this.icons = options.icons;
    this.changeIcons = options.changeIcons;
    this.iconsUrl = options.iconsUrl;
    this.#httpClient = new HttpClass();
    this.inject(options);
  }
  inject(options) {
    const container = document.querySelector(options.rootElement);
    const { rootElement } = options;
    const assembledHTML = `${this.htmlinput}`;
    const selector = rootElement || "body";
    container.innerHTML = assembledHTML;
    this.url = options.url;
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.querySelector(".searchBtn");
    container.addEventListener("click", this.slideButton.bind(this));
    searchBtn.addEventListener("click", () =>
      this.searchAndAppendNodes(searchInput.value, this.url)
    );
    // searchInput.addEventListener("keypress", (event) => {
    //   if (event.key === ".") {
    //     this.searchAndAppendNodes(searchInput.value, this.url);
    //   }
    // });

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.searchAndAppendNodes(searchInput.value, this.url);
      }
    });
  }

  findNodesById(id) {
    const selector = `[data-id="${id}"]`;
    return document.querySelectorAll(selector);
  }

  async searchAndAppendNodes(value, vUrl) {
    try {
      document.body.style.cursor = "wait";
      const searchUrl = `${vUrl}${value}`;
      const response = await this.#httpClient.request({ url: searchUrl });
      document.getElementById("searchInput").style.color = "black";

      if (response.id == -1) {
        document.getElementById("searchInput").style.color = "red";
      } else {
        for (let i = 0; i < response.nodes.length; i++) {
          const matchingNodes = this.findNodesById(response.nodes[i].id);
          const targetButton = matchingNodes[0]?.querySelector(".nodebtn");
          const targetUl = matchingNodes[0]?.querySelector(".children");
          const targetp = matchingNodes[0]?.querySelector(".nodeContainer");
          const isLastNode = i === response.nodes.length - 1;

          if (matchingNodes.length > 0) {
            if (targetButton) {
              const selectedElements = document.querySelectorAll(".selected");
              selectedElements.forEach((element) => {
                element.classList.remove("selected");
              });
              if (isLastNode) {
                targetp.click();
              }
              targetButton.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setTimeout(() => {
                targetUl.classList.add("highlight");

                setTimeout(() => {
                  targetUl.classList.remove("highlight");
                }, 300);

                targetUl.classList.remove("hidden");

                targetButton.classList.add("rotated");

                const isSelected = targetp.classList.contains("selected");
                if (isLastNode) {
                  targetp.querySelector(".nodeContainer").click();
                }
                if (isSelected) {
                  const selectedElement = document.querySelector(".selected");

                  const offset = selectedElement.getBoundingClientRect().top;
                  window.scrollBy({
                    top: offset - 30,
                    behavior: "smooth",
                  });
                } else {
                  window.scrollBy({
                    top: -30,
                    behavior: "smooth",
                  });
                }
              }, 300);
            }
          } else {
            if (i > 0) {
              const previousNode = this.findNodesById(response.nodes[i - 1].id);
              const previousTargetUl =
                previousNode[0]?.querySelector(".children");
              console.log(previousTargetUl);
              if (previousTargetUl) {
                let changeIconsHTML = "";
                this.changeIcons.forEach((chIcon, index) => {
                  changeIconsHTML += `<svg class="none nodeChangeSvg ${chIcon}" data-id="${response.nodes[i].id}" style="width: 18px; margin-right: 8px; height: 18px;" xmlns="http://www.w3.org/2000/svg">
                  <image href="${this.iconsUrl}${response.nodes[i][chIcon]}" class="nodeIcon ${chIcon}" data-id="${response.nodes[i].id}" style="width: 18px; height: 18px; cursor: pointer;" />
                </svg>`;

                  if (index !== this.changeIcons.length - 1) {
                    changeIconsHTML += ``;
                  }
                });
                let iconsHTML = "";
                this.icons.forEach((icon, index) => {
                  iconsHTML += `<svg class= "${icon} nodeSvg" data-id="${response.nodes[i].id}" style="width: 18px; margin-right: 8px;height: 18px; xmlns="http://www.w3.org/2000/svg">
                <image href="${this.iconsUrl}${response.nodes[i][icon]}" class="nodeIcon ${icon}" data-id="${response.nodes[i].id}" style="width: 18px; height: 18px; cursor: pointer;" />
                </svg>`;
                  if (index !== this.changeIcons.length - 1) {
                    iconsHTML += ``;
                  }
                });

                let labelsHTML = "";
                this.label.forEach((label, index) => {
                  labelsHTML += `${response.nodes[i][label]}`;
                  if (index !== this.label.length - 1) {
                    labelsHTML += ", ";
                  }
                });

                let isLastNode = i === response.nodes.length - 1;
                const selectedClass = isLastNode ? "selected" : "";
                setTimeout(() => {
                  if (selectedClass) {
                    const selectedElement = document.querySelector(
                      `.${selectedClass}`
                    );
                    console.log(selectedElement);
                    if (selectedElement) {
                      selectedElement.click();
                    } else {
                      console.error(
                        `Element with class ${selectedClass} not found.`
                      );
                    }
                  }
                }, 1100);
                new Promise((resolve, reject) => {
                  const nodeHTML = this.htmlULTpl(
                    response.nodes[i].id,
                    response.nodes[i].parentId,
                    labelsHTML.trim(),
                    iconsHTML.trim(),
                    changeIconsHTML.trim(),
                    selectedClass,
                    response.nodes[i].text
                  );
                  previousTargetUl.insertAdjacentHTML("beforeend", nodeHTML);

                  resolve(nodeHTML);
                }).then(() => {
                  const vParentNodeBtnEl =
                    document.querySelectorAll(".parentNode");

                  vParentNodeBtnEl.forEach((element) => {
                    element.addEventListener("click", (event) => {
                      const parentId = event.target
                        .closest("[data-parent-id]")
                        .getAttribute("data-parent-id");
                      this.searchAndClickByParentId(parentId);
                    });
                  });
                });
              }
            }
          }
        }
      }
      document.body.style.cursor = "default";
    } catch (error) {
      console.error(error);
      document.body.style.cursor = "default";
    }
  }

  findNodesByParentId(parentId) {
    const selector = `[data-parent-id="${parentId}"]`;
    return document.querySelectorAll(selector);
  }
  findNodesByDataId(parentId) {
    const selector = `[data-id="${parentId}"]`;
    return document.querySelectorAll(selector);
  }

  async searchAndClickByParentId(parentId) {
    try {
      let matchingNodes = this.findNodesByDataId(parentId);

      if (matchingNodes.length > 0) {
        const targetButton = matchingNodes[0].querySelectorAll(".nodebtn");

        if (targetButton) {
          matchingNodes.innerHTML = "";
          targetButton.forEach((elem) => {
            elem.click();
          });
          if (matchingNodes[11].classList.contains("hidden")) {
            //remove it
            matchingNodes[11].classList.remove("hidden");
          }
        } else {
          console.error(`Button not found in node with parent ID: ${parentId}`);
        }
        document.querySelector(".searchBtn").click();
      } else {
        console.error(`Node with ID ${parentId} not found.`);
      }
    } catch (error) {
      console.error(error);
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
  // selectAfter() {
  //   console.log(document.getElementById("searchinput").value);
  //   if (
  //     document.querySelector(".nodeContainer").getAttribute("data-text") ===
  //     document.getElementById("searchinput").value
  //   ) {
  //     document
  //       .querySelector(
  //         `.nodeContainer[data-text]=${
  //           document.getElementById("searchinput").value
  //         }`
  //       )
  //       .click();
  //   }
  // }
}
