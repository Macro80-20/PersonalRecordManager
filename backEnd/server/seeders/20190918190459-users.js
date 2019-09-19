const faker = require("faker");
module.exports = {
  up: (queryInterface, Sequelize) => {

      let usersData = [];
      for (let i = 0; i < 5; i++) {
          const seedData = {
              name: faker.name.findName(),
              password: faker.internet.password(),
              email: faker.internet.email(),
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

