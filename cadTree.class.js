// cadTree.class.js
import { HttpClass } from "./http.class.js";

export class CadTreeClass {
  htmlTitleTpl = (id, pageName, pageTitle, pUrl) => {
    return `<h4 class="pagesTitle ${pageName}" data-id="${id}" data-text="${pageName}" data-url="${pUrl}">${pageTitle}</h4>`;
  };

  htmlCardTpl = (id, pageName, pageHtml) => {
    return `
<iframe class="pagesHtml" id="pagesHtml" data-text="${pageName}" data-id="${id}" src="${pageHtml}">`;
  };
  #httpClient;
  itemPage;
  vUrl;
  selectedTitle;
  htmlPages = `<div class="titleOfPage"></div><div class="forLink"></div>`;
  constructor() {
    this.#httpClient = new HttpClass();
  }

  inject(options) {
    const mainContainer = document.querySelector(options.rootElement);
    const container = document.querySelector("#container");
    const { rootElement } = options;
    const assembledHTML = `${this.htmlPages}`;
    const selector = rootElement || "body";
    mainContainer.innerHTML = assembledHTML;
    this.url = options.url;
    console.log(this.url);
    container.addEventListener("click", this.handleContainerClick.bind(this));
    mainContainer.addEventListener("click", this.selectTitle.bind(this));
  }
  async handleContainerClick(event) {
    console.log(this.url);
    if (
      document.querySelector(".nodeText") ||
      document.querySelector(".nodeContainer")
    ) {
      const nodeText = event.target.closest(".nodeContainer");
      console.log(nodeText);
      if (nodeText) {
        await this.extractItemIdFromNodeText(nodeText, this.url);
      }
    }
  }

  async extractItemIdFromNodeText(nodeText, vUrl) {
    const itemId = nodeText.getAttribute("data-id");

    const divUrl = `${vUrl}${itemId}`;

    try {
      const response = await this.#httpClient.request({ url: divUrl });
      console.log(response.pages);
      await this.appendResponseToContainer(response.pages, itemId);
      const selectedTitleElements = document.querySelectorAll(
        `.pagesTitle[data-text="${this.selectedTitle}"]`
      );
      selectedTitleElements.forEach((element) => {
        element.classList.add("selecTitle");
      });
    } catch (error) {
      console.error("Error making HTTP request:", error);
    }
  }

  async appendResponseToContainer(response, id) {
    const apTitleOfPage = document.querySelector(".titleOfPage");
    apTitleOfPage.innerHTML = "";

    if (apTitleOfPage) {
      try {
        const promises = response.map(async (item) => {
          const titleHtml = this.htmlTitleTpl(
            id,
            item.pageName,
            item.pageTitle,
            item.pageUrl
          );

          apTitleOfPage.innerHTML += titleHtml;

          if (item.pageName === this.selectedTitle) {
            const selectedElements = document.querySelectorAll(
              `.pagesHtml[data-text="${item.pageName}"]`
            );

            selectedElements.forEach((element) => {
              element.classList.remove("none");
            });
          }
        });

        await Promise.all(promises);
      } catch (error) {
        console.error("Error processing responses:", error);
      }
    }
  }

  selectTitle(event) {
    const apforLink = document.querySelector(".forLink");
    apforLink.innerHTML = "";
    const target = event.target;
    const tText = target.getAttribute("data-text");
    const tId = target.getAttribute("data-id");
    const tUrl = target.getAttribute("data-url");

    if (target.classList.contains("pagesTitle")) {
      const selectedElements = document.querySelectorAll(
        `.pagesHtml[data-text="${tText}"]`
      );

      const cardHtml = this.htmlCardTpl(tId, tText, tUrl);
      apforLink.innerHTML = cardHtml;
      document.querySelectorAll(".pagesTitle").forEach((element) => {
        element.classList.remove("selecTitle");
      });
      target.classList.add("selecTitle");

      this.selectedTitle = tText;
    }
  }
}
