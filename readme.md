<!--- instruction ---->

import { mainClass } from "./main.class.js";

const custom = {
rootElement: "#container", (html tag where you want to build it)
url: "http://office.ge/JSON&PRNT_ID", (service url)
method: "GET",
headers: {
"Content-Type": "application/json",
},
label: ["name", "creator", "createdate"] (fields which you want to import)
};

const vMainClass = new mainClass(custom);

<!-- style -->

<!-- li class (node nodeTreeLi) -->

.node {
position: relative;
list-style: none;
margin-left: 20px; /_ Adjust the indentation _/
}

<!-- text info as paragraph class (nodeText) -->

.nodeText {
font-weight: bold;
color: #000;
display: inline-block;
margin-right: 10px;
}

  <!-- button class (nodebtn btnTree)-->

.nodebtn {
background-color: #007bff;
color: #fff;
border: none;
padding: 5px 10px;
border-radius: 5px;
cursor: pointer;
}

.nodebtn:hover {
background-color: #0056b3;
}

<!-- ul class which inside li for children class (children hidden nodeTreeUl) -->

.nodeTreeUl{

}

<!-- Lines between nodes -->

.nodeTreeLi::before {
content: "";
position: absolute;
top: -25px;
left: -10px; /_ Adjust the position _/
border-left: 1px solid #000; /_ Change line color here _/
height: 100%;
z-index: -1;
}

<!--Hide the first connector line -->

.nodeTreeLi:first-child::before {
display: none;
}
