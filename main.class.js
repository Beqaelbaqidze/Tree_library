// main.class.js
export class mainClass {
  htmlLITpl = (value, childrenHTML) =>
    `<div class="node">${value}${childrenHTML}</div>`;
  htmlUlTpl = (li) => `${li}`;

  constructor() {}

  inject(selector, data) {
    const assembledHTML = this.buildHTML(data);
    document.querySelector(selector).innerHTML = assembledHTML;

    const parentNodes = document.querySelectorAll(".node");
    parentNodes.forEach((node) => {
      node.addEventListener("click", this.toggleChildren);
    });
  }

  buildHTML(data) {
    let vHTML = "";
    for (const item of data) {
      const children = item.children
        ? this.htmlUlTpl(this.buildHTML(item.children))
        : "";
      vHTML += this.htmlLITpl(item.text, children);
    }
    return vHTML;
  }

  toggleChildren(event) {
    const target = event.currentTarget;
    const children = target.querySelector(".children");
    if (children) {
      children.add.mainClass("hidden");
    }
  }
}
