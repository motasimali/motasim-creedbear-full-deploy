const paginate = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

const totalPages = (array, pageSize) => {
  return Math.ceil(array.length / pageSize);
};

const totalItems = (array) => {
  return array.length;
};

module.exports = {
  paginate,
  totalPages,
  totalItems,
};
