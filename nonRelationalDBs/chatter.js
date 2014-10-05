/* Install node-mongodb-native by doing:
 *  npm install mongodb
 * See documentation at https://github.com/christkv/node-mongodb-native#readme
 * Run this with:
 *  node mongo-example.js
 */
var mongodb = require("mongodb");

var server = new mongodb.Server("127.0.0.1", 27017, {});
// 27017 is the default port for connecting to MongoDB
var client = new mongodb.Db('chatter', server);

client.open(function(){

  var messages;
  var users;

  client.createCollection('users', function(err, collection){
    console.log('yes I am users');
    users= collection
      var saveUser = function(username, cb){
      console.log(users)
      users.insert({username: username}, function(err, user){
        cb(user);
        console.log('a new user?!');
      });
    };
    var findUser = function(username, cb){
      cb(users.find({username: username}));
    };


    saveUser("bobby", function(user){
      console.log("'s here")
    });
  });


  client.createCollection('messages', function(err, collection){
    console.log('yes I am messages');
    messages= collection

    var saveMessage = function(userid, message, roomname, cb){
      var message = {userid: userid, message: message, roomname: roomname};
      messages.insert(message, function(err, msg){
        cb(msg);
        console.log('inserted a message');
      });
    };

    var findAllMessages = function(cb){
      cb(messages.find());
    };

    for (var i = 0; i < 15; i++) {
      var message = {
        message: "hey yooooooo!" + i,
        userid: 5,
        roomname: "doodroom"
      };
      saveMessage(message.userid, message.message, message.roomname, function(msg){
        console.log("added")
      });
    }
  });
});
