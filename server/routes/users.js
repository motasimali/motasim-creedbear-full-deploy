const express = require("express");
const {
  getUsers,
  addUser,
  modifyUser,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");
const { validateUser } = require("../middlewares/validate");
const userRouter = express.Router();

userRouter
  .route("/")
  /* Get users listing */
  .get(getUsers)
  /* Add user */
  .post(validateUser, addUser)
  /* Modify user */
  .put(validateUser, modifyUser);

userRouter
  .route("/:userId")
  /* Get user with ID */
  .get(getUserById)
  /* Delete user with ID */
  .delete(deleteUserById);

module.exports = userRouter;
