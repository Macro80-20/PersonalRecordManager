const faker = require("faker");
const bcrypt = require('bcrypt');
let hash = bcrypt.hashSync('myPassword', 5);

module.exports = {
  up: (queryInterface, Sequelize) => {

    //   let usersData = [];
    //   for (let i = 0; i < 5; i++) {
    //       const seedData = {
    //           name: faker.name.findName(),
    //           password: faker.internet.password(),
    //           email: faker.internet.email(),
    //           createdAt: new Date(),
    //           updatedAt: new Date()
    //       };
    //       usersData.push(seedData);
    //   }
return queryInterface.bulkInsert('Users', [{
        name: "test",
        password: hash,
        email: "test@live.com",
        createdAt: new Date(),
        updatedAt: new Date()
}], {})
},

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};

