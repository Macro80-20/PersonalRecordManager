
const db = require('../models/index')  
var bodyParser = require('body-parser')
var express = require('express');
var router = express.Router();
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true})

const Album = db["Album"]
const User = db["User"]

/* GET albums for hompeage. */
 router.get('/',  (req, res)  => {
 Album.findAll({include: [{ model: User,as:"userAlbums"}]}).then(Albums => {
     res.send(Albums);
    });
  });

/* show me which user this album the user has click on belongs to from ho */
router.get('/:id',  (req, res)  => {
  Album.findAll({
      where: { userId: req.params.id },
      include: [{model:User, as:"userAlbums"}]
    }).then(Album => {
      res.send(Album);
  })

});

/* create a listing */
router.post("/new", (req, res) => {
    Album.create({
        name: req.body.name,
        artist: req.body.artist,
        numberOfSongs: req.body.numberOfSongs,
        downloads:req.body.downloads,
        year: req.body.year,
        songs: req.body.songs,
        albumCover: req.body.albumCover,
        onLoan: req.body.onLoan,
        userId: req.body.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
      .then(Albums => res.send(Albums))
      .catch(err => console.log(err));
  });


  // USER CAN UUPDATE THEIR Album SPECS 
//   router.put('/:userId', (req, res)  => {
//     let privateParams = {}
//      for (const key in req.body) {
//        console.log(key, req.body[key])
//          privateParams[key] = req.body[key]
//        }
//        console.log(privateParams)
//     //  Album.update(
//     //      privateParams,
//     //      {returning:true, where: {id: req.params.userId}})
//     //      .then(([rowsUpdated,[updatedCar]]) => res.send(updatedCar))
 
//  });


  router.delete("/:id", (req, res) => {
    Album.findByPk(req.params.id)
      .then(album =>{
        if(!album){
          res.send({error: "not found"})
        } 
        return album
        .destroy().then(() => res.send("deleted"));
    }).catch((error)=> res.send(error))

  });

  
 


module.exports = router;

