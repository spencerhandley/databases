// /* You'll need to
//  * npm install sequelize
//  * before running this example. Documentation is at http://sequelizejs.com/
//  */

// var Sequelize = require("sequelize");
// var sequelize = new Sequelize("chatter", "root", "YOUR_PASSWORD");
// /* TODO this constructor takes the database name, username, then password.
//  * Modify the arguments if you need to */

// /* first define the data structure by giving property names and datatypes
//  * See http://sequelizejs.com for other datatypes you can use besides STRING. */
// var User = sequelize.define('User', {
//   username: Sequelize.STRING
// });

// var Message = sequelize.define('Message', {
//   userid: Sequelize.INTEGER,
//   message: Sequelize.STRING,
//   roomname: Sequelize.STRING
// });

// /* .sync() makes Sequelize create the database table for us if it doesn't
//  *  exist already: */
// User.sync().success(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newUser = User.build({username: "Jean Valjean"});
//   newUser.save().success(function() {

//   })
//      // This callback function is called once saving succeeds.

//     // Retrieve objects from the database:
//     User.findAll({ where: {username: "Jean Valjean"} }).success(function(users) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < users.length; i++) {
//         console.log(users[i].username + " exists");
//       }
//     });

//   });
// // });

// exports.findAllMessages = function(cb){
//   Message.findAll().success(function(messages){
//     cb(null, messages);
//   });
// };

// exports.findUser = function(username, cb){
//   User.findAll({where: {username: username}}).success(function(users){
//     cb(null, users);
//   });
// };

// exports.saveUser = function(username, cb){
//   User.create({username: username}).success(function(user){
//     cb(null, user);
//   });
// };

// exports.saveMessage = function(message, userid, roomname, cb){
//   Message.create({message: message, userid: userid, roomname: roomname}).success(function(message){
//     cb(null, message);
//   });
// };
