const getRequestUrl = (host, path, qsObject) => {
  let url = `${host}${path}`;
  if (Object.keys(queryStringObject).length) {
    url += "?";

    Object.keys(queryStringObject).forEach((key) => {
      if (url[url.length - 1] !== "?") {
        url += "&";
      }
      url += `${key}=${queryStringObject[key]}`;
    });
  }
  return url;
};

module.exports = {
  getRequestUrl,
};
