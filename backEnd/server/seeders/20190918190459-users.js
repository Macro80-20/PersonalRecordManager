const faker = require("faker");
module.exports = {
  up: (queryInterface, Sequelize) => {

      let usersData = [];
      for (let i = 0; i < 20; i++) {
          const seedData = {
              name: faker.name.findName(),
              username: faker.internet.userName(),
              address: faker.address.streetAddress(),
              email: faker.internet.email(),
              password: faker.internet.password(),
              createdAt: new Date(),
              updatedAt: new Date()
          };
          usersData.push(seedData);
      }

      return queryInterface.bulkInsert('Users', usersData, {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};

