'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    numberOfSongs: DataTypes.INTEGER,
    downloads: DataTypes.INTEGER,
    year: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};
