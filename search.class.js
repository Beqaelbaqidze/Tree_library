import { HttpClass } from "./http.class.js";

export class SearchClass {
  #httpClient;
  label = [];

  constructor(options, mainInstance) {
    this.options = options;
    this.label = options.label;
    this.#httpClient = new HttpClass();
  }

  htmlULTpl = (id, parentId, value) => {
    const liElement = document.createElement("li");
    liElement.className = "node nodeTreeLi";
    liElement.setAttribute("data-id", id);

    const parentNodeButton = document.createElement("button");
    parentNodeButton.setAttribute("data-parent-id", parentId);
    parentNodeButton.className = "parentNode btnTree";
    parentNodeButton.textContent = "...";

    parentNodeButton.addEventListener("click", (event) => {
      console.log("Parent button clicked!");
      this.searchAndClickByParentId(
        event.target.getAttribute("data-parent-id")
      );
    });

    const childButton = document.createElement("button");
    childButton.setAttribute("data-id", id);
    childButton.className = "btnTree rotated";
    childButton.textContent = ">";

    const pNode = document.createElement("p");
    pNode.className = "nodeText";
    pNode.textContent = value;

    const ulElement = document.createElement("ul");
    ulElement.className = "children hidden nodeTreeUl";
    ulElement.style.display = "block";

    liElement.appendChild(parentNodeButton);
    liElement.appendChild(childButton);
    liElement.appendChild(pNode);
    liElement.appendChild(ulElement);

    return liElement.outerHTML;
  };

  findNodesById(id) {
    const selector = `[data-id="${id}"]`;
    return document.querySelectorAll(selector);
  }

  async searchAndAppendNodes(value) {
    try {
      const searchUrl = `https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.HIERARCHY.JSON&CADCODE=${value}`;
      const response = await this.#httpClient.request({ url: searchUrl });

      for (let i = 0; i < response.nodes.length; i++) {
        const matchingNodes = this.findNodesById(response.nodes[i].id);
        const targetButton = matchingNodes[0]?.querySelector(".nodebtn");
        const targetUl = matchingNodes[0]?.querySelector(".children");

        if (matchingNodes.length > 0) {
          if (targetButton) {
            targetUl.classList.remove("hidden");
            targetButton.classList.add("rotated");
          }
        } else {
          if (i > 0) {
            const previousNode = this.findNodesById(response.nodes[i - 1].id);
            const previousTargetUl =
              previousNode[0]?.querySelector(".children");
            if (previousTargetUl) {
              let labelsHTML = "";
              this.label.forEach((label, index) => {
                labelsHTML += `${response.nodes[i][label]}`;
                if (index !== this.label.length - 1) {
                  labelsHTML += ", ";
                }
              });
              const nodeHTML = this.htmlULTpl(
                response.nodes[i].id,
                response.nodes[i].parentId,
                labelsHTML.trim()
              );
              previousTargetUl.insertAdjacentHTML("beforeend", nodeHTML);
              if (targetButton) {
                targetButton.innerHTML = "-";
              }
            }
          } else {
            console.error("Previous node not found.");
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

  // async searchAndClickByParentId(parentId) {
  //   try {
  //     await this.traverseAndClickByParentId(document.body, parentId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async searchAndClickByParentId(parentId) {
    try {
      const matchingNodes = this.findNodesByParentId(parentId);
      if (matchingNodes.length > 0) {
        matchingNodes.forEach((node) => {
          const targetButton = node.querySelectorall(".nodebtn");
          if (targetButton) {
            targetButton.click();
          } else {
            console.error(
              `Button not found in node with parent ID: ${parentId}`
            );
          }
        });
      } else {
        console.error(`No nodes found with parent ID: ${parentId}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
