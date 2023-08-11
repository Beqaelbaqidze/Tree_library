import { mainClass } from "./main.class.js";

const custom = {
  url: "/data.json",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};



const container = document.getElementById("container");
const vMainClass = new mainClass(custom);
hReq
  .then((value) => {
    vMainClass.inject("#container", value);
  })
  .catch((error) => {
    console.error("Error", error);
  });
