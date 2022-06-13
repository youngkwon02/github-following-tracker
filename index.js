const { fetchGET } = require("./fetchGET");
const { githubHost } = require("./util/githubHost");
const { pageType } = require("./util/pageType");
const prompt = require("prompt-sync")({ sigint: true });

// Step 1
// For each page both of followers and following
// *******
// const lst = document.querySelectorAll(".d-table-cell .Link--secondary");

// let str = "";
// lst.forEach((f) => {
//   str += f.innerText + "/";
// });

// console.log(str);

const githubName = prompt("What is your GitHub name?");

const GITHUB_HOST = githubHost(githubName);
