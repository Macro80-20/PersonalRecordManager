var express = require('express');

const db = require('../models/index')
const bcrypt = require('bcrypt')  

const User = db["User"]

var router = express.Router();

router.post('/signup',  (req, res)  => {
    // I have a hook in the model that will encrypt passwords
      User.create({
          name: req.body.name,
          email: req.body.email,
          password:req.body.password,
          createdAt: new Date (),
          updatedAt: new Date()
      }).then(user => res.send(user))
      .catch(error => console.log(error))
  
  });
  
  //login page: storing and comparing email and password
  //sign with authenticate 
  router.post('/login',(req,res) =>{
      User.findOne({
          where:{
              email: req.body.email
          }
      }).then( user =>{
          if(!user){
              res.send('this account does not exist')
          } else {
              bcrypt.compare(req.body.password, user.password, function (err, result) {
                  if(result==true) {
                      res.send({email: user.email, token: User.issueToken({id: user.id})})
                  } else{
                      res.send({error:"incorrect password"})
                  }
              }
              )}
      })
      console.log("we made it")
  })
  
  router.get('/validate',(req,res) =>{
      //The code below is what the currentUser method is executing behind the scenes 
      // const token =req.headers['authorisation']
      // const decodedToken = jwt.verify(token,User.secret())
      // User.findOne({
      //     where:{
      //         id: decodedToken.id
      //     }
      // }) 
      User.currentUser(req)
        .then( currentUser =>{
          if(!currentUser){
              res.send({error:"invalid username/password combination"})
          } else {
              res.send({email: currentUser.email, token: User.issueToken({id: currentUser.id})})
          }   
        })
        console.log("we made it")
  }
  
  )
  
  
//   router.get('/listings',(req,res) =>{
//       User.currentUser(req)
//       .then(currentUser => {
//           if(!currentUser){
//               res.send({error: 'Invalid Token'})
//           } else {        //this is the alias 
//               currentUser.getUserCars()
//               .then(usersCars=> res.send(usersCars))
//           }
//       })
//   })
  
  
  module.exports = router;