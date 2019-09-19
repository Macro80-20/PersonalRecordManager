'use strict';
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 5;

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
  User.associate = models =>  User.hasMany(models.Album,{
    foreignKey: 'userId',
    as: 'userAlbums',
    onDelete: 'CASCADE',
   })


 //Hook Methods 
 //get called after User.create({name: 'Cody', password: '123'}), and run before new User is saved in the db
User.beforeCreate(async (userInstance,options) => {
  // auto-gen a salt and hash
  let encryptedPassword = await bcrypt.hash(userInstance.password, saltRounds)
  .then((hash) =>{
    // Store hash in your password DB.
   userInstance.password = hash;
  });
 return encryptedPassword
});

 //Class Methods

User.secret = () => "ssh"
 //* these two methods are to do with the signIn router. once they sign in we issue a token which is pushed into localStorage from the client-Side
  //{id: user.id}
User.issueToken = data => jwt.sign(data,User.secret())
 

//* the next two methods involve taking in the client request decoding their token and sending back whatever info the user has requested
User.token = (req) =>  req.headers['authorisation']

User.currentUser = async function(getToken){
  const id= jwt.verify(User.token(getToken),User.secret()).id
  const currentUser = await User.findOne({
    where:{
        id: id
    }
})
  return currentUser
}

//Instance methods 
User.prototype.test = () => {
  console.log("WORKED")
  };

  // this is not finished , the code is in the router i must refctor 
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.localPassword);
   // Load hash from my password Db
  // bcrypt.compareSync(myPlaintextPassword, hash);
}
 
  
  return User;
};


 