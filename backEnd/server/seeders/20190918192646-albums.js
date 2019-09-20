const faker = require("faker");
module.exports = {
  up: (queryInterface, Sequelize) => {

      let albumsData = [];
      for (let i = 0; i < 5; i++) {
          const seedData = {
              name: `album ${Math.floor(Math.random() * Math.floor(10))}`,
              artist: "Michael Jackon",
              numberOfSongs: Math.floor(Math.random() * Math.floor(15)),
              downloads: Math.floor(Math.random() * ( 10000000 - 10000 ) + 600),
              year: Math.floor(Math.random() * ( 2019 - 1995 ) + 1995),
              onLoan: "",
              albumCover: "https://react.semantic-ui.com/images/avatar/large/daniel.jpg",
              songs: ["Beat it","Baby be mine", "The Lady in my Life","Thiller","The Girl is mine", "Human Nature", "P.Y.T"],
              userId: 1,
              createdAt: new Date(),
              updatedAt: new Date()
          };
          albumsData.push(seedData);
      }

      return queryInterface.bulkInsert('Albums', albumsData, {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Albums', null, {});
  }
};
