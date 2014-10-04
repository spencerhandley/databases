var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "YOUR_PASSWORD",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

exports.findAllMessages = function(cb){
  dbConnection.query("SELECT * FROM messages;", function(err, rows, fields){
    cb(err, rows);
  });
};

exports.findUser = function(username, cb){
  dbConnection.query('SELECT * FROM users WHERE name = ?',[username], function(err, rows, fields){
    cb(err, rows);
  })
};

exports.saveUser = function(username, cb){
  dbConnection.query('INSERT INTO users SET ?',{name: username}, function(err, result) {
    cb(err, result);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  console.log("save")
  dbConnection.query('INSERT INTO messages SET ?', {text: message, username: userid, roomname: roomname, createdAt: new Date()} , function(err, result){
    console.log("save err",err)
    console.log("save result",result)
    cb(err, result);
  });
};
