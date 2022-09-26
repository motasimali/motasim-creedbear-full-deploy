exports.INITIAL_USERS_LENGTH = 100;

exports.PAGINATION_DEFAULT_PAGE = 1;

exports.PAGINATION_DEFAULT_SIZE = 10;

//FAKE INVTERVAL TO MIMIC API WAIT
exports.FAKE_INTERVAL = 1000;

exports.USER_VALIDATION_RULE = {
  email: "required|string|email",
  first_name: "required|string",
  last_name: "required|string",
};

exports.EMAIL_VALIDATION_RULE = {
  email: "required|string|email",
};
