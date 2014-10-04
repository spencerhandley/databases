var db = require('./db');
var serverHelpers = require('./server-helpers');
var _und = require('../node_modules/underscore/underscore.js');
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;
var data =  {results:[]};

findMessages(function(messages){
  data.results.push(messages)
})

exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;

  var resultsCallback = function (results) {
      var chat = {
        message: message.message,
        userid: results[0].id,
        roomname: message.roomname
      };

      saveMessage(chat.message, chat.userid, chat.roomname, function () {
        serverHelpers.sendResponse(res, message);
      });
  };

  parseData(req, function(_, msg) {
      message = msg;
      findUser(msg.username, function (err, results) {
        // no results/0 results
        if (!results || !results.length) {
          // create the user, then post the message
          saveUser(message.username, resultsCallback);
        } else {
          // user exists, post the message to this user
          resultsCallback(results);
        }
      });
  });
};

exports.getMessages = function(req, res) {
  findMessages(function(err, messages) {
      serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};

//
//
//
//
//
//




exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var headers = defaultCorsHeaders;

  var sendMessages = function(room) {
    headers["Content-Type"] = "application/json";
    response.writeHead(200, headers);
    if (room === undefined) {
      response.end(JSON.stringify(data));
    } else {
      var roomData = _und.filter(data.results, function(msg) {
        return msg.roomname === room;
      });
      var newData = JSON.stringify({results:roomData});
      response.end(newData);
    }
  };



  var processMessage = function(room){
    headers['Content-Type'] = 'text/html';
    response.writeHead(201, "OK", headers);
    var msg = '';
    request.on('data', function(chunk) {
      msg += chunk;
    });
    request.on('end', function() {
      msg = JSON.parse(msg);

      //appending to data
      if (room !== undefined) {
        msg.roomname = room;
      }
      //append to file
      // msg.username + "," + msg.text + "," + msg.roomname + "-"
      saveMessage(msg.text, msg.username, msg.roomname, function(err, message){
        console.log(JSON.stringify(message));
      })
      data.results.push(msg);
      response.end();

    });
  };

  var sendOptions = function(){
    response.writeHead(200, headers);
    response.end();
  };

  var badRequest = function(){
    response.writeHead(404, headers);
    response.end("Sorry, failure");
  };

  var path = request.url.split('/').slice(1);

  if (request.method === "GET") {
    if (path[0] === 'classes' && path[1] === 'messages') {
      sendMessages();
    } else if (path[0] === 'classes' && path.length === 2) {
      var room = path[1];
      sendMessages(room);
    } else {
      badRequest();
    }
  } else if (request.method === "POST") {
    if (request.url === "/classes/messages/send") {
      processMessage();
    } else if (path[0] === "classes" && path.length === 2) {
      var room = path[1];
      processMessage(room);
    } else {
      badRequest();
    }
  } else if (request.method === "OPTIONS") {
    sendOptions();
  } else {
    badRequest();
  }

};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


