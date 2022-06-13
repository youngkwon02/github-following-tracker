const { fetchGET } = require("./util/fetchGET");
const { getRequestUrl } = require("./util/getRequestUrl");
const { githubHost } = require("./util/githubHost");
const { pageType } = require("./util/pageType");
const { stringToHtml } = require("./util/stringToHtml");
const prompt = require("prompt-sync")({ sigint: true });

const getFollowers = async (gitHost) => {
  let followers = [];

  for (let page = 1; ; page++) {
    const requestUrl = getRequestUrl(gitHost, "", {
      page,
      tab: pageType.FOLLOWERS,
    });

    let res = await fetchGET(requestUrl);
    const jsDomRes = stringToHtml(res.data);

    const tagElements = jsDomRes.window.document.querySelectorAll(
      ".d-table-cell .Link--secondary"
    );

    if (!tagElements.length) {
      break;
    }
    tagElements.forEach((n) => followers.push(n.textContent));
  }
  return followers;
};

const getFollowing = async (gitHost) => {
  let followings = [];

  for (let page = 1; ; page++) {
    const requestUrl = getRequestUrl(gitHost, "", {
      page,
      tab: pageType.FOLLOWING,
    });

    let res = await fetchGET(requestUrl);
    const jsDomRes = stringToHtml(res.data);

    const tagElements = jsDomRes.window.document.querySelectorAll(
      ".d-table-cell .Link--secondary"
    );

    if (!tagElements.length) {
      break;
    }
    tagElements.forEach((n) => followings.push(n.textContent));
  }

  return followings;
};

const printResult = (followers, followings) => {
  const only = {
    followingOnly: [],
    followerOnly: [],
  };

  followings.forEach((f) => {
    if (!followers.includes(f)) {
      only.followingOnly.push(f);
    }
  });

  followers.forEach((f) => {
    if (!followings.includes(f)) {
      only.followerOnly.push(f);
    }
  });

  console.log("--------------------------------------------------------");
  console.log(`Total Followers : ${followers.length}`);
  console.log(`Total Followings : ${followings.length}`);
  console.log("--------------------------------------------------------");
  console.log(`Only you follow : ${only.followingOnly.length}`);
  only.followingOnly.forEach((f) => console.log(f));
  console.log("--------------------------------------------------------");
  console.log(`Only someone follows : ${only.followerOnly.length}`);
  only.followerOnly.forEach((f) => console.log(f));
  console.log("--------------------------------------------------------");
};

const crawlAll = async () => {
  const name = prompt("What is your GitHub name? ");
  const host = githubHost(name);

  const followers = await getFollowers(host);
  const followings = await getFollowing(host);
  printResult(followers, followings);
};

crawlAll();
