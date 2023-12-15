import { HttpClass } from "./http.class.js";

export class SearchClass {
  #httpClient;
  label = [];

  constructor(options) {
    this.options = options;
    this.label = options.label;
    this.#httpClient = new HttpClass();
  }

  htmlULTpl = (id, parentId, value) =>
    `<li class="node nodeTreeLi" data-id="${id}">
      <button data-parent-id="${parentId}" class="parentNode btnTree">...</button>
      <button data-id="${id}" class="btnTree rotated">></button>
      <p class="nodeText">${value}</p>
      <ul class="children hidden nodeTreeUl" style="display: block"></ul>
    </li>`;

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
            targetUl.classList.replace("hidden", "b");
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
}
