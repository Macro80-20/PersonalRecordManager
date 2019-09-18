'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: { 
        args: false,
         msg: 'Please enter your username' 
        }
     }, 
    password:  { 
      type: DataTypes.STRING, 
      allowNull: { 
        args: false, msg: 'Please enter a password' 
       }, 
    } ,
    email: { 
      type: DataTypes.STRING, 
      allowNull: { args: false, msg: 'Please enter your email address' }, 
      unique: { 
        args: true, 
        msg: 'Email already exists' 
       }, 
     validate: { 
       isEmail: { 
         args: true, 
         msg: 'Please enter a valid email address' 
       }, 
     }, 
    }, 
  }, {});
  // User.associate = (models) => User.belongsToMany(models.Album,{
  //   as: "albums",
  //   through: "UserListing",
  //   foreignKey: "userId"
  // })
    // associations can be defined here
  
  return User;
};


 