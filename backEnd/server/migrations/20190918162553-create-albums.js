'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      numberOfSongs: {
        type: Sequelize.INTEGER
      },
      downloads: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
      },
      onLoan:  {
        type: Sequelize.STRING,
        defaultValue: "",
       },
       songs: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
        },
        albumCover: {
          type: Sequelize.STRING,
        },
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        foreignKey: true,
      references: {
        model: 'Users', // name of Target model
        key: 'id', // target primary key in Target model that we're referencing
      },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Albums');
  }
};