import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlULTpl = (id, value) =>
    `<li class="node nodeTreeLi" data-id="${id}">
      <button data-id="${id}" class="nodebtn btnTree">+</button>
      <p class="nodeText">${value}</p>
      <ul class="children hidden nodeTreeUl"></ul>
    </li>`;

  #httpClient;
  searchedIds = [];

  constructor(options) {
    this.options = options;
    this.label = options.label;
    this.#httpClient = new HttpClass();
    this.#httpClient.request({ url: options.url }).then((data) => {
      this.inject(options, data);
    });
  }

  inject(options, data) {
    const { rootElement } = options;
    const sortedData = this.sortDataByLabel(data, "name");
    const assembledHTML = this.buildHTML(sortedData);
    const selector = rootElement || "body";
    document.querySelector(selector).innerHTML = assembledHTML;
    const container = document.querySelector(selector);
    container.addEventListener("click", this.handleButtonClick.bind(this));
  }

  sortDataByLabel(data, labelProperty) {
    return data.sort((a, b) => a[labelProperty] - b[labelProperty]);
  }

  buildHTML(data) {
    let vHTML = "<ul>";

    for (const item of data) {
      const labels = this.label.map((label) => item[label]).join(", ");
      const hasChildren = item.children && item.children.length > 0;
      vHTML += this.htmlULTpl(item.id, labels);

      if (hasChildren) {
        vHTML += this.buildHTML(item.children);
      }
    }
    vHTML += "</ul>";
    return vHTML;
  }

  findNodesById(id) {
    const selector = `${this.options.rootElement || "body"} [data-id="${id}"]`;
    return document.querySelectorAll(selector);
  }

  async search(value) {
    try {
      const searchInput = document.getElementById("searchInput");
      const searchUrl = `https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.HIERARCHY.JSON&CADCODE=${value}`;
      const response = await this.#httpClient.request({ url: searchUrl });

      const matchingNodes = this.findNodesById(response.id);
      if (matchingNodes.length > 0) {
        const targetButton = matchingNodes[0].querySelector(".nodebtn");
        if (targetButton) {
          if (targetButton.innerHTML == "+") {
            targetButton.click();
          }
          this.searchedIds.push(response.id);
        } else {
          alert(
            `Button element not found for ID "${response.id}" in the tree.`
          );
        }
      } else {
        console.log(`No nodes matching ID "${response.id}" found in the tree.`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async handleButtonClick(event) {
    const target = event.target;
    if (target.classList.contains("nodebtn")) {
      event.preventDefault();
      const parent = target.closest(".node");
      const children = parent.querySelector(".children");

      if (!children.classList.contains("loaded")) {
        const parentId = parent.getAttribute("data-id");
        target.innerHTML = "-";
        const requestConfig = {
          url: `${this.options.url}=${parentId}`,
        };

        try {
          const response = await this.#httpClient.request(requestConfig);
          if (response.length > 0) {
            const childrenHTML = this.buildHTML(response);
            children.innerHTML = childrenHTML;
          } else {
            // Handle case when no children are found
          }
          children.classList.add("loaded");
        } catch (error) {
          console.error(error);
        }
      } else {
        target.innerHTML = target.innerHTML === "+" ? "-" : "+";
      }

      children.classList.toggle(
        "hidden",
        !children.classList.contains("hidden")
      );
    }
  }

  getAllSearchedIds() {
    return this.searchedIds;
  }
}
