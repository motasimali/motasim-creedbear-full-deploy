const { FAKE_INTERVAL } = require("../constants");

const timer = (functionToRunAfter) => {
  setTimeout(functionToRunAfter, FAKE_INTERVAL);
};

module.exports = timer;
