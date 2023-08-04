import { Http } from "./http.class.js";
import { mainClass } from "./main.class.js";

const custom = {
  url: "/data.json",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const http = new Http(custom);
let hReq = http.request(custom);

const container = document.getElementById("container");
const vMainClass = new mainClass();
hReq
  .then((value) => {
    vMainClass.inject("#container", value);
  })
  .catch((error) => {
    console.error("Error", error);
  });
