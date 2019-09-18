require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');


const db=require('./server/models/index')
const routes = require('./server/routes/index')

// * wildcard allows access from any origin.
const app = express().use("*",cors());
const PORT = process.env.PORT || 30001


app.use(bodyParser.json()); 
app.use('/users', routes.user);


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
