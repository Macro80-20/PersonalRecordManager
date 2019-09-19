
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

// db["User"].findAll().then(users => console.log(users))
// db["Album"].findAll().then(albums => console.log(albums))
// db["User"].findAll({include: [{  model: db.Album, as: "userAlbums"}]}).then(cars => console.log(cars))

  // user[1].getowners()).then(resp => console.log(resp))

  // db.User.findAll({include: [{ model: db.Albums, as:"userAlbums"}]}).then(cars => console.log(cars))
  // db.User.Albums().then(x => console.log(x))
 
  // db.Album.findAll({
  // where: { id: 3 }}).then(user=> user[0].getAlbums()).then(resp => console.log(resp))
   // 
  // db.User.findAll({
  // where: { id: 3 }}).then(user=> user[0].dataValues).then(resp => console.log(resp))



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

// console.log(faker.lorem.words())