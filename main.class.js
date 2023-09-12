import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlULTpl = (id, value, hasChildren) =>
    `<div class="node" data-id="${id}">
      <button data-id="${id}" class="nodebtn ${
      hasChildren ? "exChild" : ""
    }">+</button>
      ${value}
      <ul class="children hidden"></ul>
    </div>`;
  htmlLITpl = (id, value) =>
    `<li data-id="${id}">
    <button data-id="${id}" class="nodebtn ${
      hasChildren ? "exChild" : ""
    }">+</button>&nbsp;${value}
      <ul class="children hidden"></ul>
     </li>`;
  #httpClient;

  constructor(options) {
    this.#httpClient = new HttpClass(options);
    this.#httpClient.request(options).then((data) => {
      this.inject(options.rootElement, data);
    });
  }

  inject(selector, data) {
    const assembledHTML = this.buildHTML(data);
    if (!selector) {
      selector = this.options.rootElement;
    }
    document.querySelector(selector).innerHTML = assembledHTML;
    const container = document.querySelector(selector);
    container.addEventListener("click", this.handleButtonClick.bind(this));
  }

  buildHTML(data, isChildren = false) {
    let vHTML = isChildren ? "<ul>" : "";
    for (const item of data) {
      const hasChildren = item.children && item.children.length > 0;
      if (isChildren) {
        vHTML += this.htmlLITpl(item.id, item.text, hasChildren);
      } else {
        vHTML += this.htmlULTpl(item.id, item.text, hasChildren);
      }
    }
    vHTML += isChildren ? "</ul>" : "";
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

      if (!children.classList.contains("loaded")) {
        const parentId = parent.getAttribute("data-id");

        const requestConfig = {
          url: `/https://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.BROWSER.JSON&PRNT_ID=${parentId}`,
        };

        try {
          const response = await this.#httpClient.request(requestConfig);
          if (response.length > 0) {
            const childrenHTML = this.buildHTML(response, true);
            children.innerHTML = childrenHTML;
          }
          children.classList.add("loaded");
        } catch (error) {
          console.error(error);
        }
      }

      children.classList.toggle("hidden");
    }
  }
}
