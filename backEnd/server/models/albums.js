'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    numberOfSongs: DataTypes.INTEGER,
    downloads: DataTypes.INTEGER,
    year: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Album.associate = (models)=> Album.belongsTo(models.User,{
      foreignKey: 'userId',
      as: 'userAlbums',
  })
  return Album;
};
