'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserListing = sequelize.define('UserListing', {
    loaned: DataTypes.BOOLEAN
  }, {});
  UserListing.associate = (models) => {
    models.User.belongsToMany(models.Album, { through: "UserListing", foreignKey: "userId" })
    models.Album.belongsToMany(models.User, { through: "UserListing", foreignKey: "albumId" })
  }
  // UserListings.associate = (models) => models.Album.belongsToMany(models.Users, { through: UserListerListings, foreignKey: "albumId" })
  return UserListing;
  };


  