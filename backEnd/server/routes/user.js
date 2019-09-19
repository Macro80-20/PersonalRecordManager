const express = require('express');
const bcrypt = require('bcrypt')  

const db = require('../models/index')

const Album =db["Album"]
const User = db["User"]
const router = express.Router();


router.get('/collection',(req,res) =>{
    User.currentUser(req)
    .then(currentUser => {
        if(!currentUser){
            res.send({error: 'Invalid Token'})
        } else {        //this is the alias 
            currentUser.getUserAlbums()
            .then(usersAlbums=> res.send(usersAlbums))
        }
    })
})
router.post('/signup',  (req, res)  => {
    // I have a hook in the model that will encrypt passwords
      User.create({
          name: req.body.name,
          email: req.body.email,
          password:req.body.password,
          createdAt: new Date (),
          updatedAt: new Date()
      }).then(user => res.send(user))
      .catch(error => res.send(error.errors[0].message))
  
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
  
  router.put('/:albumId', (req, res)  => {
        let privateParams = {}
         for (const key in req.body) {
           console.log(key, req.body[key])
             privateParams[key] = req.body[key]
           }
           console.log(privateParams)
         Album.update(
             privateParams,
             {returning:true, where: {id: req.params.albumId}})
             .then(([rowsUpdated,[updatedAlbum]]) => res.send(updatedAlbum))
     
     });
 
  
  
  module.exports = router;