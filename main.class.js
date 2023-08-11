import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlLITpl = (id, value, hasChildren) =>
    `<div class="node" data-id="${id}">
      <button class="nodebtn ${hasChildren ? "exChild" : ""}">+</button>
      ${value}
      ${hasChildren ? '<ul class="children hidden"></ul>' : ""}
    </div>`;
  #httpClient;

  constructor(options) {
    this.#httpClient = new HttpClass(options)
  }

  inject(selector, data) {
    const assembledHTML = this.buildHTML(data);
    document.querySelector(selector).innerHTML = assembledHTML;

    const container = document.querySelector(selector);
    container.addEventListener("click", this.handleButtonClick.bind(this));
  }

  buildHTML(data) {
    let vHTML = "";
    for (const item of data) {
      const hasChildren = item.children && item.children.length > 0;
      vHTML += this.htmlLITpl(item.id, item.text, hasChildren);
    }
    return vHTML;
  }

  async handleButtonClick(event) {
    const target = event.target;
    if (
      target.classList.contains("nodebtn") &&
      target.classList.contains("exChild")
    ) {
      event.preventDefault();
      const parent = target.closest(".node");
      const children = parent.querySelector(".children");
      const parentId = parent.dataset.id;

      if (children.classList.contains("loaded")) {
        const requestConfig = {
          url: "/data.json",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await this.#httpClient.request(requestConfig);
        const childrenData = response.filter(
          (item) => item.parentId === parentId
        );
        if (childrenData.length > 0) {
          children.innerHTML = this.buildHTML(childrenData);
          children.classList.remove("hidden");
          children.classList.add("loaded");

          const childNodes = children.querySelectorAll(".nodebtn.exChild");
          childNodes.forEach((nodebtn) => {
            nodebtn.addEventListener(
              "click",
              this.handleButtonClick.bind(this)
            );
          });
        }
      } else {
        children.classList.toggle("hidden");
      }
    }
  }
}
