
require('dotenv').config()
const faker = require("faker");
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const db=require('./server/models/index')
const routes = require('./server/routes/index')

// * wildcard allows access from any origin.
const app = express().use("*",cors());
const PORT = process.env.PORT || 3002


app.use(bodyParser.json()); 
app.use('/users', routes.user);
app.use('/albums', routes.album);
app.use(routes.auth);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

//  I am able to fetch from the client side
app.get('/express_backend', (req, res) => res.send('Your express backend is connected to react'))

db.sequelize.sync().then(() => {
  app.listen(PORT, () => 
console.log(`Example app listening on port ${PORT}!`)
)
})


// db["User"].findAll().then(users => console.log(users))
// db["Album"].findAll().then(albums => console.log(albums))


// using association methods   
  // db.User.findByPk(1).then( x => x.getUserAlbums()).then(resp => console.log(resp))
//using Sequelize commands
  // db.User.findByPk(1).then( x => console.log(x.dataValues))
//Structuring response how with add and model

  // db.User.findAll({include: [{ model: db.Albums, as:"userAlbums"}]}).then(albums=> console.log(albums))


  // db.Album.findAll({
  // where: { id: 3 }}).then(user=> user[0].getAlbums()).then(resp => console.log(resp))

//Learning how to user where 
  // db.User.findAll({
  // where: { id: 3 }}).then(user=> user[0].dataValues).then(resp => console.log(resp))

