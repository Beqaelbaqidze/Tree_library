import { HttpClass } from "./http.class.js";

export class SearchClass {
  #httpClient;
  label = [];
  icon = [];
  chIcon = [];

  constructor(options) {
    this.options = options;
    this.label = options.label;
    this.icons = options.icons;
    this.changeIcons = options.changeIcons;
    this.iconsUrl = options.iconsUrl;
    this.#httpClient = new HttpClass();
  }

  // htmlULTpl = (id, parentId, value) => {
  //   const liElement = document.createElement("li");
  //   liElement.className = "node nodeTreeLi";
  //   liElement.setAttribute("data-id", id);

  //   const parentNodeButton = document.createElement("button");
  //   parentNodeButton.setAttribute("data-parent-id", parentId);

  //   parentNodeButton.className = "parentNode btnTree";
  //   parentNodeButton.textContent = "...";

  //   const childButton = document.createElement("button");
  //   childButton.setAttribute("data-id", id);
  //   childButton.setAttribute("data-parent-id", parentId);
  //   childButton.className = "btnTree nodebtn rotated";
  //   childButton.textContent = "";

  //   const pNode = document.createElement("p");
  //   pNode.className = "nodeText";
  //   pNode.textContent = value;

  //   const ulElement = document.createElement("ul");
  //   // ulElement.style.display = "block";
  //   ulElement.className = "children nodeTreeUl";

  //   liElement.appendChild(parentNodeButton);
  //   liElement.appendChild(childButton);
  //   liElement.appendChild(pNode);
  //   liElement.appendChild(ulElement);

  //   return liElement.outerHTML;
  // };
  htmlULTpl = (id, parentId, value, icon, changeIcons) => {
    return `
      <li class="node nodeTreeLi" data-id="${id}">
        <button class="parentNode btnTree" data-parent-id="${parentId}"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" id="mainIconPathAttribute" fill="#000000"></path> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" id="mainIconPathAttribute" fill="#000000"></path> </svg></button>
        <button class="btnTree nodebtn rotated" data-id="${id}" data-parent-id="${parentId}" style= "width: 0px; height: 0px; position: absolute;"></button>
        ${changeIcons}
        ${icon}
        <p class="nodeText">${value}</p>
        <ul class="children nodeTreeUl"></ul>
      </li>
    `;
  };

  findNodesById(id) {
    const selector = `[data-id="${id}"]`;
    return document.querySelectorAll(selector);
  }

  async searchAndAppendNodes(value) {
    try {
      const searchUrl = `https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.HIERARCHY.JSON&CADCODE=${value}`;
      const response = await this.#httpClient.request({ url: searchUrl });
      document.getElementById("searchInput").style.color = "black";

      // const iconsHTML = this.icons
      //   .map(
      //     (
      //       icons
      //     ) => `<svg class= "${icons}" style="width: 18px; margin-right: 8px;height: 18px;" xmlns="http://www.w3.org/2000/svg">
      //   <image href="${this.iconsUrl}/${response.nodes[i][label]}" class="nodeIcon" style="width: 18px; height: 18px; cursor: pointer;" />
      // </svg>`
      //   )
      //   .join("");
      console.log(response.id);
      if (response.id == -1) {
        document.getElementById("searchInput").style.color = "red";
      } else {
        for (let i = 0; i < response.nodes.length; i++) {
          const matchingNodes = this.findNodesById(response.nodes[i].id);
          const targetButton = matchingNodes[0]?.querySelector(".nodebtn");
          const targetUl = matchingNodes[0]?.querySelector(".children");
          const targetp = matchingNodes[0]?.querySelector(".nodeText");

          if (matchingNodes.length > 0) {
            if (targetButton) {
              targetButton.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setTimeout(() => {
                targetUl.classList.add("highlight");

                setTimeout(() => {
                  targetUl.classList.remove("highlight");
                  targetp.classList.add("selected");
                }, 1000);

                targetUl.classList.remove("hidden");

                targetButton.classList.add("rotated");
                window.scrollBy({
                  top: -30,
                  behavior: "smooth",
                });
              }, 500);
            }
          } else {
            if (i > 0) {
              const previousNode = this.findNodesById(response.nodes[i - 1].id);
              const previousTargetUl =
                previousNode[0]?.querySelector(".children");

              if (previousTargetUl) {
                let changeIconsHTML = "";
                this.changeIcons.forEach((chIcon, index) => {
                  changeIconsHTML += `<svg class="none nodeChangeSvg ${chIcon}" data-id="${response.nodes[i].id}" style="width: 18px; margin-right: 8px; height: 18px;" xmlns="http://www.w3.org/2000/svg">
                  <image href="${this.iconsUrl}${response.nodes[i][chIcon]}" class="nodeIcon ${chIcon}" data-id="${response.nodes[i].id}" style="width: 18px; height: 18px; cursor: pointer;" />
                </svg>`;

                  if (index !== this.changeIcons.length - 1) {
                    changeIconsHTML += "";
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

                new Promise((resolve, reject) => {
                  const nodeHTML = this.htmlULTpl(
                    response.nodes[i].id,
                    response.nodes[i].parentId,
                    labelsHTML.trim(),
                    iconsHTML.trim(),
                    changeIconsHTML.trim()
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

                // parentNodeButton.addEventListener("click", (event) => {
                //   console.log("Parent button clicked!");
                // });

                if (targetButton) {
                  targetButton.innerHTML = "-";
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
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

  // async searchAndClickByParentId(parentId) {
  //   try {
  //     await this.traverseAndClickByParentId(document.body, parentId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async searchAndClickByParentId(parentId) {
    try {
      const matchingNodes = this.findNodesByDataId(parentId);

      if (matchingNodes.length > 0) {
        const targetButton = matchingNodes[0].querySelector(".nodebtn");

        if (targetButton) {
          targetButton.click();
        } else {
          console.error(`Button not found in node with parent ID: ${parentId}`);
        }
      } else {
        console.error(`Node with ID ${parentId} not found.`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
