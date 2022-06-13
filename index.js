const { getRequestUrl } = require("./util/getRequestUrl");
const { githubHost } = require("./util/githubHost");
const { pageType } = require("./util/pageType");
const { stringToHtml } = require("./util/stringToHtml");
const axios = require("axios");
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

const fetchGET = async (reqUrl) => {
  try {
    return await axios.get(reqUrl);
  } catch (error) {
    console.error(error);
  }
};

const crawling = async () => {
  // const githubName = prompt("What is your GitHub name? ");
  const githubName = "youngkwon02";
  const GITHUB_HOST = githubHost(githubName);
  let follwingList = [];
  let follwerList = [];

  const requestUrl = getRequestUrl(GITHUB_HOST, "", {
    page: 1,
    tab: pageType.FOLLOWING,
  });

  let res = await fetchGET(requestUrl);
  const jsDomRes = stringToHtml(res.data);

  const nameTagList = jsDomRes.window.document.querySelectorAll(
    ".d-table-cell .Link--secondary"
  );

  console.log(nameTagList);

  nameTagList.forEach((n) => follwingList.push(n.textContent));
  console.log(follwingList);
};

crawling();
