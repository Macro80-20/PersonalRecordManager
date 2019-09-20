const express = require('express');
const bcrypt = require('bcrypt')  

const db = require('../models/index')

const Album =db["Album"]
const User = db["User"]
const router = express.Router();


  
  // router.put('/:albumId', (req, res)  => {
  //       let privateParams = {}
  //        for (const key in req.body) {
  //          console.log(key, req.body[key])
  //            privateParams[key] = req.body[key]
  //          }
  //          console.log(privateParams)
  //        Album.update(
  //            privateParams,
  //            {returning:true, where: {id: req.params.albumId}})
  //            .then(([rowsUpdated,[updatedAlbum]]) => res.send(updatedAlbum))
     
  //    });
 
  
  
  module.exports = router;