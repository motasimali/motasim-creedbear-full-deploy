const { faker } = require("@faker-js/faker");

faker.seed(100);

function createRandomUser() {
  return {
    id: faker.datatype.number(),
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    avatar: faker.image.avatar(),
  };
}

module.exports = {
  faker,
  createRandomUser,
};
