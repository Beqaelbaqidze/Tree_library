import { mainClass } from "./main.class.js";

const custom = {
  rootElement: "#container",
  url: "http://office.napr.gov.ge/lr-test/bo/landreg-5/cadtree?FRAME_NAME=CADTREE.BROWSER.JSON&PRNT_ID",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  label: ["name", "creator"],
};

const vMainClass = new mainClass(custom);

searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const vInputValue = searchInput.value.split(".");
    let arr = [];
    let temp = "";
    for (let i = 0; i < vInputValue.length; i++) {
      temp += (temp === "" ? "" : ".") + vInputValue[i];
      arr.push(temp);
      for (let j = 0; j < arr.length; j++) {
        await vMainClass.search(arr[j]);
      }
    }

    await handleButtonClick(event);
  }
});
