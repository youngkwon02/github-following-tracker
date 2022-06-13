const jsdom = require("jsdom");

const stringToHtml = (xmlString) => {
  const dom = new jsdom.JSDOM(xmlString);
  return dom;
};

module.exports = {
  stringToHtml,
};
