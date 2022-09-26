const timer = require("../helpers/timer");
const Users = require("../models/Users");

exports.handleLogin = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({
      status: "failed",
    });
  const foundUser = Users.getList().find((user) => user.email === email);

  timer(() => {
    if (!foundUser) {
      return res.status(401).send();
    }
    return res.status(200).json({
      status: "success",
      user: foundUser,
    });
  });
};
