import { HttpClass } from "./http.class.js";
export class mainClass {
  htmlULTpl = (id, value) =>
    `<li class="node nodeTreeLi" data-id="${id}">
      <button data-id="${id}" class="nodebtn btnTree">+</button>
      <p class="nodeText">${value}</p>
      <ul class="children hidden nodeTreeUl"></ul>
    </li>`;

  #httpClient;
  constructor(options) {
    console.log("mainClass constructor: itemType =", options.label);
    this.options = options;
    this.label = options.label;
    this.#httpClient = new HttpClass();
    this.#httpClient.request({ url: options.url }).then((data) => {
      this.inject(options, data);
    });
  }

  inject(options, data) {
    const { rootElement } = options;
    const assembledHTML = this.buildHTML(data);
    const selector = rootElement || "body";
    document.querySelector(selector).innerHTML = assembledHTML;
    const container = document.querySelector(selector);
    container.addEventListener("click", this.handleButtonClick.bind(this));
  }

  buildHTML(data) {
    let vHTML = "<ul>";

    for (const item of data) {
      const labels = this.label.map((label) => item[label]).join(", ");
      const hasChildren = item.children && item.children.length > 0;
      vHTML += this.htmlULTpl(item.id, labels);

      if (hasChildren) {
        vHTML += buildHTML(item.children);
      }
    }
    vHTML += "</ul>";
    return vHTML;
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
}
