// cadTree.class.js
import { HttpClass } from "./http.class.js";

export class CadTreeClass {
  htmlTitleTpl = (id, pageName, pageTitle, pUrl) => {
    return `<h4 class="pagesTitle ${pageName}" data-id="${id}" data-text="${pageName}" data-url="${pUrl}">${pageTitle}</h4>`;
  };

  htmlCardTpl = (id, pageName, pageHtml) => {
    return `<div class="button-container">
    <button id="backButton" disabled><svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg></button>
    <button id="reloadButton"><svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg></button>
    <button id="forwardButton" disabled><svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg></button>
</div>

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

    container.addEventListener("click", this.handleContainerClick.bind(this));
    mainContainer.addEventListener("click", this.selectTitle.bind(this));
  }
  async handleContainerClick(event) {
    if (
      document.querySelector(".nodeText") ||
      document.querySelector(".nodeContainer")
    ) {
      const nodeText = event.target.closest(".nodeContainer");

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
    const target = event.target;
    const tText = target.getAttribute("data-text");
    const tId = target.getAttribute("data-id");
    const tUrl = target.getAttribute("data-url");

    if (target.classList.contains("pagesTitle")) {
      const apforLink = document.querySelector(".forLink");
      apforLink.innerHTML = "";
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
    const backButton = document.getElementById("backButton");
    const reloadButton = document.getElementById("reloadButton");
    const forwardButton = document.getElementById("forwardButton");

    backButton.addEventListener("click", goBack);
    reloadButton.addEventListener("click", reload);
    forwardButton.addEventListener("click", goForward);

    // Check if the browser supports window.history
    if (window.history && window.history.back) {
      backButton.disabled = false;
    }
    if (window.history && window.history.forward) {
      forwardButton.disabled = false;
    }

    function goBack() {
      if (null) {
      }
      window.history.back();
    }

    function goForward() {
      window.history.forward();
    }

    function reload() {
      const ifr = document.getElementById("pagesHtml");
      ifr.src = ifr.src;
    }
  }
}
