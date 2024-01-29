// cadTree.class.js
import { HttpClass } from "./http.class.js";

export class CadTreeClass {
  #httpClient;
  itemPage;
  selectedTitle; // Variable to store the selected title

  constructor() {
    this.#httpClient = new HttpClass();
    container.addEventListener("click", this.handleContainerClick.bind(this));
    container.addEventListener("click", this.selectTitle.bind(this));
  }

  htmlTitleTpl = (id, pageName, pageTitle) => {
    return `<h4 class="pagesTitle ${pageName}" data-id="${id}" data-text="${pageName}">${pageTitle}</h4>`;
  };

  htmlCardTpl = (id, pageName, pageHtml) => {
    return `<iframe class="pagesHtml none" data-text="${pageName}" data-id="${id}" src="${pageHtml}">`;
  };

  async handleContainerClick(event) {
    const nodeText = event.target.closest(".nodeText");
    if (nodeText) {
      await this.extractItemIdFromNodeText(nodeText);
    }
  }

  async extractItemIdFromNodeText(nodeText) {
    const itemId = nodeText.getAttribute("data-id");

    const divUrl = `http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.RIGHT_PAGES.JSON&ID=${itemId}`;
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
    const apforLink = document.querySelector(".forLink");
    apforLink.innerHTML = "";

    if (apTitleOfPage) {
      try {
        const promises = response.map(async (item) => {
          const pageUrlHtml = item.pageUrl;

          const titleHtml = this.htmlTitleTpl(
            id,
            item.pageName,
            item.pageTitle
          );
          const cardHtml = this.htmlCardTpl(id, item.pageName, pageUrlHtml);

          apTitleOfPage.innerHTML += titleHtml;
          apforLink.innerHTML += cardHtml;

          // Check if the current item's title matches the selectedTitle
          if (item.pageName === this.selectedTitle) {
            const selectedElements = document.querySelectorAll(
              `.pagesHtml[data-text="${item.pageName}"]`
            );

            selectedElements.forEach((element) => {
              element.classList.remove("none");
            });
          }

          return pageUrlHtml;
        });

        await Promise.all(promises);
      } catch (error) {
        console.error("Error processing responses:", error);
      }
    }
  }

  selectTitle(event) {
    const target = event.target;
    const vTr = target.getAttribute("data-text");

    if (target.classList.contains("pagesTitle")) {
      console.log("selectTitle method called for data-text:", vTr);
      const selectedElements = document.querySelectorAll(
        `.pagesHtml[data-text="${vTr}"]`
      );
      document.querySelectorAll(".pagesTitle").forEach((element) => {
        element.classList.remove("selecTitle");
      });
      target.classList.add("selecTitle");
      const allNodeTitleDiv = document.querySelectorAll(".pagesHtml");

      allNodeTitleDiv.forEach((elem) => {
        elem.classList.add("none");
      });

      console.log("Number of selected elements:", selectedElements.length);

      selectedElements.forEach((element) => {
        element.classList.remove("none");
      });

      this.selectedTitle = vTr;
    }

    document
      .querySelector(".containterIframe")
      .addEventListener("contextmenu", this.openNewWindow.bind(this));
  }

  openNewWindow(event) {
    event.preventDefault();

    const target = event.target;
    const vTr = target.getAttribute("data-text");

    if (target.classList.contains("pagesTitle")) {
      console.log("selectTitle method called for data-text:", vTr);
      const selectedElements = document.querySelectorAll(
        `.pagesHtml[data-text="${vTr}"]`
      );
      const newWindow = window.open("about:blank", "_blank");
      newWindow.document.write(
        `<html><head><title>${vTr}</title></head><body>${selectedElements[0].innerHTML}</body></html>`
      );
      newWindow.document.close();
    }
  }
}
