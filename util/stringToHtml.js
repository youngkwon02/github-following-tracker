const stringToHtml = (str) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

module.exports = {
  stringToHtml,
};
