const Users = require("../models/Users");
const { totalItems, totalPages, paginate } = require("../helpers/paginate");
const {
  PAGINATION_DEFAULT_SIZE,
  PAGINATION_DEFAULT_PAGE,
} = require("../constants");
const timer = require("../helpers/timer");

exports.getUsers = (req, res, next) => {
  const pageSize = req.query?.size || PAGINATION_DEFAULT_SIZE;
  const pageNumber = req.query?.page || PAGINATION_DEFAULT_PAGE;
  timer(() =>
    res.status(200).json({
      page: pageNumber,
      per_page: pageSize,
      total: totalItems(Users.getList()),
      total_pages: totalPages(Users.getList(), pageSize),
      data: paginate(Users.getList(), pageSize, pageNumber),
    })
  );
};

exports.addUser = (req, res, next) => {
  timer(() => res.status(200).json(Users.addUser(req.body)));
};

exports.modifyUser = (req, res, next) => {
  timer(() =>
    res.status(200).json({
      status: Users.editUser(req.body),
    })
  );
};

exports.getUserById = (req, res, next) => {
  const uid = parseInt(req.params.userId);
  timer(() =>
    res.status(200).json({
      data: Users.getUser(uid),
    })
  );
};

exports.deleteUserById = (req, res, next) => {
  const uid = parseInt(req.params.userId);
  timer(() =>
    res.status(200).json({
      data: Users.findAndRemoveUser(uid),
    })
  );
};
