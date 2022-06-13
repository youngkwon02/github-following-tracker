const fetchGET = async (host, path, queryStringObject = {}, headers = {}) => {
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

  const options = {
    method: "GET",
    header: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};

module.exports = {
  fetchGET,
};
