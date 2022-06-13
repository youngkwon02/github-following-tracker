const axios = require("axios");

const fetchGET = async (reqUrl) => {
  try {
    return await axios.get(reqUrl);
  } catch (error) {
    // console.error(error);
  }
};

module.exports = {
  fetchGET,
};
