'use strict';
// require('dotenv').config()

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const PORT = process.env.PORT || 3000;
// you should determine the port to listen on by checking PORT first and giving it a default value otherwise:
// the process.env
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


// if our config file looks like this
// {
  // development: {
  //   "use_env_varibale": "DATABASE_URL"
  //   }
  // }
let sequelize;
if (config.use_env_variable) {
   // From the environment, extract the key-value with the name provided in the config as use_env_variable
  // and use that to establish a connection to our cloud service
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else { //else extra key-value paries prodived in the developement object 
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// nodeJS provide access to all existing environment variables by creating an env object as property of the process global object with prcoess.env
// In this file, we are requiring the modules we're going to be using. Then, we're reading the configuration specific to our current Node environment. 
// If we don't have a Node environment defined, we're defaulting to development. Then, we are establishing a connection with our database, 
// after which we read our models folder, discovering and importing any and all the models in it, adding them to the db object and applying 
// relationships between the models, if such relationships exist.


