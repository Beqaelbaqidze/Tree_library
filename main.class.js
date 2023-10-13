import { HttpClass } from "./http.class.js";

export class mainClass {
  htmlULTpl = (id, value) =>
    `<li class="node" data-id="${id}">
      <button data-id="${id}" class="nodebtn">.</button>
      ${value}
      <ul class="children hidden"></ul>
    </li>`;

  #httpClient;

  constructor(options) {
    this.#httpClient = new HttpClass();
    this.#httpClient.request(options).then((data) => {
      this.inject(options.rootElement, data);
    });
  }

  inject(selector, data) {
    const assembledHTML = this.buildHTML(data);
    if (!selector) {
      selector = options.rootElement;
    }
    document.querySelector(selector).innerHTML = assembledHTML;
    const container = document.querySelector(selector);
    container.addEventListener("click", this.handleButtonClick.bind(this));
  }

  buildHTML(data) {
    let vHTML = "<ul>";
    for (const item of data) {
      const hasChildren = item.children && item.children.length > 0;
      vHTML += this.htmlULTpl(item.id, item.name);
      if (hasChildren) {
        vHTML += this.buildHTML(item.children);
      }
    }
    vHTML += "</ul>";
    return vHTML;
  }

  async handleButtonClick(event) {
    const target = event.target;
    console.log(target);
    if (target.classList.contains("nodebtn")) {
      event.preventDefault();
      const parent = target.closest(".node");
      const children = parent.querySelector(".children");

      if (!children.classList.contains("loaded")) {
        const parentId = parent.getAttribute("data-id");

        const requestConfig = {
          url: `http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.BROWSER.JSON&PRNT_ID=${parentId}`,
        };

        try {
          const response = await this.#httpClient.request(requestConfig);
          if (response.length > 0) {
            const childrenHTML = this.buildHTML(response);
            children.innerHTML = childrenHTML;
          } else {
            target.innerHTML = "-";
          }
          children.classList.add("loaded");
        } catch (error) {
          console.error(error);
        }
      }

      children.classList.toggle(
        "hidden",
        !children.classList.contains("hidden")
      );
    }
  }
}
